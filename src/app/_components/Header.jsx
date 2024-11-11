"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useUser, UserButton } from "@clerk/nextjs";
import Link from "next/link";

const Header = () => {
  const { user, isSignedIn } = useUser();
  return (
    <div className="p-5 flex justify-between  items -center border shadow-md h-[50px] md:h-[65px]">
      <div className="flex flex-row items-center">
        <Image
          src="/Spend Sensei Logo B.png"
          alt="logo"
          width={70}
          height={30}
        />
      </div>
      {isSignedIn ? (
        <UserButton />
      ) : (
        <div className="flex gap-3 items-center">
          <Link href="/dashboard">
            <Button variant="outline" className="rounded-full">
              {" "}
              Dashboard
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button className="rounded-full">Get Started</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
