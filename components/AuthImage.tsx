"use  client";

import Lottie, { LottieRefCurrentProps } from "lottie-react";
import { useRef } from "react";

import Image from "next/image";

const AuthImage = ({
  animationData,
  smallLogo,
  bigLogo,
  textColor,
  heading,
  text,
}) => {
  const imageRef = useRef<LottieRefCurrentProps | null>(null);
  return (
    <div className="w-full h-full relative flex flex-col items-center justify-center overflow-y-hidden">
      <div className="absolute top-0 left-5">
        <Image src={bigLogo} alt="logo" className="size-[120px]" />
      </div>
      <div className="text-center my-8 w-3/5">
        <h1 className="text-2xl text-slate-600">
          {heading}
          <span className={`text-3xl text-${textColor} font-bold`}>
            Spend Sensei
          </span>
        </h1>
        <p className="text-slate-600 text-[16px] mt-4">{text}</p>
      </div>
      <Lottie
        onComplete={() => {
          imageRef.current?.play();
        }}
        lottieRef={imageRef}
        animationData={animationData}
        className="w-3/5"
      />
      <div className="absolute bottom-5 right-2">
        <Image src={smallLogo} alt="logo" className="size-10 md:size-14" />
      </div>
    </div>
  );
};

export default AuthImage;
