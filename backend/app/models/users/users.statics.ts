import { IUserDocument, IUserModel } from "./users.types";
import jwt from 'jsonwebtoken';

const jwtSecret: jwt.Secret = process.env.ACCESS_TOKEN_SECRET || 'secret';

export function findByToken(
  this: IUserModel,
  token: string
): Promise<IUserDocument | null> {
  let user = this;
  const decode = jwt.verify(token, jwtSecret);
  return user.findOne({ _id: decode, token: token }).exec();
};