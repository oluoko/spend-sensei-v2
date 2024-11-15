"use client";

import React from "react";
import Image from "next/image";
import { useUser, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import ShinyButton from "@/components/ShinyButton/ShinyButton";

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
      <div className="flex gap-3 items-center">
        {isSignedIn ? (
          <>
            <Link href="/dashboard">
              <ShinyButton text="Dashboard" />
            </Link>
            <UserButton />
          </>
        ) : (
          <Link href="/sign-in">
            <ShinyButton text="Get Started" />
          </Link>
        )}{" "}
      </div>
    </div>
  );
};

export default Header;
