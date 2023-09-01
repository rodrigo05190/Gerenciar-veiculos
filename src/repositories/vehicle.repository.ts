import { Vehicle } from '@prisma/client';
import { prismaClient } from '../database/client';

export const getAll = async () => {
  return await prismaClient.vehicle.findMany();
};

export const getById = async (id: number) => {
  return await prismaClient.vehicle.findUnique({
    where: {
      id: id,
    },
    include:{
      company:true,
      user:true
    }
  });
};

export const create = async (vehicle: Omit<
  Vehicle,
  'id' | 'createdAt' | 'updatedAt'
>) => {
  const { placa, alias, userId, companyId } = vehicle;
  
  return prismaClient.vehicle.create({
    data: vehicle,
    select: {
      id: true,
      placa: true,
      alias: true,
      userId: true,
      companyId: true,
      user :true,
      company:true
    }
  });
};

export const findOnePlaca = async (placa: string) => {
  return prismaClient.vehicle.findUnique({
    where:{
      placa: placa
    },
    include:{
      company:true,
      user:true
    }
  })
};

export const update = async (
  vehicle: Omit<
    Vehicle,
    'createdAt' | 'updatedAt'
  >
) => {
  return prismaClient.vehicle.update({
    where: {
      id: vehicle.id,
    },
    data: {
      placa: vehicle.placa,
      alias: vehicle.alias,
      userId: vehicle.userId,
      companyId: vehicle.companyId
    },
  });
};

export const findOneId = async (id: number) => {
  return await prismaClient.vehicle.findUnique({
    where: {
      id: id,
    },
  });
};

export const removeById = async (id: number) => {
  return await prismaClient.vehicle.delete({
    where: {
      id: id,
    },
  });
};

