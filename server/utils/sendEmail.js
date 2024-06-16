import nodemailer from "nodemailer";
const sendEmail = async (to, subject,  html) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "nigamdeveloprai2023@gmail.com",
      pass: "zejj uasr ktar fwpr",
    },
  });
  await transporter.sendMail({
    from: {
      name: "Nigam Rai",
      address: "nigamdeveloprai2023@gmail.com",
    },
    to: to,
    subject: subject,
    html: html
  });
};

export default sendEmail;
