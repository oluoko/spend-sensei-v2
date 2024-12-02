import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";
import CreateBudget from "./CreateBudget";
import BudgetItem from "./BudgetItem";

const BudgetList = async () => {
  const user = await getUserByClerkId();

  // Fetch budgets for the user
  const budgets = await prisma.budgets.findMany({
    where: {
      userId: user?.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // Calculate total expenses for each budget
  const budgetsWithExpenses = await Promise.all(
    budgets.map(async (budget) => {
      const expenses = await prisma.expense.findMany({
        where: {
          budgetId: budget.id,
        },
      });
      const totalSpend = expenses.reduce((acc, curr) => acc + curr.amount, 0);
      const items = expenses.length;
      console.log("Budget and total spend: ", { ...budget, totalSpend });
      return { ...budget, totalSpend, items };
    })
  );

  return (
    <div className="mt-7">
      <div className="grid grid-cols-1">
        <CreateBudget />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {budgetsWithExpenses.length > 0
            ? budgetsWithExpenses.map((budget, index) => (
                <BudgetItem
                  key={index}
                  budget={budget}
                  totalSpend={budget.totalSpend}
                  items={budget.items}
                />
              ))
            : [1, 2, 3].map((item, index) => (
                <div
                  key={index}
                  className="w-full my-1 md:my-2 bg-slate-200 rounded-lg h-[150px] animate-pulse"
                ></div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default BudgetList;
