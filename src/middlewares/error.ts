import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../helpers/api-erros';

export const errorMiddleware = (
  error: Error & Partial<ApiError>,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { message, statusCode } = error;
  return res.status(statusCode ?? 500).json({ message });
};
