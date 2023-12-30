import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { authOptions } from "@/lib/next-auth";
import { getUserAccounts } from "@/lib/utils/getUserAccounts";
import { getUserCategories } from "@/lib/utils/getUserCategories";
import { Session, getServerSession } from "next-auth";
import NewTransactionForm from "./NewTransactionForm";

type NewTransactionTabsProps = {};

const NewTransactionTabs = async ({}: NewTransactionTabsProps) => {
  const { user } = (await getServerSession(authOptions)) as Session;

  const userCategories = await getUserCategories(user.id, "ALL");
  const userAccounts = await getUserAccounts(user.id);

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
          userAccounts={userAccounts}
          userCategories={userCategories}
        />
      </TabsContent>
      <TabsContent value="EXPENSE">
        <NewTransactionForm
          type="EXPENSE"
          userAccounts={userAccounts}
          userCategories={userCategories}
        />
      </TabsContent>
      <TabsContent value="TRANSFER">
        <NewTransactionForm
          type="TRANSFER"
          userAccounts={userAccounts}
          userCategories={userCategories}
        />
      </TabsContent>
    </Tabs>
  );
};

export default NewTransactionTabs;
