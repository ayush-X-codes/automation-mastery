const nodemailer = require("nodemailer");
require("dotenv").config()


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

async function sendNotification(result) {
  try {
    const info = await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to:  process.env.GMAIL_USER, 
      subject: `Price Tracker Report - ${new Date().toLocaleDateString()}`, 
      text: `
      Items Scraped: ${result.itemsScraped},
      Errors: ${result.errors},
      Time Taken: ${result.timeTaken},
      Price Found: ${result.price}

      `, 
    });

    console.log("Message sent: %s", info.messageId);
    
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (err) {
    console.error("Error while sending mail:", err);
  }
}

module.exports = sendNotification;