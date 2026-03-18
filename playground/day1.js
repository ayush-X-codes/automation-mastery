const { chromium, devices } = require("playwright");


(async () => {
    try {
        const browser = await chromium.launch({ headless: false, slowMo: 50 });
        // const browser = await chromium.launch();
        const context = await browser.newContext(devices["iPhone 11"]);
        const page = await context.newPage();
        await page.goto("https://www.example.com");
        // await page.fill("textarea[name='q']", "playwright automation");
        // await page.keyboard.press("Enter");
        await page.screenshot({ path: "day1.png" });
        console.log("Page title: ", await page.title());
        await context.close();
        await browser.close();
    } catch (error) {
        console.error("action failed: ", error)
    }

})();
