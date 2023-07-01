import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const searchQuery = async (query: string) => {
  const keywords = query.split(' ');
  const result = await prisma.users.findMany({
    where: {
      username: {
        in: keywords
      }
    }
  });
  return result;
}
export { searchQuery };