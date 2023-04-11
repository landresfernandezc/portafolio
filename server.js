const express = require("express");
const path = require("path");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
dotenv.config();
let initialPath = path.join(__dirname, "public");
let app = express();
app.use(express.static(initialPath));
app.use(express.json());
app.use(express.urlencoded());
app.get("/", (req, res) => {
  res.sendFile(path.join(initialPath, "index.html"));
});
app.post("/mail", (req, res) => {
  const { firstName, lastName, email, msg } = req.body;
  console.log(process.env.EMAIL, process.env.PASSWORD);
  console.log(req);
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });
  const mailOptions = {
    from: "portafolio2021.01@gmail.com",
    to: "portafolio2021.01@gmail.com",
    subject: "Portafolio notification",
    text: `First name: ${firstName},  \n Last name:${lastName} ,\n Email:${email} ,\n Message:${msg} `,
  };
  transporter.sendMail(mailOptions, (err, result) => {
    if (err) {
      console.log(err);
      res.json(
        "opps! it seems like some error ocurred please. Try Again ckvscrtyjhqyzjqi"
      );
    } else {
      res.json("Thanks for e-mailing me. I will reply to you within 48 hours");
    }
  });
});

app.listen("3000", () => {
  console.log("listening");
});
