import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { response } from './response';

const isValidRequest = (req: Request, res: Response): boolean => {
  if (!validationResult(req).isEmpty()) {
    res.json(response(false, validationResult(req).array()[0].msg));
    return false;
  }
  return true;
};

export { isValidRequest };
