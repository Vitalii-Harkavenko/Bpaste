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
    const user = await prisma.users.findUnique({
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
    return {name: name, password: password};
  } catch (error) {
    console.error('Error during user login:', error);
  }
};