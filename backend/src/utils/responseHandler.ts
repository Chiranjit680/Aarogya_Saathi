import { Response } from 'express';

interface ResponseData {
  success: boolean;
  statusCode: number;
  message?: string;
  data?: any;
}

export const sendResponse = (
  res: Response,
  statusCode: number,
  message?: string,
  data?: any
) => {
  const response: ResponseData = {
    success: statusCode >= 200 && statusCode < 300,
    statusCode,
  };

  if (message) response.message = message;
  if (data) response.data = data;

  res.status(statusCode).json(response);
};