const { chromium } = require("playwright");

(async () => {
  try {
    const browser = await chromium.launch({ headless: false, slowMo: 50 });

    const context = await browser.newContext({
      storageState: "auth.json",
    });

    const page = await context.newPage();

    await page.goto("https://the-internet.herokuapp.com/secure");

    await browser.close;
  } catch (error) {
    console.error("action failed: ", error);
  }
})();

// (async () => {
//   // Setup
//   const browser = await chromium.launch({headless: false, slowMo: 50});

//   const context = await browser.newContext({
//     storageState: "auth-data.json"
//   });

//   const page = await context.newPage();

//   await page.goto('https://practicetestautomation.com/logged-in-successfully/');

// //   await browser.close();
// })();
