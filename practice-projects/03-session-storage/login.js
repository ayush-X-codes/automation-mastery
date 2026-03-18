const { chromium, devices } = require("playwright");

(async () => {
  try {
    const browser = await chromium.launch({ headless: false, slowMo: 50 });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://the-internet.herokuapp.com/login");

    await page.getByLabel("username").fill("tomsmith");
    await page.getByLabel("password").fill("SuperSecretPassword!");

    await page.getByRole("button", { name: "login" }).click();
    await page.waitForURL("https://the-internet.herokuapp.com/secure");

    await context.storageState({ path: "auth.json" });
    await browser.close();
  } catch (error) {
    console.error("action failed: ", error);
  }
})();

// const { chromium, devices } = require('playwright');

// (async () => {
//   // Setup
//   const browser = await chromium.launch({headless: false, slowMo: 50});
//   const context = await browser.newContext();
//   const page = await context.newPage();

//   await page.goto('https://practicetestautomation.com/practice-test-login/');

//   await page.getByLabel("username").fill("student");
//   await page.getByLabel("password").fill("Password123");

//   await page.getByRole("button", {name: "submit"}).click();
//   await page.waitForURL("https://practicetestautomation.com/logged-in-successfully/");

//   await context.storageState({path: "auth-data.json"});
//   await browser.close();
// })();
