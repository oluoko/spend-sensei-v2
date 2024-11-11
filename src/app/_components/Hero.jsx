import React from "react";
import Image from "next/image";
import {
  ContainerScroll,
  ContainerScrollAnimation,
} from "@/components/ui/container-scroll-animation";

const Hero = () => {
  return (
    <section className="bg-gray-50 flex items-center flex-col">
      <div className="flex flex-col overflow-hidden">
        <ContainerScroll
          titleComponent={
            <>
              <h1 className="text-4xl font-semibold text-black dark:text-white">
                Manage your Money with an AI-powered financial advisor <br />
                <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                  Spend Sensei
                </span>
              </h1>
            </>
          }
        >
          <Image
            src={`/public/Spend Sensei Logo B.png`}
            alt="hero"
            height={720}
            width={1400}
            className="mx-auto rounded-2xl object-cover h-full object-left-top"
            draggable={false}
          />
        </ContainerScroll>
      </div>
    </section>
  );
};

export default Hero;
