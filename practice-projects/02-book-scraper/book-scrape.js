const { chromium } = require("playwright");
const fs = require("fs");


(async () => {
  const result = [];
  const browser = await chromium.launch({ headless: false, slowMo: 50 });

  const page = await browser.newPage();

  for (let i = 1; i < 6; i++) {
    await page.goto(`https://books.toscrape.com/catalogue/page-${i}.html`);

    const books = await page.locator(".product_pod");
    const count = await books.count();

    for (let i = 0; i < count; i++) {
      const title = await books.nth(i).locator("h3 > a").getAttribute("title");
      const price = await books.nth(i).locator(".price_color").textContent();
      const ratingCl = await books
        .nth(i)
        .locator(".star-rating")
        .getAttribute("class");
      const rating = ratingCl.split(" ")[1];
      console.log("rating class is: ", rating);
      const stockCl = await books.nth(i).locator(".availability").textContent();
      const stock = stockCl.trim();

      result.push({
        title,
        price,
        rating,
        stock,
      });

      const header = "title,price,rating,availability";
      const rows = result.map(b => `"${b.title}","${b.price}","${b.rating}","${b.stock}"`);
      const csv = [header, ...rows].join("\n");

      fs.writeFileSync("books2.csv", csv);
      console.log("csv file writes")
    }
  }
  browser.close();
})();
