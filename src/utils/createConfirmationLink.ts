import { Redis } from 'ioredis';
import { v4 as uuidv4 } from 'uuid';
import { ConfirmEmailPostfix } from '../constants/NodeMailerConstants';
export const createConfirmationLink = async (
  url: string,
  redis: Redis,
  userId: string,
): Promise<string> => {
  const id = uuidv4();
  await redis.set(id + ConfirmEmailPostfix, userId, 'ex', 60 * 60 * 24);
  return `${url}/user/confirm?token=${id}`;
};
