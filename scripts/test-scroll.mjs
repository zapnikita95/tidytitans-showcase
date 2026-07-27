import { chromium } from "playwright";

const URL = process.env.URL || "http://localhost:3060";

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(URL, { waitUntil: "networkidle", timeout: 60000 });

  // hero present
  const h1 = await page.locator("h1").innerText();
  console.log("H1:", h1.replace(/\s+/g, " ").trim());

  await page.locator("#sweep").scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);

  const section = page.locator("#sweep");
  const sectionTop = await section.evaluate(
    (el) => el.getBoundingClientRect().top + window.scrollY
  );
  const sectionHeight = await section.evaluate((el) => el.offsetHeight);

  const sample = async (frac) => {
    const y = Math.floor(sectionTop + sectionHeight * frac);
    await page.evaluate((yy) => {
      document.scrollingElement.scrollTop = yy;
    }, y);
    await page.waitForTimeout(280);
    return page.evaluate(() => {
      const sticky = document.querySelector("#sweep > div");
      const mop = document.querySelector('#sweep img[alt="Швабра"]');
      const wrap = mop?.parentElement;
      const bar = document.querySelector("[data-testid='scroll-progress']");
      const banana = document.querySelector('#sweep img[alt="Банан"]');
      return {
        stickyTop: Math.round(sticky.getBoundingClientRect().top),
        progress: Number(bar?.getAttribute("data-progress") || -1),
        mopLeft: Math.round(wrap.getBoundingClientRect().left),
        banOp: Number(getComputedStyle(banana).opacity),
      };
    });
  };

  const samples = [];
  for (const frac of [0.08, 0.25, 0.45, 0.65]) {
    samples.push({ frac, ...(await sample(frac)) });
  }
  console.log(JSON.stringify(samples, null, 2));

  const stickyOk = samples.every((s) => Math.abs(s.stickyTop) <= 2);
  const mopMoves = samples.at(-1).mopLeft - samples[0].mopLeft > 200;
  const banDies = samples[0].banOp > 0.4 && samples.at(-1).banOp < 0.15;
  const progressMoves = samples.at(-1).progress - samples[0].progress >= 20;

  // screenshots
  await page.evaluate((yy) => {
    document.scrollingElement.scrollTop = 0;
  }, 0);
  await page.waitForTimeout(200);
  await page.screenshot({ path: "shot-hero.png" });
  await page.evaluate((yy) => {
    document.scrollingElement.scrollTop = yy;
  }, sectionTop + sectionHeight * 0.4);
  await page.waitForTimeout(300);
  await page.screenshot({ path: "shot-sweep.png" });

  console.log({ stickyOk, mopMoves, banDies, progressMoves });
  if (!stickyOk || !mopMoves || !banDies || !progressMoves) {
    console.error("FAIL");
    process.exitCode = 1;
  } else {
    console.log("PASS");
  }
  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
