import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/auth';

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ error: 'Invalid token.' });
  }
};

export const authorize = (requiredRole: number) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { role } = req.user;

    if ((role & requiredRole) === 0) {
      return res.status(403).json({ error: 'Access denied.' });
    }

    next();
  };
};
