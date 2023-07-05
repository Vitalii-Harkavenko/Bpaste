import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const searchQuery = async (query: string) => {
  const keywords = query.split(' ');
  const result = await prisma.users.findMany({
    where: {
      name: {
        in: keywords
      }
    }
  });
  return result;
};

export const createUser = async ({
  name, password
}: {
  name: string, password: string
}) => {
  try {
    await prisma.users.create({
      data: {
        name,
        password,
      },
    });
    return "The account was created"
  } catch (error) {
    console.error("An error occurred:", error);
  }
} 