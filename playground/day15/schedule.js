const cron = require("node-cron");
const runScraper = require("../../projects/price-tracker/script");
const fs = require("fs");
const sendNotification = require("./notify")

cron.schedule("* * * * *", async () => {
    console.log("cron fired at: ", new Date().toISOString());
    const result = await runScraper();
    const timeStamp = new Date().toISOString();
    const logLine = `${timeStamp} | items: ${result.itemsScraped} | errors: ${result.errors} | ${result.timeTaken}`;
    fs.appendFileSync("logs.txt", logLine + "\n");
    console.log(logLine);

    await sendNotification(result)
});
