import { prisma } from "@/utils/db";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const createNewUser = async () => {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not found");
  }
  const match = await prisma.user.findUnique({
    where: {
      clerkUserId: user.id as string,
    },
  });

  if (!match) {
    await prisma.user.create({
      data: {
        clerkUserId: user.id,
        email: user?.emailAddresses[0].emailAddress,
        firstName: user.firstName,
        lastName: user.lastName,
        imageUrl: user.imageUrl,
      },
    });
  }

  redirect("/dashboard");
};

const NewUser = async () => {
  await createNewUser();
  return <div className="text-3xl flex">...loading</div>;
};

export default NewUser;
