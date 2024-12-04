import { transporter } from '../config/nodemailer';

interface IEmail {
  email: string;
  name: string;
  token: string;
}

export class AuthEmail {
  static sendConfirmationEmail = async (user: IEmail) => {
    const info = await transporter.sendMail({
      from: 'UpTask Manager <pC5pR@example.com>',
      to: user.email,
      subject: 'Confirm your account',
      text: `Please click on the following link to confirm your account: `,
      html: `<p>User: ${user.name} has created an account, please add 
       the following token to confirm your account: ${user.token}</p>
      <p>This link will expire in 10 minutes</p>`,
    });
    console.log('Email sent', info.messageId);
  };
}