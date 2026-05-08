const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

const mailOptions = {
  from: process.env.GMAIL_USER,
  to: process.env.GMAIL_USER,
  subject: "介護ダッシュボード更新",
  text: "ダッシュボードが更新されました！",
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log(error);
  } else {
    console.log("メール送信成功: " + info.response);
  }
});
