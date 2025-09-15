"use client";
import { formatDateDifference } from "@/lib/utils";
// import Image from "next/image";
import { useEffect, useState, useMemo } from "react";

export function Content() {
  const pastDate = useMemo(() => new Date("2020-06-01T00:00:00Z"), []);
  const [timeDifference, setTimeDifference] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setTimeDifference(formatDateDifference(pastDate));

    const interval = setInterval(() => {
      setTimeDifference(formatDateDifference(pastDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [pastDate]);
  return (
    <div className="w-full">
      {/* <div className="w-full pb-4 ">
        <div className="inline-block relative rounded-xl">
          <div className="absolute top-3 left-3 w-[200px] h-[200px] rounded-xl border-2 border-teal-300 z-10" />
          <Image
            src={"/images/profile1.jpg"}
            alt={"Profile Picture"}
            width={200}
            height={200}
            className="rounded-xl bg-transparent z-20 relative object-cover h-[200px] hover:scale-110 transition-transform duration-300"
          />
        </div>
      </div> */}
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
        Reniel Avellano
      </h1>
      <h2 className="mt-3 text-lg font-medium tracking-tight sm:text-xl">
        Full Stack Web & Mobile Developer
      </h2>
      <p className="mt-4 max-w-xs leading-normal w-full">
        I&apos;ve been working with web technologies for{" "}
        {isMounted ? timeDifference : "several years"}
      </p>
    </div>
  );
}
