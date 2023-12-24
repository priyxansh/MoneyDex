"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useRouter } from "next/navigation";

type CategoriesFilterProps = {
  defaultValue?: "ALL" | "INCOME" | "EXPENSE";
};

const CategoriesFilter = ({ defaultValue }: CategoriesFilterProps) => {
  const router = useRouter();

  return (
    <div className="my-2 flex gap-2 items-center flex-wrap">
      <span className="text-sm">Category type:</span>
      <Select
        onValueChange={(value) => {
          router.push(
            `/categories${
              value === "ALL" ? "" : `?type=${value.toLowerCase()}`
            }`
          );
        }}
        defaultValue={defaultValue}
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

export default CategoriesFilter;
