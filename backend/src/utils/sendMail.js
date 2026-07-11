import nodemailer from "nodemailer";

export const sendMail = async (to, subject, text) => {
  try {
    // Initialize the transporter dynamically when sendMail is called
    const transporter = nodemailer.createTransport({
      host: "gmail",
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
