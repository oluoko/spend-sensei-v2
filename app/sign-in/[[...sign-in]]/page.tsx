"use client";

import { SignIn } from "@clerk/nextjs";
import womanOnCoins from "@/public/lottie jsons/woman-on-coins.json";
import AuthImage from "@/components/AuthImage";
import smallLogo from "@/public/Logo B.png";
import bigLogo from "@/public/Spend Sensei Logo B.png";

export default function Page() {
  return (
    <div className="h-screen w-screen flex justify-between items-center">
      <div className="hidden md:grid w-3/5 h-full">
        <AuthImage
          animationData={womanOnCoins}
          smallLogo={smallLogo}
          bigLogo={bigLogo}
          textColor={"black"}
          heading={"Welcome back to "}
          text={
            "Track your expenses to take control of your money. Please sign in to your account"
          }
        />
      </div>
      <div className="w-full md:w-2/5 flex flex-col jusitfy-center items-center">
        <SignIn />
      </div>
    </div>
  );
}
