const { chromium } = require("playwright");

(async () => {
  try {
    const browser = await chromium.launch({ headless: false, slowMo: 50 });

    console.log("open page");
    const page = await browser.newPage();

    console.log("open website");
    await page.goto("https://the-internet.herokuapp.com/dynamic_loading/1");

    console.log("button clicks");
    await page.getByRole("button", { name: "Start" }).click();
    const text = await page.getByText("Hello World");
    await text.waitFor({ state: "visible" });

    console.log("wait for to appear", text);
    browser.close();
  } catch (error) {
    console.error("action failed: ", error);
  }
})();

(async () => {
  try {
    const browser = await chromium.launch({ headless: false, slowMo: 50 });

    console.log("open page");
    const page = await browser.newPage();

    console.log("open website");
    await page.goto("https://the-internet.herokuapp.com/add_remove_elements/");

    console.log("button clicks");
    await page.getByRole("button", { name: "Add Element" }).click();

    const btn = await page.getByRole("button", { name: "delete" });
    await btn.waitFor({ state: "attached" });
    await btn.click();

    // console.log("wait for to appear", text)
    browser.close();
  } catch (error) {
    console.error("action failed: ", error);
  }
})();

(async () => {
  try {
    const browser = await chromium.launch({ headless: false, slowMo: 50 });

    console.log("open page");
    const page = await browser.newPage();

    console.log("open website");
    await page.goto("https://the-internet.herokuapp.com/dynamic_loading/2");

    await page.getByRole("button", { name: "start" }).click();

    await page.locator("#loading").waitFor({ state: "hidden" });

    const text = await page.getByText("Hello World!").textContent();
    console.log(text);

    await browser.close();
  } catch (error) {
    console.error("action failed: ", error);
  }
})();

(async () => {
  try {
    const browser = await chromium.launch({ headless: false, slowMo: 50 });

    console.log("open page");
    const page = await browser.newPage();

    console.log("open website");
    await page.goto("https://the-internet.herokuapp.com/dynamic_loading/1");

    console.log("button click");
    await page.getByRole("button", { name: "start" }).click();

    console.log("wait for text");
    await page.waitForFunction(() => {
      return document.body.innerHTML.includes("Hello World");
    });

    const text = await page.getByText("Hello World!").textContent();
    console.log("text is: ", text);

    await browser.close();
  } catch (error) {
    console.error("action failed: ", error);
  }
})();

(async () => {
  try {
    const browser = await chromium.launch({ headless: false, slowMo: 50 });

    console.log("open page");
    const page = await browser.newPage();

    console.log("open website");
    await page.goto("https://the-internet.herokuapp.com/dynamic_loading/1");

    console.log("button click");
    await page.getByRole("button", { name: "start" }).click();

    console.log("wait for text");
    await page.waitForFunction(() => {
      return document.body.innerHTML.includes("Hello World");
    });

    const text = await page.getByText("Hello World!").textContent();
    console.log("text is: ", text);

    await browser.close();
  } catch (error) {
    console.error("action failed: ", error);
  }
})();

(async () => {
  try {
    const browser = await chromium.launch({ headless: false, slowMo: 50 });

    console.log("open page");
    const page = await browser.newPage();

    console.log("open website");
    await page.goto("https://jsonplaceholder.typicode.com/");

    console.log("button click");
    await page.getByRole("button", { name: "start" }).click();

    console.log("wait for text");
    await page.waitForFunction(() => {
      return document.body.innerHTML.includes("Hello World");
    });

    const text = await page.getByText("Hello World!").textContent();
    console.log("text is: ", text);

    await browser.close();
  } catch (error) {
    console.error("action failed: ", error);
  }
})();

(async () => {
  try {
    const browser = await chromium.launch({ headless: false, slowMo: 50 });

    console.log("open page");
    const page = await browser.newPage();

    console.log("open website");
    await page.goto("https://jsonplaceholder.typicode.com/");

    const responsePromise = page.waitForResponse((res) =>
      res.url().includes("/posts"),
    );
    await page.evaluate(async (url) => {
      const res = await fetch(url);
    }, "https://jsonplaceholder.typicode.com/posts");
    const response = await responsePromise;
    const status = response.status();
    console.log("status is: ", status);

    await browser.close();
  } catch (error) {
    console.error("action failed: ", error);
  }
})();

(async () => {
  try {
    const browser = await chromium.launch({ headless: false, slowMo: 50 });

    console.log("open page");
    const page = await browser.newPage();

    console.log("open website");
    await page.goto("https://jsonplaceholder.typicode.com/");

    const responsePromise = page.waitForResponse((res) =>
      res.url().includes("/posts"),
    );
    const postData = { userId: 11, id: 101, title: "Hello", body: "World" };
    await page.evaluate(async (data) => {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return res.json();
    }, postData);
    const response = await responsePromise;
    const status = response.status();
    console.log("status is: ", status);

    await browser.close();
  } catch (error) {
    console.error("action failed: ", error);
  }
})();

(async () => {
  try {
    const browser = await chromium.launch({ headless: false, slowMo: 50 });

    console.log("open page");
    const page = await browser.newPage();

    console.log("open website");
    await page.goto("https://jsonplaceholder.typicode.com/");

    const responsePromise = page.waitForRequest((res) =>
      res.url().includes("/posts"),
    );

    //  await page.evaluate(async (url) => {
    //     const res = await fetch(url);
    //     const data = await res.json();
    //  }, "https://jsonplaceholder.typicode.com/posts");
    await page.goto("https://jsonplaceholder.typicode.com/posts");

    const response = await responsePromise;
    const responseObj = response.url();

    console.log("status is: ", responseObj);
    console.log("request is: ", response.method());
    console.log("headers is: ", response.headers());

    await browser.close();
  } catch (error) {
    console.error("action failed: ", error);
  }
})();

(async () => {
  try {
    console.time();
    const browser = await chromium.launch({ headless: false, slowMo: 50 });

    console.log("open page");
    const page = await browser.newPage();

    console.log("open website");
    await page.goto("https://jsonplaceholder.typicode.com/", {
      waitUntil: "domcontentloaded",
    });

    console.timeEnd();

    await browser.close();
  } catch (error) {
    console.error("action failed: ", error);
  }
})();

(async () => {
  try {
    console.time();
    const browser = await chromium.launch({ headless: false, slowMo: 50 });

    console.log("open page");
    const page = await browser.newPage();

    console.log("open website");
    await page.goto("https://jsonplaceholder.typicode.com/", {
      waitUntil: "load",
    });

    console.timeEnd();

    await browser.close();
  } catch (error) {
    console.error("action failed: ", error);
  }
})();

(async () => {
  try {
    console.time();
    const browser = await chromium.launch({ headless: false, slowMo: 50 });

    console.log("open page");
    const page = await browser.newPage();

    console.log("open website");
    await page.goto("https://jsonplaceholder.typicode.com/", {
      waitUntil: "networkidle",
    });

    console.timeEnd();

    await browser.close();
  } catch (error) {
    console.error("action failded: ", error);
  }
})();
