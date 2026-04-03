const { chromium } = require("playwright");
const fs = require("fs");

const file = "jobs.json";

(async () => {
  const scrapeJobs = [];
  const browser = await chromium.launch({ headless: false, slowMo: 50 });
  const page = await browser.newPage();
  await page.goto("https://remoteok.com/");

  const jobs = await page.locator(".job");
  const count = await jobs.count();

  for (let i = 0; i < count; i++) {
    const titleText = await jobs
      .nth(i)
      .locator(".preventLink h2")
      .textContent();

    const title = titleText.trim();

    const companyName = await jobs
      .nth(i)
      .locator(".companyLink h3")
      .textContent();
    const company = companyName.trim();

    const location = await jobs
      .nth(i)
      .locator(".company > div.location")
      .first()
      .textContent();

    const link = await jobs
      .nth(i)
      .locator(".company a.preventLink")
      .getAttribute("href");

    scrapeJobs.push({
      title,
      company,
      location,
      link,
    });
  }

  console.log("old jobs are :", scrapeJobs);

  let oldJobs = [];

  if (fs.existsSync(file)) {
    oldJobs = JSON.parse(fs.readFileSync(file, "utf-8"));
  }

  const newJobs = scrapeJobs;

  const oldLinks = new Set(oldJobs.map((job) => job.link));

  const freshJobs = newJobs.filter((job) => !oldLinks.has(job.link));

  console.log("new jobs :", freshJobs);

  fs.writeFileSync("jobs.json", JSON.stringify(newJobs, null, 2));

  await browser.close();
})();
