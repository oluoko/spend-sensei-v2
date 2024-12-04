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
    ...(createdAt && { createdAt }),
  };

  const updatedExpense = await prisma.expense.update({
    where: {
      id: params.id,
      userId: user.id,
    },
    data: updatedData,
  });

  revalidatePath("/dashboard");
  revalidatePath("/expenses");
  revalidatePath(`/expenses/${params.id}`);

  return NextResponse.json({ data: updatedExpense });
};

export const DELETE = async (req: Request, { params }) => {
  const user = await getUserByClerkId();

  try {
    // Verify that the user owns the expense before deleting
    const expense = await prisma.expense.findUnique({
      where: {
        id: params.id,
        userId: user.id,
      },
    });

    if (!expense) {
      return NextResponse.json(
        { error: "Expense not found or you do  not have permission" },
        { status: 404 }
      );
    }

    await prisma.expense.delete({
      where: {
        id: params.id,
      },
    });

    revalidatePath("/dashboard");
    revalidatePath("/expenses");

    return NextResponse.json({ message: "Expense deleted Successfully" });
  } catch (error) {
    console.error("Error deleting Expense:", error);
    return NextResponse.json(
      { error: "Failed to delete Expense" },
      { status: 500 }
    );
  }
};
