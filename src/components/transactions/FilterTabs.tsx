"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTransactionFilterContext } from "@/contexts/TransactionFilterContext";
import FilterTabContent from "./FilterTabContent";

type FilterTabsProps = {};

const FilterTabs = ({}: FilterTabsProps) => {
  const { filterTabTriggers } = useTransactionFilterContext();

  return (
    <Tabs
      orientation="vertical"
      className="w-full grid grid-cols-[5fr,6fr] h-full gap-1"
    >
      <TabsList className="flex flex-col justify-normal h-full py-0" asChild>
        <ScrollArea className="h-full overflow-auto">
          {filterTabTriggers.map((trigger) => (
            <TabsTrigger
              key={trigger.id}
              value={trigger.value}
              className="my-1 flex items-center w-full whitespace-normal gap-1 justify-between text-sm font-medium"
            >
              <span className="break-words text-left">{trigger.label}</span>
              <span className="text-[12px] text-end">
                {trigger.filterList.length}
              </span>
            </TabsTrigger>
          ))}
        </ScrollArea>
      </TabsList>

      {filterTabTriggers.map((trigger) => (
        <FilterTabContent key={trigger.id} filterTabTrigger={trigger} />
      ))}
    </Tabs>
  );
};

export default FilterTabs;
