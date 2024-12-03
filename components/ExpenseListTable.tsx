"use client";

import React from "react";
import { toast } from "sonner";
import { deleteExpense } from "@/utils/api";
import { Expense } from "@/utils/types";
import { Trash, Pen } from "lucide-react";

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

  const onEditExpense = (id: string) => {
    console.log("Edit expense with id: ", id);
  };

  // Format date
  const formatDate = (date: Date) => {
    const dayOfWeek = date.toLocaleString("en-US", { weekday: "long" });
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
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
    <div className="grid grid-cols-1 md:grid-cols-2 mt-3 gap-2">
      {expenses.map((expense, index) => (
        <div
          key={index}
          className="grid  rounded-xl  border border-slate-400/30"
        >
          <div className="w-full  p-2 md:p-3 flex gap-2  rounded-t-xl border-b border-slate-400/30">
            <h2 className="text-xl p-1 bg-slate-100 rounded-full">😀</h2>
            <div className="grid">
              <h2 className="text-[13px] font-bold">Budget Name</h2>
              <h2 className="text-[10px]">{formatDate(expense.createdAt)}</h2>
            </div>
          </div>
          <div className="w-full  p-2 md:p-3">
            <h2 className="text-xs md:text-lg">{expense.name}</h2>
            <h2 className="text-xs md:text-lg">{expense.amount}</h2>
          </div>

          <div className="text-xs md:text-lg grid md:flex items-center w-full justify-between border-t border-slate-400/30 px-2 md:px-3 py-1">
            <h2
              onClick={() => onDeleteExpense(expense.id)}
              className="text-red-500 cursor-pointer flex items-center gap-2 rounded-full hover:bg-slate-500/30 hover:border hover:border-slate-400/30 px-2 py-[2px]"
            >
              <Trash className="size-4 md:size-[20px] " /> Delete
            </h2>
            <h2
              onClick={() => onEditExpense(expense.id)}
              className="text-black cursor-pointer flex items-center gap-2 rounded-full hover:bg-slate-500/30 hover:border hover:border-slate-400/30 px-2 py-[2px]"
            >
              <Pen className="size-4 md:size-[20px]" /> Edit
            </h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExpenseListTable;
