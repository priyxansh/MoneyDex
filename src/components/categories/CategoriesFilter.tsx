"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useRouter, useSearchParams } from "next/navigation";
import CategorySearch from "./CategorySearch";

type CategoriesFilterProps = {};

const CategoriesFilter = ({}: CategoriesFilterProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const searchQuery = searchParams.get("search");

  return (
    <div className="flex gap-4 flex-wrap items-center my-2">
      <CategorySearch />
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

            router.push(
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
    </div>
  );
};

export default CategoriesFilter;
