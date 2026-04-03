const axios = require("axios");
const cheerio = require("cheerio");
const z = require("zod");
const fs = require("fs");
const { it } = require("zod/locales");

const bookData = z.object({
  title: z.string().min(1),
  price: z.number(),
  stock: z.string(),
});

const bookListSchema = z.array(bookData);

async function books() {
  const data = [];
  const response = await axios.get("https://books.toscrape.com/");

  const html = response.data;

  const $ = cheerio.load(html);

  $(".product_pod").each((i, el) => {
    const title = $(el).find("h3 a").attr("title").trim();

    const price = $(el).find(".price_color").text().trim();

    let stock = $(el).find(".availability").text().trim();

    data.push({
      title,
      price,
      stock,
    });

    try {
      const validateData = bookListSchema.parse(data);
      console.log(validateData);
    } catch (error) {
      console.error(error.errors);
    }

    const header = "title,price,availability\n";
    const rows = data.map((b) => `${b.title},${b.price},${b.stock}\n`);
    const csv = [header, ...rows].join("\n");

    fs.writeFileSync("books.csv", csv);

    const jsonData = JSON.stringify(data, null, 2);

    fs.writeFileSync("books.json", jsonData, (err) => {
      if (err) {
        console.error(err);
      }

      console.log("file writes successfully");
    });
  });
}

books();
