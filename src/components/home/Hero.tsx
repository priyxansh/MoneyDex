import { Suspense } from "react";
import HeroButtons from "./HeroButtons";
import { Skeleton } from "../ui/skeleton";

type HeroProps = {};

const Hero = ({}: HeroProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div className="text-center sm:text-left flex flex-col gap-4 items-center">
        <h1 className="text-2xl sm:text-5xl sm:leading-snug font-medium">
          Manage your funds easily with{" "}
          <span className="text-primary text-3xl sm:text-6xl block">
            MoneyDex
          </span>
        </h1>
        <p className="text-sm sm:text-base">
          Effortlessly log your transactions, visualize spending patterns with
          insightful graphs and own your financial journey.
        </p>
        <div className="flex gap-4 w-full justify-center sm:justify-normal flex-wrap">
          <Suspense fallback={<Skeleton className="w-28 h-10" />}>
            <HeroButtons />
          </Suspense>
        </div>
      </div>
      <div>{/* Todo: add Hero image/illustration */}</div>
    </div>
  );
};

export default Hero;
