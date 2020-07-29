import { Response } from 'express';

export const sendRefreshCookie = (res: Response, token: string): void => {
  res.cookie('jrc', token, { httpOnly: true });
};
