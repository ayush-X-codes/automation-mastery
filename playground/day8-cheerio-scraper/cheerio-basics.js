const axios = require("axios");
const cheerio = require("cheerio");

// async function scrape() {
//     const response = await axios.get("https://example.com/");

//     const html = response.data;

//     const $ = cheerio.load(html);

//     console.log("Loaded HTML");
// }

// scrape()


// async function quoteScrape() {
//     const response = await axios.get("https://quotes.toscrape.com/");

//     const html = response.data;

//     const $ = cheerio.load(html);

//     const quote = $(".text").text();

//     console.log("quotes :", quote)
// }

// quoteScrape()


// async function quoteScrape() {
//     const response = await axios.get("https://quotes.toscrape.com/");

//     const html = response.data;

//     const $ = cheerio.load(html);

//     const link = $(".tags > a").attr("href");

//     console.log("quotes :", link)
// }

// quoteScrape()


async function quoteScrape() {
    const response = await axios.get("https://quotes.toscrape.com/");

    const html = response.data;

    const $ = cheerio.load(html);

    $(".author").each((i, el) => {
        const name = ($(el).text());
        console.log("author name :", name)
    })

}

quoteScrape()