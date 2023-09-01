import { Companies } from '@prisma/client';
import { prismaClient } from '../database/client';

export const getAll = async () => {
  return await prismaClient.companies.findMany();
};

export const getById = async (id: number) => {
  return await prismaClient.companies.findUnique({
    where: {
      id: id,
    },
  });
};

export const create = async (companie: Omit<
  Companies,
  'id' | 'createdAt' | 'updatedAt'
>) => {
  const { email, name, cnpj, phone } = companie;
  return prismaClient.companies.create({
    data: companie,
    select: {
      id: true,
      name: true,
      email: true,
      phone: true
    },
  });
};

export const findOneEmail = async (email: string) => {
  
  return prismaClient.companies.findUnique({
    where:{
      email: email
    }
  })
};

export const update = async (
  companie: Omit<
    Companies,
    'createdAt' | 'updatedAt'
  >
) => {
  return prismaClient.companies.update({
    where: {
      id: companie.id,
    },
    data: {
      name: companie.name,
      email: companie.email,
      cnpj : companie.cnpj,
      phone : companie.phone
      
    },
  });
};

export const findOneId = async (id: number) => {
  return await prismaClient.companies.findUnique({
    where: {
      id: id,
    },
  });
};

export const removeById = async (id: number) => {
  return await prismaClient.companies.delete({
    where: {
      id: id,
    },
  });
};

