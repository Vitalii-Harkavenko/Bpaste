import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const searchQuery = async ({
  query, owner, tags
}: {
  query: string, owner: string, tags: string
}) => {
  const keywords = query !== "" ? query.split(' ') : [];
  const tagsKeywords = tags !== "" ? tags.split(', ') : [];
  const owners = owner !== "" ? owner.split(', ') : [];
  const whereClauses = [];

  if (keywords.length > 0) {
    whereClauses.push(
      ...keywords.map(keyword => ({
        title: {
          contains: keyword
        }
      }))
    );
  }

  if (tagsKeywords.length > 0) {
    whereClauses.push(
      ...tagsKeywords.map(keyword => ({
        tags: {
          contains: keyword
        }
      }))
    );
  }

  if (owners.length > 0) {
    whereClauses.push(
      ...owners.map(keyword => ({
        owner: {
          contains: keyword
        }
      }))
    );
  }

  const result = await prisma.post.findMany({
    where: {
      AND: whereClauses
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
    const existingUser = await prisma.user.findUnique({
      where: {
        name,
      },
    });
    if (existingUser) {
      await prisma.$disconnect();
      return "This username has already been taken";
    };
    await prisma.user.create({
      data: {
        name,
        password,
      },
    });
    await prisma.$disconnect();
    return {name: name, password: password};
  } catch (error) {
    await prisma.$disconnect();
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
      await prisma.$disconnect();
      return 'Username is wrong';
    }
    if (user.password !== password) {
      await prisma.$disconnect();
      return 'Password is wrong';
    }
    await prisma.$disconnect();
    return {name: user.name, password: user.password};
  } catch (error) {
    await prisma.$disconnect();
    console.error('Error during user login:', error);
  }
};
export const createPost = async ({
  title,
  content,
  tags,
  user
}: {
  title: string,
  content: string,
  tags: string[],
  user: { name: string, password: string }
}) => {
  const checkOwner = await prisma.user.findUnique({
    where: {
      name: user.name
    }
  });
  if (!checkOwner || checkOwner.password !== user.password) {
    await prisma.$disconnect();
    return;
  };
  await prisma.post.create({
    data: {
      title,
      content,
      tags: tags.join(', '),
      owner: user.name
    }
  });
  await prisma.$disconnect();
  return "The post was created";
}
export const findPost = async ({
  post, user
}: {
  post: string,
  user: string
}) => {
  const retreivedPost = await prisma.post.findFirst({
    where: {
      title: post,
      owner: user
    }
  });
  await prisma.$disconnect();
  if (!retreivedPost) return null;
  const {title, content, tags, date, likes, owner} = retreivedPost;
  const processedTags = tags.split(", ");
  return {title, content, tags: processedTags, date, likes, owner};
};

export const likePost = async ({
  user: name,
  post: { owner, title: title }
}: {
  user: string;
  post: { owner: string; title: string };
}) => {
  try {
    const post = await prisma.post.findFirst({
      where: { title: title, owner: owner }
    });

    if (!post) {
      await prisma.$disconnect();
      throw new Error('Post not found');
    }
    const likedBy = post.liked_by ? post.liked_by.split(',').map((username) => username.trim()) : [];
    const likes = post.likes || 0;

    if (likedBy.includes(name)) {
      const updatedLikes = likes - 1;
      const updatedLikedBy = likedBy.filter((username) => username !== name).join(', ');

      await prisma.post.update({
        where: { id: post.id },
        data: { likes: updatedLikes, liked_by: updatedLikedBy }
      });
      await prisma.$disconnect();
      return {likes: updatedLikes, liked: false};
    } else {
      const updatedLikes = likes + 1;
      const updatedLikedBy = [...likedBy, name].join(', ');

      await prisma.post.update({
        where: { id: post.id },
        data: { likes: updatedLikes, liked_by: updatedLikedBy }
      });
      await prisma.$disconnect();
      return {likes: updatedLikes, liked: true};
    }
  } catch (error) {
    console.error('Error while processing likePost:', error);
  }
};
export const likedPost = async ({
  owner, title, user 
}: {
  owner: string; title: string; user: string;
}) => {
  try {
    const post = await prisma.post.findFirst({
      where: { title: title, owner: owner }
    });
    if (!post) {
      await prisma.$disconnect();
      throw new Error('Post not found');
    }
    const likedBy = post.liked_by ? post.liked_by.split(',').map((username) => username.trim()) : [];
    if (likedBy.includes(user)) {
      await prisma.$disconnect();
      return true;
    } else {
      await prisma.$disconnect();
      return false;
    }
  } catch (error) {
    console.error('Error while processing likePost:', error);
  }
};

export const deletePost = async ({
  title, owner, user: { name, password }
}: {
  title: string, owner: string, user: { name: string; password: string };
}) => {
  const foundUser = await prisma.user.findFirst({
    where: {
      name,
      password
    }
  });

  if (!foundUser) {
    await prisma.$disconnect();
    throw new Error("Invalid credentials. User not found or password incorrect.");
  }

  await prisma.post.deleteMany({
    where: {
      title,
      owner
    }
  });

  await prisma.$disconnect();
  return true;
};
export const getRandomPosts = async () => {

  const allPostIDs = await prisma.post.findMany({
    select: { id: true },
  });

  const randomIndexes: number[] = [];

  while (randomIndexes.length < 3 && allPostIDs.length > 0) {

    const randomIndex = Math.floor(Math.random() * allPostIDs.length);

    if (!randomIndexes.includes(randomIndex)) {
      randomIndexes.push(randomIndex);
    };
  };
  
  const randomPostIDs = randomIndexes.map((index) => allPostIDs[index].id);

  const randomPosts = await prisma.post.findMany({
    where: {
      id: {
        in: randomPostIDs,
      },
    },
  });

  return randomPosts;
}