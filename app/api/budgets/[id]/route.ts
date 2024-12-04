import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const PATCH = async (req: Request, { params }) => {
  const { name, amount, icon, createdAt } = await req.json();

  const user = await getUserByClerkId();

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const updatedData = {
    ...(name && { name }),
    ...(amount && { amount }),
    ...(icon && { icon }),
    ...(createdAt && { createdAt }),
  };

  const updatedBudget = await prisma.budgets.update({
    where: {
      id: params.id,
      userId: user.id,
    },
    data: updatedData,
  });

  revalidatePath("/dashboard");
  revalidatePath("/budgets");
  revalidatePath(`/budgets/${params.id}`);

  return NextResponse.json({ data: updatedBudget });
};

export const DELETE = async (req: Request, { params }) => {
  const user = await getUserByClerkId();

  try {
    // Verify that the user owns the budget before deleting
    const budget = await prisma.budgets.findUnique({
      where: {
        id: params.id,
        userId: user.id,
      },
    });

    if (!budget) {
      return NextResponse.json(
        { error: "Budget not found or you do  not have permission" },
        { status: 404 }
      );
    }

    await prisma.budgets.delete({
      where: {
        id: params.id,
      },
    });

    revalidatePath("/dashboard");
    revalidatePath("/budgets");

    return NextResponse.json({ message: "Budget deleted Successfully" });
  } catch (error) {
    console.error("Error deleting Budget:", error);
    return NextResponse.json(
      { error: "Failed to delete Budget" },
      { status: 500 }
    );
  }
};

export const GET = async (req: Request, { params }) => {
  const user = await getUserByClerkId();

  const budget = await prisma.budgets.findUnique({
    where: {
      id: params.id,
      userId: user.id,
    },
  });

  if (!budget) {
    return NextResponse.json({ error: "Budget not found" }, { status: 404 });
  }

  const expenses = await prisma.expense.findMany({
    where: {
      budgetId: params.id,
    },
  });

  return NextResponse.json({ data: { budget, expenses } });
};
