import { chromium } from "playwright";

const URL = process.env.URL || "http://localhost:3060";

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await page.goto(URL, { waitUntil: "networkidle", timeout: 60000 });

  await page.locator("#clean-quest").scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);

  const section = page.locator("#clean-quest");
  const sectionTop = await section.evaluate(
    (el) => el.getBoundingClientRect().top + window.scrollY
  );
  const sectionHeight = await section.evaluate((el) => el.offsetHeight);

  const sample = async (frac) => {
    const y = Math.floor(sectionTop + sectionHeight * frac);
    await page.evaluate((yy) => {
      document.scrollingElement.scrollTop = yy;
    }, y);
    await page.waitForTimeout(200);

    return page.evaluate(() => {
      const sticky = document.querySelector("#clean-quest > div");
      const mop = document.querySelector('#clean-quest img[alt="Швабра"]');
      const bar = document.querySelector("[data-testid='scroll-progress']");
      const cs = getComputedStyle(mop).transform;
      const matrix = new DOMMatrix(cs === "none" ? undefined : cs);
      return {
        scrollY: window.scrollY,
        stickyTop: Math.round(sticky.getBoundingClientRect().top),
        progress: Number(bar?.getAttribute("data-progress") || -1),
        mopTx: Math.round(matrix.m41),
        mopTy: Math.round(matrix.m42),
        mopTransform: mop.style.transform || cs,
      };
    });
  };

  const samples = [];
  for (const frac of [0.02, 0.25, 0.5, 0.75]) {
    samples.push({ frac, ...(await sample(frac)) });
  }

  console.log(JSON.stringify(samples, null, 2));

  const stickyOk = samples.every((s) => Math.abs(s.stickyTop) <= 2);
  const progressMoves =
    samples[samples.length - 1].progress - samples[0].progress > 30;
  const mopMoves = Math.abs(samples[samples.length - 1].mopTx - samples[0].mopTx) > 40;

  console.log({ stickyOk, progressMoves, mopMoves });

  if (!stickyOk || !progressMoves || !mopMoves) {
    console.error("FAIL");
    process.exitCode = 1;
  } else {
    console.log("PASS: sticky + progress + mop motion");
  }

  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
