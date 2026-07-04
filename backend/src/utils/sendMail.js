// import dotenv from "dotenv";
// dotenv.config();

// import nodemailer from "nodemailer";

// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 587,
//   secure: false,
//   auth: {
//     user: process.env.EMAIL,
//     pass: process.env.EMAIL_PASSWORD,
//   },
// });

// export const sendMail = async (to, subject, text) => {
//   try {
//     const info = await transporter.sendMail({
//       from: process.env.EMAIL,
//       to,
//       subject,
//       text,
//     });

//     console.log("Mail sent:", info.messageId);
//   } catch (error) {
//     console.log("Mail Error:", error);
//     throw error;
//   }
// };
import nodemailer from "nodemailer";

export const sendMail = async (to, subject, text) => {
  try {
    // Initialize the transporter dynamically when sendMail is called
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.EMAIL,
      to,
      subject,
      text,
    });

    console.log("Mail sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("Mail Error inside utility:", error);
    throw error;
  }
};