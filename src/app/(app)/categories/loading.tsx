"use client";

import Spinner from "@/components/Spinner";

type LoadingProps = {};

const Loading = ({}: LoadingProps) => {
  return (
    // <div>Loading categories page...</div>
    <div className="w-full grid place-items-center">
      <Spinner className="h-7 w-7 m-auto" />
    </div>
  );
};

export default Loading;
