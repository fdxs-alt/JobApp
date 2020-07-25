import { Redis } from 'ioredis';
import { v4 as uuidv4 } from 'uuid';
import { ConfirmEmailPrefix } from '../constants/NodeMailerConstants';
export const createConfirmationLink = async (
  url: string,
  redis: Redis,
  userId: string,
): Promise<string> => {
  const id = uuidv4();
  await redis.set(id + ConfirmEmailPrefix, userId, 'ex', 60 * 60 * 24);
  return `${url}/user/confirm?token=${id}`;
};
