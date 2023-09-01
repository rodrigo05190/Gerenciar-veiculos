import { NextFunction, Request, Response } from 'express';
import { UnauthorizedError } from '../helpers/api-erros';
import * as userRepository from '../repositories/user.repository';
import jwt from 'jsonwebtoken';


interface AuthenticatedRequest extends Request {
  user?: any;
}

type JwtPayload = {
  id: number;
};

export const authMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  
  const excludedPaths = ['/user/login', '/user/register','/api-docs/'];
  if (excludedPaths.includes(req.path)) {
    return next();
  }
  
  const { authorization } = req.headers;

  if (!authorization) {
    throw new UnauthorizedError('Não autorizado');
  }

  const token = authorization.split(' ')[1];

  const { id } = jwt.verify(token, process.env.JWT_PASS ?? '') as JwtPayload;

  const user = await userRepository.findOneId(id);

  if (!user) {
    throw new UnauthorizedError('Não autorizado');
  }

  const { password: _, ...loggedUser } = user;

  req.user = loggedUser;

  next();
};
