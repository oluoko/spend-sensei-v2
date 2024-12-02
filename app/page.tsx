"use client";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import ShinyButton from "@/components/ShinyButton";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  const { userId } = useAuth();
  const href = userId ? "/dashboard" : "/new-user";

  return (
    <div className="h-full w-full">
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
          <Link href={href}>
            <ShinyButton text={"Get Started"} />
          </Link>
          {userId && <UserButton />}
        </div>
      </div>
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
              src="/Dashboard Image.png"
              alt="hero"
              height={720}
              width={1400}
              className="mx-auto rounded-2xl object-cover h-full object-left-top"
              draggable={false}
            />
          </ContainerScroll>
        </div>
      </section>
    </div>
  );
}
