"use client";

import { Trash } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import { deleteExpense } from "@/utils/api";
import { Expense } from "@/utils/types";

const ExpenseListTable = ({ expenses }: { expenses: Expense[] }) => {
  const onDeleteExpense = async (id: string) => {
    try {
      await deleteExpense(id);
      toast.success("Expense deleted successfully");
    } catch (error) {
      toast.error("Failed to delete expense");
      console.error("Failed to delete expense: ", error);
    }
  };

  // Format date
  const formatDate = (date: Date) => {
    const dayOfWeek = date.toLocaleString("en-US", { weekday: "long" });
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "long" });
    const year = date.getFullYear();

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
    <div className="mt-3">
      <div className="grid grid-cols-4 rounded-tl-xl rounded-tr-xl bg-slate-200 p-2 mt-3 border border-slate-500/40">
        <h2 className="font-bold">Name</h2>
        <h2 className="font-bold">Amount</h2>
        <h2 className="font-bold">Date</h2>
        <h2 className="font-bold">Action</h2>
      </div>
      {expenses.map((expense, index) => (
        <div
          key={index}
          className="grid grid-cols-4 bg-slate-50  p-2 border border-slate-500/40"
        >
          <h2>{expense.name}</h2>
          <h2>{expense.amount}</h2>
          <h2>{formatDate(expense.createdAt)}</h2>
          <h2
            onClick={() => onDeleteExpense(expense.id)}
            className="text-red-500 cursor-pointer"
          >
            Delete
          </h2>
        </div>
      ))}
    </div>
  );
};

export default ExpenseListTable;
