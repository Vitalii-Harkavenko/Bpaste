import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const searchQuery = async (query: string) => {
  const keywords = query.split(' ');
  const result = await prisma.user.findMany({
    where: {
      name: {
        in: keywords
      }
    }
  });
  await prisma.$disconnect();
  return result;
};

export const createUser = async ({
  name, password
}: {
  name: string, password: string
}) => {
  try {
    await prisma.user.create({
      data: {
        name,
        password,
      },
    });
    await prisma.$disconnect();
    return {name: name, password: password};
  } catch (error) {
    console.error("An error occurred:", error);
  }
}
export const loginUser = async ({
  name,
  password,
}: {
  name: string;
  password: string;
}) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        name,
      },
    });
    if (!user) {
      return 'Username is wrong';
    }
    if (user.password !== password) {
      return 'Password is wrong';
    }
    await prisma.$disconnect();
    return {name: user.password, password: user.password};
  } catch (error) {
    console.error('Error during user login:', error);
  }
};