"use client";

import { useTransactionFilterContext } from "@/contexts/TransactionFilterContext";
import { Button } from "../ui/button";
import FilterTabs from "./FilterTabs";
import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

type TransactionFilterSheetProps = {};

const TransactionFilterSheet = ({}: TransactionFilterSheetProps) => {
  const { filter, updateFilter } = useTransactionFilterContext();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const closeSheet = () => {
    setIsOpen(false);
  };

  const cancelFilter = () => {
    updateFilter({
      type: "CANCEL",
    });
  };

  const applyFilter = () => {
    if (
      [
        filter.sourceAccounts,
        filter.targetAccounts,
        filter.categories,
        filter.types,
      ].every((arr) => arr.length === 0)
    ) {
      router.replace(`/transactions`);
      return;
    }

    const encodedFilter = encodeURIComponent(JSON.stringify(filter));
    router.replace(`/transactions?filter=${encodedFilter}`);
    closeSheet();
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
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
          <SheetClose asChild>
            <Button
              variant="outline"
              className="flex-grow"
              onClick={cancelFilter}
            >
              Cancel
            </Button>
          </SheetClose>
          <Button variant="default" className="flex-grow" onClick={applyFilter}>
            Apply
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default TransactionFilterSheet;
