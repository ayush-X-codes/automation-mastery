const { chromium} = require('playwright');
const fs = require("fs");

const target_price = 150000;
const file = "prices.json";


(async () => {
  const browser = await chromium.launch({headless: false}); 
  const page = await browser.newPage();
  await page.goto('https://www.flipkart.com/apple-iphone-16-pro-black-titanium-128-gb/p/itm12f97adb4c5ed?pid=MOBH4DQFVXNS5ZJH&lid=LSTMOBH4DQFVXNS5ZJHBZDANB&marketplace=FLIPKART&store=tyy%2F4io&srno=b_1_1&otracker=browse&fm=organic&iid=5bad24fd-54d7-4979-801e-318eeb828f8c.MOBH4DQFVXNS5ZJH.SEARCH&ppt=None&ppn=None&ssid=9az1b2k8ts0000001773821654438&ov_redirect=true');

  const name = await page.locator("h1._1psv1ze0").textContent();
  console.log("name is: ", name);
  const priceText = await page.locator("div.v1zwn21k.v1zwn20._1psv1zeb9._1psv1ze0").textContent();
  console.log("text price is: ", priceText);
  const price = parseFloat(priceText.replace(/[£$₹,]/g, ''));
  console.log("now price is: ", price);

  const result = {
    name,
    price,
    timestamp: new Date().toISOString()

  }

  let data = [];

  if (fs.existsSync(file)){
    data = JSON.parse(fs.readFileSync(file, "utf8"));
  }

  data.push(result);

  fs.writeFileSync(file, JSON.stringify(data, null, 2));

  if (price < target_price){
    console.log(`🚨 BUY NOW ${name} is ${price} - below target of ${target_price}`)
  } else{
    console.log(`✅ Price is ${price} - not yet target`)
  }

  await browser.close();
})();