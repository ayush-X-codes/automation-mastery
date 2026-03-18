const { chromium, } = require('playwright');

(async () => {
  const browser = await chromium.launch({headless: false, slowMo: 50});

  const context = await browser.newContext();

  const page = await context.newPage();

  await page.goto('https://www.saucedemo.com/');

  await page.getByPlaceholder("username").fill("standard_user");

  await page.getByPlaceholder("password").fill("secret_sauce");

  await page.getByRole("button", {name: "login"}).click();

  await page.waitForURL("https://www.saucedemo.com/inventory.html");

  await context.storageState({path: "auth.json"});

  await browser.close();
})();