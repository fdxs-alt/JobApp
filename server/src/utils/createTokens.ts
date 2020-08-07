import { sign } from 'jsonwebtoken';
import { User } from '../entity/User';

export const createRefreshToken = (user: User): string => {
  return sign(
    { userId: user.id, tokenVersion: user.tokenVersion },
    process.env.secret_2,
    { expiresIn: '7d' },
  );
};
export const createAccessToken = (user: User): string => {
  return sign(
    { userId: user.id, isOwner: user.hasCompany },
    process.env.secret,
    { expiresIn: '60m' },
  );
};
