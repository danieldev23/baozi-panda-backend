import { Request } from 'express';
export const getUrlApi = (req: Request): string => `${req.protocol}://${req.host}${req.originalUrl}`;

export const handleError = (err: unknown): string =>
  err instanceof Error ? `${err.name}: ${err.message}` : String(err);
