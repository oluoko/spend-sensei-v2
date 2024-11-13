import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "./db";

export const checkUser = async () => {
  const user = await currentUser();

  // check for current logged in clerk user
  if (!user) return null;

  // check if user already exists in the database
  const loggedInUser = await prisma.user.findUnique({
    where: {
      clerkUserId: user.id,
    },
  });

  // if user is in the database, return the user
  if (loggedInUser) return loggedInUser;

  // if user is not in the database, create a new user
  const newUser = await prisma.user.create({
    data: {
      clerkUserId: user.id,
      name: `${user.firstName} ${user.lastName}`,
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress,
    },
  });

  return newUser;
};
