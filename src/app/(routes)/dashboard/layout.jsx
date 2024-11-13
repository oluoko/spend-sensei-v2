"use client";

import React, { useEffect } from "react";
import SideNav from "./_components/SideNav";
import DashboardHeader from "./_components/DashboardHeader";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const DashboardLayout = ({ children }) => {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {}, []);

  const checkUserBudgets = async () => {
    const userBudgets = await prisma.budget.findMany({
      where: {
        userId: user.id,
      },
    });

    if (userBudgets.length === 0) {
      router.push("/dashboard/budgets");
    }
  };
  return (
    <div>
      <div className="fixed md:w-64 hidden md:block">
        <SideNav />
      </div>
      <div className="md:ml-64">
        <DashboardHeader />
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
