import { AuthEmail } from './../emails/AuthEmail';
import type { Request, Response } from 'express';
import User from '../models/User';
import { hashPassword } from '../utils/auth';
import Token from '../models/Token';
import { generateToken } from '../utils/token';

export class AuthController {
  static createAccount = async (req: Request, res: Response) => {
    try {
      const { password, email } = req.body;

      const userExists = await User.findOne({ email });
      if (userExists) {
        const error = new Error('User already exists');
        res.status(409).json({ error: error.message });
        return;
      }
      const user = new User(req.body);
      user.password = await hashPassword(password);

      const token = new Token();
      token.token = generateToken();
      token.user = user.id;

      AuthEmail.sendConfirmationEmail({
        email: user.email,
        name: user.name,
        token: token.token,
      });
      await Promise.allSettled([user.save(), token.save()]);

      res.send('User Created, please check your email for confirmation');
    } catch (error) {
      res.status(500).json({ error: 'Ups! Something went wrong' });
    }
  };

  static confirmAccount = async (req: Request, res: Response) => {
    try {
      const { token } = req.body;
      const tokenExists = await Token.findOne({ token });
      if (!tokenExists) {
        const error = new Error('Token not valid');
        res.status(401).json({ error: error.message });
        return;
      }

      const user = await User.findById(tokenExists.user);
      user.confirmed = true;
      await Promise.allSettled([user.save(), tokenExists.deleteOne()]);

      res.send('User confirmed successfully');
    } catch (error) {
      res.status(500).json({ error: 'Ups! Something went wrong' });
    }
  };
}
