import React from "react";
import { UserButton } from "@clerk/nextjs";

const DashboardHeader = () => {
  return (
    <div className="p-5 shadow-sm border-b flex justify-between h-[45px] md:h-[65px]">
      <div></div>
      <div>
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default DashboardHeader;
