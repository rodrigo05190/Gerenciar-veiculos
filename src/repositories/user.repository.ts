import { User } from '@prisma/client';
import { prismaClient } from '../database/client';

export const register = async (
  user: Omit<
    User,
    'id' | 'createdAt' | 'updatedAt' | 'passwordResetToken' | 'passwordResetAt'
  >
) => {
  const { email, name, password } = user;
  return prismaClient.user.create({
    data: user,
    select: {
      id: true,
      name: true,
      email: true,
      companyId: true,
      company: {
        select: {
          id: true,
          name: true,
          cnpj: true,
          phone: true,
          email: true
        }
      }
    },
  });
};

export const login = async (user: User) => {
  const { email, password } = user;
  return await prismaClient.user.findFirst({
    where: {
      email: email,
      password: password,
    },
    select: {
      id: true,
      name: true,
      email: true,
      password: true,
      createdAt: true,
      updatedAt: true,
      companyId: true
    },
  });
};

export const forgot = async (
  user: Omit<User, 'id' | 'name' | 'password' | 'createdAt' | 'updatedAt' | 'companyId' | 'phone' | 'cpf'>
) => {
  const { email, passwordResetAt, passwordResetToken } = user;
  return prismaClient.user.update({
    where: {
      email: email,
    },
    data: {
      passwordResetAt: passwordResetAt,
      passwordResetToken: passwordResetToken,
    },
  });
};

export const reset = async (token: string, password: string, date: string) => {
  console.log(date);
  try {
    const user = await prismaClient.user.findFirst({
      where: {
        passwordResetToken: token,
      },
    });
    return await prismaClient.user.update({
      where: {
        email: user?.email,
      },
      data: {
        password: password,
        passwordResetAt: date,
        passwordResetToken: null,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const update = async (
  user: Omit<
    User,
    'createdAt' | 'updatedAt' | 'passwordResetAt' | 'passwordResetToken'
  >
) => {
  return prismaClient.user.update({
    where: {
      id: user.id,
    },
    data: {
      name: user.name,
      email: user.email,
      password: user.password,
      companyId : user.companyId
    },
  });
};

export const create = async (user: User) => {
  const { email, name, password } = user;
  return prismaClient.user.create({
    data: user,
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
      companyId: true
    },
  });
};

export const findOneEmail = async (email: string) => {
  return await prismaClient.user.findUnique({
    where: {
      email: email,
    },
  });
};

export const findOneId = async (id: number) => {
  return await prismaClient.user.findUnique({
    where: {
      id: id,
    },
  });
};

export const getAll = async () => {
  return await prismaClient.user.findMany({
    include:{
      company:true
    }
  });
};

export const getById = async (id: number) => {
  return await prismaClient.user.findUnique({
    where: {
      id: id,
    },
    include:{
      company:true
    }
  });
};

export const removeById = async (id: number) => {
  try {
    const user = await prismaClient.user.findUnique({
      where: {
        id: id,
      },
      include: {
        company: true
      }
    });

    if (!user) {
      return;
    }

    if (user.company) {
      await prismaClient.companies.update({
        where: {
          id: user.company.id,
        },
        data: {
          users: {
            disconnect: { id: id },
          },
        },
      });
    }

    await prismaClient.user.delete({
      where: {
        id: id,
      },
    });
    
  } catch (error) {
    console.error('Error deleting user:', error);
  } finally {
    await prismaClient.$disconnect();
  }
};
