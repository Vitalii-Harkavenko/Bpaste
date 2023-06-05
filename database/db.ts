import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const executeQuery = async () => {
  const result = await prisma.users.findMany();
  return result;
}

export default executeQuery;