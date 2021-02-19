import { createTransport } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

let transporter: Mail | null = null;
export async function createEmailTransporter() {
  return new Promise((resolve, reject) => {
    transporter = createTransport({
      host: process.env.EMAIL_HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL || 'email',
        pass: process.env.EMAIL_PASS || 'pass',
      },
    });

    transporter.verify((error, success) => {
      if (error) reject(error);
      else resolve(success);
    });
  });
}

const from = process.env.EMAIL_SENDER || 'example@correo.com';
async function sendMail(mailOptions: Mail.Options): Promise<any> {
  return new Promise((resolve, reject) => {
    if (!transporter)
      return reject(new Error('No email transporter has been configured'));

    transporter.sendMail({ ...mailOptions, from }, (error, info) => {
      if (error) reject(error);
      else resolve(info);
    });
  });
}

export { sendMail };
