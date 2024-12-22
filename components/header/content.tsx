"use client";
import { formatDateDifference } from "@/lib/utils";
import { useEffect, useState, useMemo } from "react";

export function Content() {
  const pastDate = useMemo(() => new Date("2020-06-01T00:00:00Z"), []);
  const [timeDifference, setTimeDifference] = useState(
    formatDateDifference(pastDate)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeDifference(formatDateDifference(pastDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [pastDate]);
  return (
    <div className="w-full">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
        Reniel Avellano
      </h1>
      <h2 className="mt-3 text-lg font-medium tracking-tight sm:text-xl">
        Full Stack Web Developer
      </h2>
      <p className="mt-4 max-w-xs leading-normal w-full">
        I've been working with web technologies for {timeDifference}
      </p>
    </div>
  );
}
