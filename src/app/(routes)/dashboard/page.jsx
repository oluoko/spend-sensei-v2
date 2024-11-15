"use client";

import React, { useState, useEffect } from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import CardInfo from "./_components/CardInfo";
import { getBudgets } from "@/app/actions/getBudgets";

const Daashboard = () => {
  const { user } = useUser();

  const [budgetList, setBudgetList] = useState([]);
  const [incomeList, setIncomeList] = useState([]);
  const [expenseList, setExpenseList] = useState([]);

  useEffect(() => {
    user && getBudgetList();
  }, [user]);

  const getBudgetList = async () => {
    const result = await getBudgets();
    setBudgetList(result);
  };

  return (
    <div className="p-8">
      <h2 className="font-bold text-4xl">Hi, {user?.fullName}</h2>
      <p className="text-gray-500">
        Here's what has been happening with your money. Let's manage your
        expenses.
      </p>

      <CardInfo budgetList={budgetList} incomeList={incomeList} />
    </div>
  );
};

export default Daashboard;
