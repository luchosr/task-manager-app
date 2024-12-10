import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import User, { IUser } from '../models/User';

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    const error = new Error('Unauthorized');
    res.status(401).json({ error: error.message });
  }
  const token = bearer.split(' ')[1];
  console.log(token);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    if (typeof decoded === 'object' && decoded.id) {
      const user = await User.findById(decoded.id).select('_id name email');

      if (user) {
        req.user = user;
      } else {
        res.status(500).json({ error: 'Token is not valid' });
      }
    }
  } catch (error) {
    res.status(500).json({ error: 'Token is not valid' });
  }

  next();
};
