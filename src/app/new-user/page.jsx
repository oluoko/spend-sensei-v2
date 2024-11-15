import { prisma } from "@/utils/db";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const createNewUser = async () => {
  const user = await currentUser();
  console.log(user);
  if (!user) {
    throw new Error("User not found");
  }
  const match = await prisma.user.findUnique({
    where: {
      clerkUserId: user.id,
    },
  });

  if (!match) {
    await prisma.user.create({
      data: {
        clerkUserId: user.id,
        email: user?.emailAddresses[0].emailAddress,
      },
    });
  }

  redirect("/journal");
};

const NewUser = async () => {
  await createNewUser();
  return <div className="text-3xl flex">...loading</div>;
};

export default NewUser;
