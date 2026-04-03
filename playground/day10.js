const axios = require("axios");
const cheerio = require("cheerio");
const z = require("zod");
const fs = require("fs");

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

    console.log(data);
  });

  try {
    const msg = data
      .map(
        (b) =>
          `The book 📕 "${b.title}" costs 💸 ${b.price} and is 📦 ${b.stock}`,
      )
      .join("\n");
    const res = await axios.post(
      "https://discord.com/api/webhooks/1484134258871242912/xfaULMfxlDl9dXGnbk9MZYCwqR9Rsz9Qu8Og3XcybxnSKMghRaeTfQm1kmDds_762zoR",
      {
        content: msg,
      },
    );
    console.log("res is: ", res.data);
  } catch (error) {
    console.error(error);
  }
}

books();
