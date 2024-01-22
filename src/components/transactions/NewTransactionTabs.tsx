import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NewTransactionForm from "./NewTransactionForm";
import { getAccounts } from "@/actions/account-actions";
import { getCategories } from "@/actions/category-actions";

type NewTransactionTabsProps = {};

const NewTransactionTabs = async ({}: NewTransactionTabsProps) => {
  const { data: categories } = await getCategories({
    orderBy: {
      name: "asc",
    },
  });
  const { data: accounts } = await getAccounts({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <Tabs defaultValue="INCOME" className="w-full mt-5 h-auto">
      <TabsList className="w-full flex gap-2 flex-wrap h-auto">
        <TabsTrigger value="INCOME" className="flex-grow py-2">
          Income
        </TabsTrigger>
        <TabsTrigger value="EXPENSE" className="flex-grow py-2">
          Expense
        </TabsTrigger>
        <TabsTrigger value="TRANSFER" className="flex-grow py-2">
          Transfer
        </TabsTrigger>
      </TabsList>
      <TabsContent value="INCOME">
        <NewTransactionForm
          type="INCOME"
          userAccounts={accounts}
          userCategories={categories}
        />
      </TabsContent>
      <TabsContent value="EXPENSE">
        <NewTransactionForm
          type="EXPENSE"
          userAccounts={accounts}
          userCategories={categories}
        />
      </TabsContent>
      <TabsContent value="TRANSFER">
        <NewTransactionForm
          type="TRANSFER"
          userAccounts={accounts}
          userCategories={categories}
        />
      </TabsContent>
    </Tabs>
  );
};

export default NewTransactionTabs;
