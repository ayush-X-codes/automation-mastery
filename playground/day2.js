const { chromium } = require("playwright");

(async () => {
  try {
    console.log("browser launch");
    const browser = await chromium.launch({ headless: false, slowMo: 50 });

    console.log("page opens");
    const page = await browser.newPage();

    console.log("goes to website");
    await page.goto("https://the-internet.herokuapp.com/login");

    console.log("button clicked");
    await page.getByRole("button", { name: "Login" }).click();
    await page.screenshot({path: "day2.png"})

    await browser.close();

  } catch (error) {
    console.error("action failed:", error)
  }
})();

const { chromium } = require("playwright");

(async () => {
  try {
    console.log("browser launch");
    const browser = await chromium.launch({ headless: false, slowMo: 50 });

    console.log("page opens");
    const page = await browser.newPage();

    console.log("goes to website");
    await page.goto("https://playwright.dev/");

    console.log("button clicked");
    await page.getByText("Get Started").click();
    await page.screenshot({path: "day2.png"})

    await browser.close();

  } catch (error) {
    console.error("action failed: ", error)
  }
})();

const { chromium } = require("playwright");

(async () => {
  try {
    console.log("browser launch");
    const browser = await chromium.launch({ headless: false, slowMo: 50 });

    console.log("page opens");
    const page = await browser.newPage();

    console.log("goes to website");
    await page.goto("https://the-internet.herokuapp.com/login");

    console.log("button clicked");
    await page.getByLabel("name").fill("harry");
    await page.screenshot({ path: "day2.png" });

    await browser.close();
  } catch (error) {
    console.error("action failed: ", error);
  }
})();

(async () => {
  try {
    console.log("browser launch");
    const browser = await chromium.launch({ headless: false, slowMo: 50 });

    console.log("page opens");
    const page = await browser.newPage();

    console.log("goes to website");
    await page.goto("https://playwright.dev/");

    console.log("button clicked");
    await page.getByAltText("adobe").click();
    await page.screenshot({ path: "day2.png" });

    await browser.close();
  } catch (error) {
    console.error("action failed: ", error);
  }
})();

(async () => {
  try {
    console.log("browser open");
    const browser = await chromium.launch({ headless: false, slowMo: 50 });

    console.log("page open");
    const page = await browser.newPage();

    console.log("website open");
    await page.goto("https://www.saucedemo.com/inventory.html");

    console.log("button cliecked");
    await page
      .locator(".inventory_item")
      .filter({ hasText: "sauce labs backpack" })
      .getByRole("button", { name: "add to cart" })
      .click();

    console.log("browser closed");

    await browser.close();
  } catch (error) {
    console.error("action failed: ", error);
  }
})();

(async () => {
  try {
    console.log("browser open");
    const browser = await chromium.launch({ headless: false, slowMo: 50 });

    console.log("page open");
    const page = await browser.newPage();

    console.log("website open");
    await page.goto("https://www.saucedemo.com/inventory.html");

    console.log("button cliecked");
    await page
      .locator(".inventory_item")
      .filter({ has: page.getByText("Sauce Labs Bike Light") })
      .getByRole("button", { name: "add to cart" })
      .click();

    console.log("browser closed");

    await browser.close();
  } catch (error) {
    console.error("action failed: ", error);
  }
})();

(async () => {
  try {
    console.log("browser open");
    const browser = await chromium.launch({ headless: false, slowMo: 50 });

    console.log("page open");
    const page = await browser.newPage();

    console.log("website open");
    await page.goto("https://demo.playwright.dev/todomvc/#/");

    console.log("button cliecked");
    await page
      .locator(".view")
      .filter({ hasText: "practice questions" })
      .getByRole("button")
      .click();

    console.log("browser closed");

    await browser.close();
  } catch (error) {
    console.error("action failed: ", error);
  }
})();

(async () => {
  try {
    console.log("browser open");
    const browser = await chromium.launch({ headless: false, slowMo: 50 });

    console.log("page open");
    const page = await browser.newPage();

    console.log("website open");
    await page.goto("https://www.saucedemo.com/inventory.html");

    console.log("button cliecked");
    const products = await page.locator(".inventory_item").all();

    for (const product of products) {
      const name = await product.locator(".inventory_item_name ").textContent();
      console.log(name);
    }

    console.log("browser closed");

    await browser.close();
  } catch (error) {
    console.error("action failed: ", error);
  }
})();

(async () => {
  try {
    console.log("browser open");
    const browser = await chromium.launch({ headless: false, slowMo: 50 });

    console.log("page open");
    const page = await browser.newPage();

    console.log("website open");
    await page.goto("https://www.saucedemo.com/inventory.html");

    await page.getByPlaceholder("username").fill("standard_user");
    await page.getByPlaceholder("password").fill("secret_sauce");
    await page.getByRole("button", { name: "login" }).click();

    console.log("button cliecked");
    const items = await page.locator(".inventory_item");
    const count = await items.count();

    for (let i = 0; i < count; i++) {
      const name = await items
        .nth(i)
        .locator("inventory_item_name")
        .textContent();
      console.log(name);
    }

    await browser.close();
  } catch (error) {
    console.error("action failed: ", error);
  }
})();

(async () => {
  try {
    console.log("browser open");
    const browser = await chromium.launch({ headless: false, slowMo: 50 });

    console.log("page open");
    const page = await browser.newPage();

    console.log("website open");
    await page.goto("https://www.saucedemo.com/inventory.html");

    const product = await page
      .locator(".inventory_item")
      .filter({ hasText: "Sauce Labs Bolt T-Shirt " });
    const price = await product
      .locator(".inventory_item_price")
      .evaluate((el) => el.textContent);
    console.log(price);
    console.log("button cliecked");

    await browser.close();
  } catch (error) {
    console.error("action failed: ", error);
  }
})();

(async () => {
  try {
    console.log("browser open");
    const browser = await chromium.launch({ headless: false, slowMo: 50 });

    console.log("page open");
    const page = await browser.newPage();

    console.log("website open");
    await page.goto("https://www.saucedemo.com/inventory.html");

    await page.getByPlaceholder("username").fill("standard_user");
    await page.getByPlaceholder("password").fill("secret_sauce");
    await page.getByRole("button", { name: "login" }).click();

    console.log("inventory items");
    const product = await page.locator(".inventory_item");

    const count = await page.locator(".inventory_item_name").count();
    console.log(count);
    console.log("item names");
    const name = await product
      .locator(".inventory_item_name")
      .evaluateAll((elements) => elements.map((el) => el.textContent));
    console.log(name);
    //   console.log("button cliecked");

    await browser.close();
  } catch (error) {
    console.error("action failed: ", error);
  }
})();

(async () => {
  try {
    console.log("browser open");
    const browser = await chromium.launch({ headless: false, slowMo: 50 });

    console.log("page open");
    const page = await browser.newPage();

    console.log("website open");
    await page.goto("https://www.saucedemo.com/inventory.html");

    const title = await page.evaluate(() => document.title);
    console.log(title);

    await browser.close();
  } catch (error) {
    console.error("action failed", error);
  }
})();

(async () => {
  try {
    console.log("browser open");
    const browser = await chromium.launch({ headless: false, slowMo: 50 });

    console.log("page open");
    const page = await browser.newPage();

    console.log("website open");
    await page.goto("https://www.saucedemo.com/inventory.html");

    const title = await page.evaluateHandle(() => document.title);
    console.log(title);

    await browser.close();
  } catch (error) {
    console.error("action failed: ", error);
  }
})();
