"use server";

import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function getExpenses() {
  const { userId } = auth();

  if (!userId) {
    return { error: "Unauthorized: User not found" };
  }

  try {
    const expenses = await prisma.expense.findMany({
      where: { userId },
      orderBy: {
        createdAt: "desc",
      },
    });

    return { expenses };
  } catch (error) {
    return { error: "Failed to fetch expenses" };
  }
}
