"use client";

import { TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { useTransactionFilterContext } from "@/contexts/TransactionFilterContext";
import { FilterTabTrigger } from "@/types/transaction-filter";

type FilterTabContentProps = {
  filterTabTrigger: FilterTabTrigger;
};

const FilterTabContent = ({ filterTabTrigger }: FilterTabContentProps) => {
  const { filter, updateFilter } = useTransactionFilterContext();

  return (
    <TabsContent
      value={filterTabTrigger.value}
      asChild
      className="mt-0 p-1 bg-muted rounded flex flex-col justify-normal h-full py-0"
    >
      <ScrollArea className="h-full overflow-auto">
        {filterTabTrigger.filterList.map((item) => {
          const filterContent =
            filter[filterTabTrigger.value as keyof typeof filter];

          // To fix: Type string is not assignable to type TransactionType enum. Will find a better structure for storing types.
          const isChecked = filterContent.includes(item.id as any);

          return (
            <Label
              key={item.id}
              className={`my-1 flex gap-2 items-center justify-between px-3 py-2 rounded cursor-pointer ${
                isChecked
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {item.name}
              <Checkbox
                id={item.id}
                name={item.id}
                className="border-none"
                checked={isChecked}
                onCheckedChange={(checked) => {
                  if (checked) {
                    updateFilter({
                      type: filterTabTrigger.actionType,
                      payload: [...filterContent, item.id] as any,
                    });
                  } else {
                    updateFilter({
                      type: filterTabTrigger.actionType,
                      payload: filterContent.filter(
                        (id) => id !== item.id
                      ) as any,
                    });
                  }
                }}
              />
            </Label>
          );
        })}
      </ScrollArea>
    </TabsContent>
  );
};

export default FilterTabContent;
