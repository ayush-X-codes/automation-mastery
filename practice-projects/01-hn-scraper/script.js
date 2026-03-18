const { chromium } = require("playwright");
const fs = require("node:fs");

let result = [];

(async () => {
  try {
    const browser = await chromium.launch({ headless: false, slowMo: 50 });

    const page = await browser.newPage();

    await page.goto("https://news.ycombinator.com/");

    const posts = await page.locator(".athing");
    const count = await posts.count();

    for (let i = 0; i < count; i++) {
      const titles = await posts.nth(i).locator(".titleline > a").textContent();

      const links = await posts
        .nth(i)
        .locator(".titleline > a")
        .getAttribute("href");

      const points = await posts
        .nth(i)
        .evaluate(
          (el) => el.nextElementSibling.querySelector(".score")?.textContent,
        );

      const authors = await posts
        .nth(i)
        .evaluate(
          (el) => el.nextElementSibling.querySelector(".hnuser")?.textContent,
        );

      result.push({
        titles,
        links,
        points,
        authors,
      });

      const jsonData = JSON.stringify(result, null, 2);

      fs.writeFile("hackernews.json", jsonData, "utf8", (err) => {
        if (err) {
          console.error("Error writing to file", err);
        } else {
          console.log("Data written to file");
        }
      });
    }

    browser.close();
  } catch (error) {
    console.error("action failed: ", error);
  }
})();
