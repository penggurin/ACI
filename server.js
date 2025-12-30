const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// ROOT ROUTE
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// EMAIL CONFIG
const EMAIL = "jeanpiere.roxas@gmail.com";
const EMAIL_PASSWORD = "vlksaegiuevpkqpd";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: EMAIL,
    pass: EMAIL_PASSWORD,
  },
});

// SEND EMAIL ROUTE
app.post("/send", async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    await transporter.sendMail({
      from: EMAIL,
      to: EMAIL,
      subject: subject || "New Contact Form Message",
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
