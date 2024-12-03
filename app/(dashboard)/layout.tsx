"use client";

import { HomeIcon, BookOpenIcon, ClockIcon } from "@heroicons/react/24/outline";

import { ReactNode } from "react";
import CreatorImage from "@/components/CreatorImage";
import { UserButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  LayoutGrid,
  PiggyBank,
  ReceiptText,
  ShieldCheck,
  CircleDollarSign,
  EllipsisVertical,
  List,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import smallLogo from "@/public/Logo B.png";
import bigLogo from "@/public/Spend Sensei Logo B.png";
import { prisma } from "@/utils/db";

interface DashboardLayoutProps {
  children: ReactNode;
}

const links = [
  {
    icon: LayoutGrid,
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    icon: CircleDollarSign,
    label: "Incomes",
    href: "/incomes",
  },
  {
    icon: ReceiptText,
    label: "Expenses",
    href: "/expenses",
  },
  {
    icon: PiggyBank,
    label: "Budgets",
    href: "/budgets",
  },

  // {
  //   icon: ShieldCheck,
  //   label: 'Upgrade',
  //   href: '/upgrade',
  // },
  { href: "/creator", label: "Creator", icon: CreatorImage },
];

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useUser();
  const router = useRouter();
  const path = usePathname();

  // always close sidebar on load
  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(false);
    };

    handleResize();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const checkUserBudgets = async () => {
    const userBudgets = await prisma.budgets.findMany({
      where: {
        userId: user?.id,
      },
    });

    if (userBudgets.length === 0) {
      router.push("/dashboard/budgets");
    }
  };

  return (
    <div className="h-screen w-screen relative flex">
      <aside
        className={`${
          isSidebarOpen ? "w-[27%] md:w-[190px]" : "w-[12%] md:w-[5%]"
        } transition-all duration-300 h-full border-r border-slate-400/30 overflow-hidden p-2 md:p-4`}
      >
        <div className="flex items-center justify-center bg-gray-100 rounded-2xl p-2 mb-8">
          <Link href="/">
            <Image
              src={isSidebarOpen ? bigLogo : smallLogo}
              alt="logo"
              width={100}
              height={45}
            />
          </Link>
        </div>

        <div className="mt-5">
          {links.map((item) => (
            <Link href={item.href} key={item.label}>
              <h2
                className={`flex flex-row items-center gap-2 text-gray-500 font-medium mb-4 p-2 cursor-pointer hover:bg-gray-100 hover:text-primary  rounded-full ${
                  path == item.href && "text-primary bg-gray-100"
                }`}
              >
                {isSidebarOpen ? (
                  <>
                    <item.icon />
                    <p>{item.label}</p>
                  </>
                ) : (
                  <item.icon />
                )}
              </h2>
            </Link>
          ))}
        </div>
      </aside>

      <div className="flex-1 flex-col h-full">
        <div>
          <header className="p-5 shadow-sm border-b flex justify-between h-[45px] md:h-[65px]">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={toggleSidebar}
            >
              {isSidebarOpen ? <EllipsisVertical /> : <List />}
            </div>

            <div></div>
            <div>
              <UserButton afterSignOutUrl="/" />
            </div>
          </header>
          <div className="flex-1 overflow-auto p-0 md:p-4 h-[calc(100vh-45px)] md:h-[calc(100vh-65px)]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
