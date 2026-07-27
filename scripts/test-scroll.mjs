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
    await page.waitForTimeout(250);

    return page.evaluate(() => {
      const sticky = document.querySelector("#clean-quest > div");
      const mop = document.querySelector('#clean-quest img[alt="Швабра"]');
      const mopWrap = mop?.parentElement;
      const banana = document.querySelector('#clean-quest img[alt="Банановая шкурка"]');
      const bar = document.querySelector("[data-testid='scroll-progress']");
      const mopRect = mopWrap.getBoundingClientRect();
      const banRect = banana.getBoundingClientRect();
      const banParent = banana.parentElement;
      const banOp = getComputedStyle(banParent).opacity;
      return {
        scrollY: window.scrollY,
        stickyTop: Math.round(sticky.getBoundingClientRect().top),
        progress: Number(bar?.getAttribute("data-progress") || -1),
        mopLeft: Math.round(mopRect.left),
        mopBottom: Math.round(mopRect.bottom),
        bananaOpacity: Number(banOp),
        bananaLeft: Math.round(banRect.left),
      };
    });
  };

  const samples = [];
  for (const frac of [0.05, 0.2, 0.35, 0.55, 0.7]) {
    samples.push({ frac, ...(await sample(frac)) });
  }

  console.log(JSON.stringify(samples, null, 2));

  // sticky валиден пока секция ещё держит pin (не в самом конце 260vh)
  const stickyOk = samples.slice(0, 4).every((s) => Math.abs(s.stickyTop) <= 4);
  const mopMoves = samples[samples.length - 1].mopLeft - samples[0].mopLeft > 80;
  const mid = samples[2];
  const end = samples[samples.length - 1];
  // банан жив в начале, мёртв после hit (~0.3 progress)
  const bananaCleared = samples[0].bananaOpacity > 0.45 && end.bananaOpacity < 0.15;
  const mopNearBananaAtHit =
    Math.abs(mid.mopLeft - mid.bananaLeft) < 120 || mid.bananaOpacity < 0.4;
  const progressMoves = end.progress - samples[0].progress >= 20;

  console.log({
    stickyOk,
    mopMoves,
    bananaCleared,
    mopNearBananaAtHit,
    progressMoves,
    mopDelta: end.mopLeft - samples[0].mopLeft,
    banOpStart: samples[0].bananaOpacity,
    banOpEnd: end.bananaOpacity,
  });

  if (!stickyOk || !mopMoves || !bananaCleared || !progressMoves) {
    console.error("FAIL");
    process.exitCode = 1;
  } else {
    console.log("PASS: mop sweeps across floor, trash stays dead, sticky holds");
  }

  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
