import type { Request, Response } from 'express';
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from '../helpers/api-erros';
import * as userRepository from '../repositories/user.repository';
import * as companieRepository from '../repositories/companie.repository';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as crypto from 'crypto';
import moment from 'moment';
import sendEmail from '../helpers/send-email';

export const register = async (req: Request, res: Response) => {
  const { name, email, password, phone, cpf, companyId } = req.body;

  if (!name) {
    throw new Error('Name is invalid.');
  }
  if (!email) {
    throw new Error('E-mail is invalid.');
  }
  if (!cpf) {
    throw new Error('Cpf is invalid.');
  }
  if (!phone) {
    throw new Error('Phone is invalid.');
  }

  if(companyId){
    const company = await companieRepository.getById(companyId);
    if (!company) throw new NotFoundError('company does not exist');
  }
  const userExists = await userRepository.findOneEmail(email);
  if (userExists) throw new BadRequestError('email already exists');
  const hashPassword = await bcrypt.hash(password, 10);
  const user = await userRepository.register({
    name,
    email,
    password: hashPassword,
    companyId,
    phone,
    cpf
  });
  return res.status(200).json(user);
};
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await userRepository.findOneEmail(email);
  if (!user) throw new BadRequestError('Invalid credentials');
  const verifyPass = await bcrypt.compare(password, user.password);
  if (!verifyPass) throw new UnauthorizedError('Invalid credentials');
  const token = jwt.sign({ id: user.id }, process.env.JWT_PASS || '', {
    expiresIn: '2d',
  });
  user.password = '';
  return res.status(200).json({
    user: user,
    token: token,
  });
};
export const forgot = async (req: Request, res: Response) => {
  const { email } = req.body;
  const user = await userRepository.findOneEmail(email);
  if (!user) throw new BadRequestError('Invalid credentials');
  const resetToken = crypto.randomBytes(32).toString('hex');
  const passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  const passwordResetAt = new Date(Date.now() + 10 * 60 * 1000);
  const dataForgotPassword = { email, passwordResetToken, passwordResetAt };
  await userRepository.forgot(dataForgotPassword);

  const emailResult = await sendEmail({
    subject: 'Reset Password',
    link: `${process.env.BASE_URL_PAGE}/reset-password?token=${passwordResetToken}`,
    to: user.email,
    name: user.name,
    productName: 'Teste Node',
  });
  return res.status(200).json({ message: 'email sent to your mailbox' });
};
export const reset = async (req: Request, res: Response) => {
  const { token } = req.params;
  const { password } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);
  const momentDate = moment().format('YYYY-MM-DD hh:mm:ss.mmm');
  const nowMomentDate = new Date(momentDate).toISOString();
  const user = await userRepository.reset(token, hashPassword, nowMomentDate);
  if (!user) throw new BadRequestError('Invalid credentials');
  return res.status(200).json({ message: 'password changed successfully' });
};
export const create = async (req: Request, res: Response) => {
  const { name, email, password ,phone,cpf} = req.body;
  const userExists = await userRepository.findOneEmail(email);
  if (userExists) throw new BadRequestError('email already exists');
  const hashPassword = await bcrypt.hash(password, 10);
  const user = await userRepository.register({
    name,
    email,
    password: hashPassword,
    companyId: null,
    phone,
    cpf
  });
  return res.status(200).json(user);
};
export const getAll = async (req: Request, res: Response) => {
  const users = await userRepository.getAll();
  return res.status(200).json(users);
};
export const getById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const users = await userRepository.getById(id);
  if (!users) throw new NotFoundError('user does not exist');
  return res.status(200).json(users);
};
export const update = async (req: Request, res: Response) => {
  const { id, name, email, password, phone, cpf, companyId } = req.body;
  const userExists = await userRepository.findOneId(id);
  if (!userExists) throw new NotFoundError('user does not exist');
  const hashPassword = await bcrypt.hash(password, 10);
  const user = await userRepository.update({
    id,
    name,
    email,
    password: hashPassword,
    companyId,
    phone,
    cpf
  });
  return res.status(200).json({user: user});
};
export const remove = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const user = await userRepository.getById(id);
  if (!user) throw new NotFoundError('user does not exist');
  await userRepository.removeById(id);
  return res.status(200).json('user delete sucess');
};
