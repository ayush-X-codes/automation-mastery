const fs = require("fs")
const { chromium } = require("playwright");

(async() => {
    const result = [];
  const browser = await chromium.launch();

  const page = await browser.newPage();

  await page.goto("https://news.ycombinator.com/");

  const posts = await page.locator(".athing");

  const count = await posts.count();

  for (let i = 0; i < count; i++) {
    const title = await posts.nth(i).locator(".titleline > a").textContent();
    const link = await posts.nth(i).locator(".titleline > a").getAttribute("href");
    const points = await posts.nth(i).evaluate(el => el.nextElementSibling.querySelector(".score").textContent);
    const author = await posts.nth(i).evaluate(el => el.nextElementSibling.querySelector(".hnuser").textContent);


    result.push({
        title,
        link,
        points,
        author
    })
    const jsonData = JSON.stringify(result, null, 2);

    fs.writeFile("hackernews.json", jsonData, "utf-8", (err) => {
        if (err){
            console.error("write file error", err);
        }

        console.log("file writes sucessfully");
    });
  };
})();
