import { PrismaClient } from '@prisma/client';

import { envs } from '../config';

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

if (envs.NODE_ENV !== 'production') globalThis.prisma = prisma;

export default prisma;
