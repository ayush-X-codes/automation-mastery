const cheerio = require("cheerio");
const axios = require("axios");

async function news() {
    try {
        const response = await axios.get('https://news.ycombinator.com/');
        const $ = cheerio.load(response.data);
        const $a = $(".titleline a").each((i, el) => {
            const title = $(el).text();
            const link = $(el).attr("href");

            console.log("title is :", title)
            console.log("links are :", link)
        });

    } catch (error) {
        console.error(error);
    }
}

news()