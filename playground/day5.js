const { chromium } = require("playwright");

(async () => {
  try {
    const browser = await chromium.launch({
      headless: false,
      args: ["--disable-blink-features=AutomationControlled"],
    });

    const context = await browser.newContext({
      userAgent:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36",
    });

    const page = await context.newPage();

    await page.goto("https://bot.sannysoft.com/");

    await page.waitForTimeout(3000);

    await page.screenshot({ path: "with-stealth.png", fullPage: true });

    await browser.close();
  } catch (error) {
    console.error("action failed: ", error);
  }
})();

(async () => {
  try {
    const browser = await chromium.launch({ headless: false, slowMo: 50 });

    const page = await browser.newPage();

    await page.goto("https://bot.sannysoft.com/");

    await page.waitForTimeout(3000);

    await page.screenshot({ path: "without-stealth.png", fullPage: true });

    await browser.close();
  } catch (error) {
    console.error("action failed: ", error);
  }
})();
