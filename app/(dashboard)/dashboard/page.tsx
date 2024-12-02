import BudgetItem from "@/components/BudgetItem";
import { prisma } from "@/utils/db";
import CardInfo from "@/components/CardInfo";
import DashboardBarChart from "@/components/DashboardBarChart";
import ExpenseListTable from "@/components/ExpenseListTable";
import { getUserByClerkId } from "@/utils/auth";

const Dashboard = async () => {
  const user = await getUserByClerkId();

  // Fetch all budgets for the current user
  const budgetList = await prisma.budgets.findMany({
    where: {
      userId: user?.id,
    },
  });

  // Calculate total expenses for each budget and overall total expenses
  const budgetsWithExpenses = await Promise.all(
    budgetList.map(async (budget) => {
      const expenses = await prisma.expense.findMany({
        where: {
          budgetId: budget.id,
        },
      });
      const totalSpend = expenses.reduce((acc, curr) => acc + curr.amount, 0);
      const items = expenses.length;
      return { ...budget, totalSpend, items };
    })
  );

  // Fetch income and expense lists
  const expenseList = await prisma.expense.findMany({
    where: {
      userId: user?.id,
    },
  });

  const incomeList = await prisma.income.findMany({
    where: {
      userId: user?.id,
    },
  });

  return (
    <div className="p-4">
      <h2 className="font-bold text-4xl">Hello there, {user?.firstName}.</h2>
      <p className="text-gray-500">
        Here's what has been happening with your money. Let's manage your
        expenses.
      </p>

      {/* Pass overallTotalExpenses to CardInfo */}
      <CardInfo
        budgets={budgetsWithExpenses}
        incomes={incomeList}
        expenses={expenseList}
      />

      <div className="grid grid-cols-2 lg:grid-cols-3 mt-6 gap-6">
        <div className="lg:col-span-2">
          <DashboardBarChart budgets={budgetsWithExpenses} />

          <ExpenseListTable expenses={expenseList} />
        </div>

        <div className="grid gap-2">
          <h2 className="font-bold text-lg">Latest Budget</h2>
          {budgetList?.length > 0
            ? budgetsWithExpenses.map((budget, index) => (
                <BudgetItem
                  budget={budget}
                  key={index}
                  totalSpend={budget.totalSpend}
                  items={budget.items}
                />
              ))
            : [1, 2, 3, 4].map((items, index) => (
                <div
                  key={index}
                  className="h-[180px] w-full bg-slate-200 lg animate-pulse"
                ></div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
