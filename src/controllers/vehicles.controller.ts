import type { Request, Response } from 'express';
import * as vehicleRepository from '../repositories/vehicle.repository';
import * as userRepository from '../repositories/user.repository';
import * as companyRepository from '../repositories/companie.repository';
import { BadRequestError, NotFoundError } from '../helpers/api-erros';

export const create = async (req: Request, res: Response) => {
  const { alias, placa , userId, companyId } = req.body;

  if (!placa) {
    throw new Error('Placa is invalid.');
  }
  if (!alias) {
    throw new Error('Alias is invalid.');
  }

  const vehicleExistsPlaca = await vehicleRepository.findOnePlaca(placa);
  if (vehicleExistsPlaca) throw new BadRequestError('placa already exists');

  if ((userId && companyId) || (!userId && !companyId)) {
    throw new BadRequestError('You must provide either userId or companyId, but not both.');
  }

  if(userId){
    const user = await userRepository.getById(userId);
    if (!user) throw new NotFoundError('user does not exist');
  }
  
  if(companyId){
    const company = await companyRepository.getById(companyId);
    if (!company) throw new NotFoundError('company does not exist');
  }
  
  const vehicle = await vehicleRepository.create({
    placa,
    alias,
    userId,
    companyId
  });
  return res.status(200).json(vehicle);
};
export const getAll = async (req: Request, res: Response) => {
  const vehicles = await vehicleRepository.getAll();
  return res.status(200).json(vehicles);
};
export const remove = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const vehicles = await vehicleRepository.getById(id);
  if (!vehicles) throw new NotFoundError('vehicle does not exist');
  await vehicleRepository.removeById(id);
  return res.status(200).json('vehicle delete success');
};
export const getById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const vehicles = await vehicleRepository.getById(id);
  if (!vehicles) throw new NotFoundError('vehicle does not exist');
  return res.status(200).json(vehicles);
};
export const update = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { placa, alias, userId, companyId } = req.body;
  const vehicleExists = await vehicleRepository.findOneId(id);
  if (!vehicleExists) throw new NotFoundError('vehicle does not exist');
  const vehicle = await vehicleRepository.update({
    id,
    placa,
    alias,
    userId,
    companyId
  });
  return res.status(200).json({vehicle: vehicle});
};
