const { chromium } = require("playwright");

(async() => {
    const browser = await chromium.launch({headless: false, slowMo: 50});

    const context = await browser.newContext({
        storageState: "auth.json"
    });

    const page = await context.newPage();

    await page.goto("https://www.saucedemo.com/inventory.html");

    await browser.close()
})();