import * as nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();
import path from 'path';
import * as ejs from 'ejs';
const sendEmail = async (send: any) => {
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST as string,
    port: process.env.MAIL_PORT as unknown as number,
    secure: false,
    auth: {
      user: process.env.MAIL_USERNAME as string,
      pass: process.env.MAIL_PASSWORD as string,
    },
    tls: { rejectUnauthorized: true },
  });
  const data = await new Promise((resolve, reject) => {
    ejs.renderFile(
      path.resolve(__dirname, '../templates/email/reset-password.ejs'),
      {
        name: send.name,
        link: send.link,
        encoding: 'utf8',
        productName: send.productName,
      },
      (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      }
    );
  });
  const mailOptions = {
    from: '"Reset Password" <noreply@id360nm.com.br>',
    to: send.to,
    subject: send.subject,
    html: data as string,
  };
  const response = await new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        return reject(error);
      }
      resolve('Email sent');
    });
  });
  return response;
};

export default sendEmail;
