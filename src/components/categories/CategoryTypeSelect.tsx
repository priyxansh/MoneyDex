"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useRouter, useSearchParams } from "next/navigation";

type CategoryTypeSelectProps = {};

const CategoryTypeSelect = ({}: CategoryTypeSelectProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const searchQuery = searchParams.get("search");

  return (
    <div className="flex gap-2 items-center flex-wrap">
      <span className="text-sm">Category type:</span>
      <Select
        onValueChange={(value) => {
          if (searchQuery) {
            router.push(
              `/categories?search=${searchQuery}${
                value === "ALL" ? "" : `&type=${value.toLowerCase()}`
              }`
            );
            return;
          }

          router.replace(
            `/categories${
              value === "ALL" ? "" : `?type=${value.toLowerCase()}`
            }`
          );
        }}
        defaultValue={searchParams.get("type")?.toUpperCase() ?? "ALL"}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ALL">All</SelectItem>
          <SelectItem value="INCOME">Income</SelectItem>
          <SelectItem value="EXPENSE">Expense</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default CategoryTypeSelect;
