"use server";

import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function getExpensesByBudgetId(budgetId: string) {
  const { userId } = auth();

  if (!userId) {
    return { error: "Unauthorized: User not found" };
  }

  try {
    const expensesByBudgetId = await prisma.expense.findMany({
      where: { userId, budgetId },
      orderBy: {
        createdAt: "desc",
      },
    });

    return { expensesByBudgetId };
  } catch (error) {
    return { error: "Failed to fetch expensesByBudgetId" };
  }
}
