const axios = require("axios");
const cheerio = require("cheerio");
const pLimit = require("p-limit");

const links = [
  "https://books.toscrape.com/catalogue/page-1.html",
  "https://books.toscrape.com/catalogue/page-2.html",
  "https://books.toscrape.com/catalogue/page-3.html",
  "https://books.toscrape.com/catalogue/page-4.html",
  "https://books.toscrape.com/catalogue/page-5.html",
  "https://books.toscrape.com/catalogue/page-6.html",
  "https://books.toscrape.com/catalogue/page-7.html",
  "https://books.toscrape.com/catalogue/page-8.html",
  "https://books.toscrape.com/catalogue/page-9.html",
  "https://books.toscrape.com/catalogue/page-10.html",
  "https://books.toscrape.com/catalogue/page-11.html",
  "https://books.toscrape.com/catalogue/page-12.html",
  "https://books.toscrape.com/catalogue/page-13.html",
  "https://books.toscrape.com/catalogue/page-14.html",
  "https://books.toscrape.com/catalogue/page-15.html",
  "https://books.toscrape.com/catalogue/page-16.html",
  "https://books.toscrape.com/catalogue/page-17.html",
  "https://books.toscrape.com/catalogue/page-18.html",
  "https://books.toscrape.com/catalogue/page-19.html",
  "https://books.toscrape.com/catalogue/page-20.html",
  "https://books.toscrape.com/catalogue/page-21.html",
  "https://books.toscrape.com/catalogue/page-22.html",
  "https://books.toscrape.com/catalogue/page-23.html",
  "https://books.toscrape.com/catalogue/page-24.html",
  "https://books.toscrape.com/catalogue/page-25.html",
  "https://books.toscrape.com/catalogue/page-26.html",
  "https://books.toscrape.com/catalogue/page-27.html",
  "https://books.toscrape.com/catalogue/page-28.html",
  "https://books.toscrape.com/catalogue/page-29.html",
  "https://books.toscrape.com/catalogue/page-30.html",
  "https://books.toscrape.com/catalogue/page-31.html",
  "https://books.toscrape.com/catalogue/page-33.html",
  "https://books.toscrape.com/catalogue/page-34.html",
  "https://books.toscrape.com/catalogue/page-35.html",
  "https://books.toscrape.com/catalogue/page-36.html",
  "https://books.toscrape.com/catalogue/page-37.html",
  "https://books.toscrape.com/catalogue/page-38.html",
  "https://books.toscrape.com/catalogue/page-39.html",
  "https://books.toscrape.com/catalogue/page-40.html",
  "https://books.toscrape.com/catalogue/page-41.html",
  "https://books.toscrape.com/catalogue/page-42.html",
  "https://books.toscrape.com/catalogue/page-43.html",
  "https://books.toscrape.com/catalogue/page-44.html",
  "https://books.toscrape.com/catalogue/page-45.html",
  "https://books.toscrape.com/catalogue/page-46.html",
  "https://books.toscrape.com/catalogue/page-47.html",
  "https://books.toscrape.com/catalogue/page-48.html",
  "https://books.toscrape.com/catalogue/page-49.html",
  "https://books.toscrape.com/catalogue/page-50.html",
];

console.time("scrape timer");

// const result = [];

// async function titleScrape() {
//   for (const link of links) {
//     const response = await axios.get(link);

//     const html = response.data;

//     const $ = cheerio.load(html);

//     $(".product_pod").each((i, el) => {
//       const title = $(el).find("h3 a").attr("title");
//       console.log("title is: ", title);
//       const data = {
//         title,
//       };

//       result.push(data);
//     });
//   }

//   console.log("result is: ", result);
// }

// titleScrape();

// console.timeEnd("scrape time");

const limit = pLimit(5);

async function titleScrape(url) {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const pageResults = [];

    $(".product_pod").each((i, el) => {
      const title = $(el).find("h3 a").attr("title");
      pageResults.push({ title });
    });

    return pageResults;
  } catch (err) {
    console.error("Error scraping", url, err);
    return []
  }

}


async function run() {
  const promises = links.map((link) => limit(() => titleScrape(link)));
  const results = await Promise.all(promises);

  const finalResult = results.flat()
  console.log(finalResult);
}

run()


console.timeEnd("scrape time");

console.log("Done")