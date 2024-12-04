"use client";

import React from "react";
import Link from "next/link";

const BudgetItem = ({ budget, totalSpend, items }) => {
  const calculateProgressPercentage = () => {
    const percentage = (totalSpend / budget.amount) * 100;
    return percentage;
  };

  return (
    <Link href={`/budgets/${budget?.id}`}>
      <div className="p-3 my-2 border rounded-2xl hover:shadow-md cursor-pointer h-[150px] bg-white">
        <div className="flex gap-2 items-center justify-between">
          <div className="flex gap-2 items-center">
            <h2 className="text-2xl p-2 bg-slate-100 rounded-full">
              {budget?.icon}
            </h2>
            <div>
              <h2 className="font-bold">{budget.name}</h2>
              <h2 className="text-sm text-gray-500">
                {items ? `${items} items(s)` : "No items yet"}
              </h2>
            </div>
          </div>
          <h2 className="font-bold text-primary text-lg">
            Ksh {budget.amount}
          </h2>
        </div>

        <div className="mt-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs text-slate-400">
              {totalSpend ? `${totalSpend} Spent` : ""}
            </h2>
            <h2 className="text-xs text-slate-400">
              {budget.amount - totalSpend
                ? `${budget.amount - totalSpend} Remaining`
                : ""}
            </h2>
          </div>
          <div className="w-full bg-slate-300 h-2 rounded-full">
            <div
              className="bg-primary h-2 rounded-full"
              style={{ width: `${calculateProgressPercentage()}%` }}
            ></div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BudgetItem;
