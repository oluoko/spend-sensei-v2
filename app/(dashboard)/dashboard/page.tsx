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

      <div className="grid md:flex mt-3 md:mt-6 gap-2 md:gap-6">
        <div className="lg:col-span-2 w-full md:w-2/3">
          <DashboardBarChart budgets={budgetsWithExpenses} />

          <ExpenseListTable expenses={expenseList} />
        </div>

        <div className=" gap-2 hover:bg-slate-100 rounded-2xl border border-slate-400/30  p-4 w-full md:w-1/3">
          <h2 className="font-bold text-lg">Latest Budget</h2>

          <div className="w-full my-2">
            {budgetList?.length > 0
              ? budgetsWithExpenses.map((budget, index) => (
                  <BudgetItem
                    budget={budget}
                    key={index}
                    totalSpend={budget.totalSpend}
                    items={budget.items}
                  />
                ))
              : [1, 2].map((items, index) => (
                  <div
                    key={index}
                    className="h-[150px] w-full bg-slate-200 lg animate-pulse"
                  ></div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
