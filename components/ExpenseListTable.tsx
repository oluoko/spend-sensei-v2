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
      <div className="grid grid-cols-5 rounded-tl-xl rounded-tr-xl bg-slate-200 p-2 mt-3 border border-slate-500/40">
        <h2 className="font-bold text-md md:text-xl">Name</h2>
        <h2 className="font-bold text-md md:text-xl">Amount</h2>
        <h2 className="font-bold text-md md:text-xl">Date</h2>
        <h2 className="font-bold text-md md:text-xl">Actions</h2>
        <h2 className="font-bold text-md md:text-xl "></h2>
      </div>
      {expenses.map((expense, index) => (
        <div
          key={index}
          className="grid grid-cols-5 gap-[10px] items-center bg-slate-50  p-2 border border-slate-500/40"
        >
          <h2 className="text-xs md:text-lg">{expense.name}</h2>
          <h2 className="text-xs md:text-lg">{expense.amount}</h2>
          <h2 className="text-xs md:text-lg">
            {formatDate(expense.createdAt)}
          </h2>
          <div className="text-xs md:text-lg flex items-center w-full justify-between">
            <h2
              onClick={() => onDeleteExpense(expense.id)}
              className="text-red-500 cursor-pointer flex items-center  "
            >
              <Trash className="size-4 md:size-8 p-[3px] md:p-[6px]" /> Delete
            </h2>
            <h2
              onClick={() => onEditExpense(expense.id)}
              className="text-red-500 cursor-pointer flex items-center "
            >
              <Pen className="size-4 md:size-8 p-[3px] md:p-[6px]" /> Edit
            </h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExpenseListTable;
