"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "../ui/input";
import { useState } from "react";

type CategorySearchProps = {};

const CategorySearch = ({}: CategorySearchProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryType = searchParams.get("type");

  let baseUrl = "/categories";
  if (categoryType) {
    baseUrl += `?type=${categoryType}`;
  }

  const [timeoutId, setTimeoutId] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = e.target.value;

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const newTimeoutId = setTimeout(() => {
      router.push(
        `/categories?search=${searchQuery}${
          categoryType ? `&type=${categoryType}` : ""
        }`
      );
    }, 500);

    setTimeoutId(newTimeoutId);
  };

  return (
    <div className="w-full sm:w-auto">
      <Input
        placeholder="Search categories"
        className="w-full sm:w-auto"
        onChange={onChange}
        defaultValue={searchParams.get("search") ?? ""}
      />
    </div>
  );
};

export default CategorySearch;
