import nodemailer from "nodemailer";

const emailConfigs = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  from: process.env.EMAIL_USER,
});

export default emailConfigs;
