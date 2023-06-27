import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const searchQuery = async (query: string) => {
  const result = await prisma.users.findMany({
    where: {
      username: {
        equals: `${query}`
      }
    }
  });
  return result;
}

export default searchQuery;