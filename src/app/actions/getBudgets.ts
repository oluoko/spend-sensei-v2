"use server";

import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function getBudgets() {
  const { userId } = auth();

  if (!userId) {
    return { error: "Unauthorized: User not found" };
  }

  try {
    const budgets = await prisma.budget.findMany({
      where: { userId },
      orderBy: {
        createdAt: "desc",
      },
    });

    return { budgets };
  } catch (error) {
    return { error: "Failed to fetch budgets" };
  }
}
