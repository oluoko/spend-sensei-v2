import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const user = await getUserByClerkId();

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { name, amount, budgetId } = await req.json();

    if (!name || !amount || !budgetId) {
      return NextResponse.json(
        { error: "Invalid request payload" },
        { status: 400 }
      );
    }

    const expense = await prisma.expense.create({
      data: {
        userId: user.id,
        name: name,
        amount: amount,
        budgetId: budgetId,
        createdAt: new Date(),
      },
    });

    if (!expense) {
      return NextResponse.json(
        { error: "Budget wasn't added to the databae" },
        { status: 500 }
      );
    }

    revalidatePath("/dashboard");
    revalidatePath("/expenses");
    revalidatePath("/expenses");
    revalidatePath(`/budgets/${budgetId}`);

    return NextResponse.json({ data: expense });
  } catch (error) {
    console.error("Error in POST /api/budgets:", error);
    return NextResponse.json(
      { error: "Failed to create budget in POST /api/budgets:" },
      { status: 500 }
    );
  }
};
