import React, { useEffect } from "react";
import Image from "next/image";
import {
  LayoutGrid,
  PiggyBank,
  ReceiptText,
  ShieldCheck,
  CircleDollarSign,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

const SideNav = () => {
  const menuList = [
    {
      icon: LayoutGrid,
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      icon: CircleDollarSign,
      label: "Incomes",
      href: "/dashboard/incomes",
    },
    {
      icon: PiggyBank,
      label: "Budgets",
      href: "/dashboard/budgets",
    },
    {
      icon: ReceiptText,
      label: "Expenses",
      href: "/dashboard/expenses",
    },
    {
      icon: ShieldCheck,
      label: "Upgrade",
      href: "/dashboard/upgrade",
    },
  ];

  const path = usePathname();

  useEffect(() => {
    console.log(path);
  }, [path]);
  return (
    <div className="h-screen p-5 border shadow-sm">
      <div className="flex items-center justify-center bg-gray-100 rounded-2xl p-2">
        <Image
          src="/Spend Sensei Logo B.png"
          alt="logo"
          width={100}
          height={45}
        />
      </div>

      <div className="mt-5">
        {menuList.map((item) => (
          <Link href={item.href} key={item.label}>
            <h2
              className={`flex flex-row items-center gap-2 text-gray-500 font-medium mb-2 p-4 cursor-pointer hover:bg-gray-100 hover:text-primary  rounded-full ${
                path == item.href && "text-primary bg-gray-100"
              }`}
            >
              <item.icon />
              <p>{item.label}</p>
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideNav;
