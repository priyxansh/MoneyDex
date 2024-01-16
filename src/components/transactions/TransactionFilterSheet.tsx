"use client";

import { useTransactionFilterContext } from "@/contexts/TransactionFilterContext";
import { Button } from "../ui/button";
import FilterTabs from "./FilterTabs";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

type TransactionFilterSheetProps = {};

const TransactionFilterSheet = ({}: TransactionFilterSheetProps) => {
  const { filter } = useTransactionFilterContext();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"outline"}>Filters</Button>
      </SheetTrigger>
      <SheetContent
        side={"left"}
        className="w-full flex flex-col p-0 pt-6 pb-3"
      >
        <SheetHeader className="px-6">
          <SheetTitle>Filter Transactions</SheetTitle>
          <SheetDescription>
            Filter your transactions by account, category, and type.
          </SheetDescription>
        </SheetHeader>
        <div className="flex-grow overflow-hidden">
          <FilterTabs />
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          <Button variant="outline" className="flex-grow">
            Cancel
          </Button>
          <Button
            variant="default"
            className="flex-grow"
            onClick={() => console.log(filter)}
          >
            Apply
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default TransactionFilterSheet;
