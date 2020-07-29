import { ConfirmEmailPostfix } from '../constants/NodeMailerConstants';
import { sign } from 'jsonwebtoken';
export const createConfirmationLink = async (
  url: string,
  userId: string,
): Promise<string> => {
  const token = sign(
    { userId: userId + ' ' + ConfirmEmailPostfix },
    process.env.secret,
    {
      expiresIn: '1d',
    },
  );
  return `${url}/user/confirm?token=${token}`;
};
