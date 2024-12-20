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

    const { name, amount, icon } = await req.json();

    if (!name || !amount || !icon) {
      console.error("Invalid request payload:", { name, amount, icon });
      return NextResponse.json(
        { error: "Invalid request payload" },
        { status: 400 }
      );
    }

    const income = await prisma.income.create({
      data: {
        userId: user.id,
        name: name,
        amount: amount,
        icon: icon,
        createdAt: new Date(),
      },
    });

    if (!income) {
      return NextResponse.json(
        { error: "Income wasn't added to the databae" },
        { status: 500 }
      );
    }

    revalidatePath("/dashboard");
    revalidatePath("/incomes");

    return NextResponse.json({ data: income });
  } catch (error) {
    console.error("Error in POST /api/incomes:", error);
    return NextResponse.json(
      { error: "Failed to create budget in POST /api/incomes:" },
      { status: 500 }
    );
  }
};
