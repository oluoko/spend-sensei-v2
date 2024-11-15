"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useUser, UserButton } from "@clerk/nextjs";
import Link from "next/link";

const Header = () => {
  const { user, isSignedIn } = useUser();
  console.log("isSignedIn", isSignedIn);
  return (
    <div className="p-5 flex justify-between  items -center border shadow-md h-[45px] md:h-[65px]">
      <div className="flex flex-row items-center">
        <Image
          src="/Spend Sensei Logo B.png"
          alt="logo"
          width={70}
          height={30}
        />
      </div>
      {isSignedIn ? (
        <div className="flex gap-3 items-center">
          <Link href="/dashboard">
            <Button variant="outline" className="rounded-full">
              Dashboard
            </Button>
          </Link>
          <UserButton />
        </div>
      ) : (
        <Link href="/sign-in">
          <Button className="rounded-full">Get Started</Button>
        </Link>
      )}
    </div>
  );
};

export default Header;
