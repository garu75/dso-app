import jwt from 'jsonwebtoken';
import { IUserDocument } from "./users.types";

const jwtSecret: jwt.Secret = process.env.ACCESS_TOKEN_SECRET || 'secret';

export async function generateToken(this: IUserDocument): Promise<IUserDocument> {
  const user = this;
  const token = jwt.sign({ _id: user._id }, jwtSecret, { expiresIn: '32h' });
  user.token = token;
  return user.save();
}