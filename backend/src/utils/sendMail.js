import { Resend } from "resend";
 
const resend = new Resend(process.env.RESEND_API_KEY);
 
export const sendMail = async (to, subject, text) => {
  try {
    const info = await resend.emails.send({
      from: "onboarding@resend.dev", // works immediately, no domain setup needed
      to,
      subject,
      text,
    });
    console.log("Mail sent:", info.data?.id);
    return info;
  } catch (error) {
    console.error("Mail Error inside utility:", error);
    throw error;
  }
};
