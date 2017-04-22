import nodemailer from 'nodemailer';
import * as mail from '../../config/mail';

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: mail.USER,
      pass: mail.PASS
    }
});

export const sendMail = ({ email, subject, content }) => {
  const mailOptions = {
    from: mail.USER,
    to: email,
    subject: subject,
    html: content
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error);
      } else {
        resolve(info);
      };
    });
  });
};
