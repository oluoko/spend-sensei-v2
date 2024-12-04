"use client";

import React from "react";
import { toast } from "sonner";
import { deleteExpense, getBudgets } from "@/utils/api";
import { Expense } from "@/utils/types";
import { Trash, Pen } from "lucide-react";
import Link from "next/link";

const ExpenseListTable = ({ expenses }: { expenses: Expense[] }) => {
  const [budgetMap, setBudgetMap] = React.useState<
    Record<string, { name: string; icon: string }>
  >({});

  React.useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const budgets = await getBudgets();
        const budgetLookup = budgets.reduce(
          (
            acc: Record<string, { name: string; icon: string }>,
            budget: any
          ) => {
            acc[budget.id] = { name: budget.name, icon: budget.icon };
            return acc;
          },
          {}
        );
        setBudgetMap(budgetLookup);
      } catch (error) {
        console.error("Error fetching budgets:", error);
      }
    };

    fetchBudgets();
  }, []);

  const onDeleteExpense = async (id: string) => {
    try {
      await deleteExpense(id);
      toast.success("Expense deleted successfully");
    } catch (error) {
      toast.error("Failed to delete expense");
      console.error("Failed to delete expense: ", error);
    }
  };

  const onEditExpense = (id: string) => {
    console.log("Edit expense with id: ", id);
  };

  const formatDate = (date: Date | string) => {
    // Convert to a Date object if date is a string
    const validDate = typeof date === "string" ? new Date(date) : date;

    const dayOfWeek = validDate.toLocaleString("en-US", { weekday: "long" });
    const day = validDate.getDate();
    const month = validDate.toLocaleString("en-US", { month: "short" });
    const year = validDate.getFullYear();

    const getOrdinalSuffix = (day: number) => {
      if (day > 3 && day < 21) return "th";
      switch (day % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };

    const dayWithSuffix = `${day}${getOrdinalSuffix(day)}`;
    return `${dayOfWeek}, ${dayWithSuffix} ${month}, ${year}`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 mt-3 gap-2">
      {expenses.map((expense, index) => {
        const budget = budgetMap[expense.budgetId];

        return (
          <div
            key={index}
            className="grid  rounded-xl  border border-slate-400/30"
          >
            <Link
              href={`/budgets/${expense.budgetId}`}
              className="w-full  p-2 md:p-3 flex gap-2  rounded-t-xl border-b border-slate-400/30"
            >
              <h2 className="text-xl p-1 bg-slate-100 rounded-full">
                {budget?.icon || "📦"}
              </h2>
              <div className="grid">
                <h2 className="text-[13px] font-bold">
                  {budget?.name || "Unknown Budget"}
                </h2>
                <h2 className="text-[10px]">{formatDate(expense.createdAt)}</h2>
              </div>
            </Link>
            <div className="w-full  p-2 md:p-3">
              <h2 className="text-xs md:text-lg">{expense.name}</h2>
              <h2 className="text-xs md:text-lg">{expense.amount}</h2>
            </div>

            <div className="text-xs md:text-lg flex items-center w-full justify-between border-t border-slate-400/30 px-2 md:px-3 py-[8px]">
              <h2
                onClick={() => onDeleteExpense(expense.id)}
                className="text-red-500 cursor-pointer flex items-center gap-2 rounded-full hover:bg-red-500 hover:text-white border border-red-500 px-2"
              >
                <Trash className="size-4 md:size-[20px] " /> Delete
              </h2>
              <h2
                onClick={() => onEditExpense(expense.id)}
                className="text-black cursor-pointer flex items-center gap-2 rounded-full hover:bg-black border hover:text-white border-black px-2 "
              >
                <Pen className="size-4 md:size-[20px]" /> Edit
              </h2>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ExpenseListTable;
