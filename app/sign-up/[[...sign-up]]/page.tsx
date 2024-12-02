"use client";

import { SignUp } from "@clerk/nextjs";
import manWithLaptop from "@/public/lottie jsons/man-on-laptop.json";
import AuthImage from "@/components/AuthImage";
import smallLogo from "@/public/Logo W.png";
import bigLogo from "@/public/Spend Sensei Logo W.png";

export default function Page() {
  return (
    <div className="w-screen flex justify-between items-center ">
      <div className="w-full md:w-2/5 flex flex-col jusitfy-center items-center overflow-y-hidden">
        <SignUp afterSignUpUrl="/new-user" redirectUrl="/new-user" />
      </div>
      <div className="hidden md:grid w-3/5 h-screen bg-slate-950 shadow-2xl shadow-black">
        <AuthImage
          animationData={manWithLaptop}
          smallLogo={smallLogo}
          bigLogo={bigLogo}
          textColor={"white"}
          heading={"Welcome to "}
          text={
            "Track your expenses to take control of your money. Please sign up to create an account"
          }
        />
      </div>
    </div>
  );
}
