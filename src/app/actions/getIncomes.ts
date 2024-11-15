"use server";

import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function getIncomes() {
  const { userId } = auth();

  if (!userId) {
    return { error: "Unauthorized: User not found" };
  }

  try {
    const incomes = await prisma.income.findMany({
      where: { userId },
      orderBy: {
        createdAt: "desc",
      },
    });

    return { incomes };
  } catch (error) {
    return { error: "Failed to fetch incomes" };
  }
}
