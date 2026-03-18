// const assert = require("node:assert");
// const { chromium, devices } = require("playwright");

// (async () => {
//     const browser = await chromium.launch();
//     const context = await browser.newContext(devices['iPhone 11']);
//     const page = await context.newPage();

//     await context.route("**.jpg", route => route.abort());
//     await page.goto("https://example.com");
//     console.log(await page.title());
//     assert(await page.title() === "Example Domain");
//     await context.close();
//     await browser.close();
// })();


const { webkit } = require("playwright");

(async () => {
    const browser = await webkit.launch({headless: false , slowMo: 50});
    const page = await browser.newPage();
    await page.goto("https://playwright.dev/");
    await page.screenshot({path: `example.png`});
    await browser.close();
})();