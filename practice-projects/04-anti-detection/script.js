const { chromium } = require("playwright");

(async () => {
  try {
    const browser = await chromium.launch({ headless: false, slowMo: 50 });

    const page = await browser.newPage();

    await page.goto("https://www.scrapingcourse.com/ecommerce/");

    const product = await page.locator(".product");

    const count = await product.count();
    console.log("total laptops are: ", count);

    for (let i = 0; i < count; i++) {
      const title = await product
        .nth(i)
        .locator(".woocommerce-LoopProduct-link .product-name")
        .textContent();
      console.log("title is: ", title);
    }

    await browser.close();
  } catch (error) {
    console.error("action failed: ", error);
  }
})();
