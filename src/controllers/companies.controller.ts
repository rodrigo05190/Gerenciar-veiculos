import type { Request, Response } from 'express';
import * as companieRepository from '../repositories/companie.repository';
import { BadRequestError, NotFoundError } from '../helpers/api-erros';

export const create = async (req: Request, res: Response) => {
  const { name, email, phone , cnpj } = req.body;
  if (!name) {
    throw new Error('Name is invalid.');
  }
  if (!email) {
    throw new Error('Email is invalid.');
  }
  if (!phone) {
    throw new Error('Phone is invalid.');
  }
  if (!cnpj) {
    throw new Error('Cnpj is invalid.');
  }
  const companieExists = await companieRepository.findOneEmail(email);
  if (companieExists) throw new BadRequestError('email already exists');
  const companie = await companieRepository.create({
    name,
    email,
    phone,
    cnpj
  });
  return res.status(200).json(companie);
};
export const getAll = async (req: Request, res: Response) => {
  const companies = await companieRepository.getAll();
  return res.status(200).json(companies);
};
export const remove = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const companies = await companieRepository.getById(id);
  if (!companies) throw new NotFoundError('companie does not exist');
  await companieRepository.removeById(id);
  return res.status(200).json('companie delete success');
};
export const getById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const companies = await companieRepository.getById(id);
  if (!companies) throw new NotFoundError('companie does not exist');
  return res.status(200).json(companies);
};
export const update = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { name, email, phone, cnpj } = req.body;
  const companieExists = await companieRepository.findOneId(id);
  if (!companieExists) throw new NotFoundError('companie does not exist');
  const companie = await companieRepository.update({
    id,
    name,
    email,
    phone,
    cnpj
  });
  return res.status(200).json({companie: companie});
};
