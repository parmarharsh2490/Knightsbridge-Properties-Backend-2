import { Request, Response, NextFunction } from 'express';
import { DIALOFT_AI_API_KEY } from '../constants';
import logger from '../utils/logger';

export const requireApiKey = (req: Request, res: Response, next: NextFunction) => {
  const provided = req.header('x-api-key');
  if (!DIALOFT_AI_API_KEY || provided !== DIALOFT_AI_API_KEY) {
    logger.warn(`Rejected request to ${req.path} — missing or wrong x-api-key`);
    return res.status(401).json({ error: 'unauthorized' });
  }
  return next();
};
