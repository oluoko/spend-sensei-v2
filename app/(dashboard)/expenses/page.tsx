import ExpenseListTable from "@/components/ExpenseListTable";
import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";

const Expenses = async () => {
  const user = await getUserByClerkId();

  const expenses = await prisma.expense.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="p-10">
      <h2 className="font-bold text-3xl">My Expenses</h2>

      <ExpenseListTable expenses={expenses} />
    </div>
  );
};

export default Expenses;
