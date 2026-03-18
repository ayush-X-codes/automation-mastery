const { chromium } = require("playwright");
const fs = require("fs");

const target_price = 50;
const file = "prices.json";

(async () => {
  try {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(
      "https://books.toscrape.com/catalogue/a-light-in-the-attic_1000/index.html",
    );

    const title = await page.locator(".product_main h1").textContent();

    const priceText = await page
      .locator(".product_main .price_color")
      .textContent();

    const price = parseFloat(priceText.replace(/[£$₹]/g, ""));

    const result = {
      title,
      price,
      timestamp: new Date().toISOString(),
    };

    let data = [];

    if (fs.existsSync(file)) {
      const content = fs.readFileSync(file, "utf8");
      data = JSON.parse(content);
    }

    data.push(result);

    fs.writeFileSync(file, JSON.stringify(data, null, 2));

    if (price < target_price) {
      console.log(
        `🚨 BUY NOW! ${title} is ${price} - below target of ${target_price}`,
      );
    } else {
      console.log(`✅ Price is ${price} - not yet at target`);
    }

    await browser.close();
  } catch (error) {
    console.error("action failed: ", error);
  }
})();
