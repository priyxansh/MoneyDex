import Spinner from "@/components/Spinner";
import NewTransactionTabs from "@/components/transactions/NewTransactionTabs";
import { Suspense } from "react";

type NewTransactionPageProps = {};

const NewTransactionPage = ({}: NewTransactionPageProps) => {
  return (
    <main className="px-5 py-5 flex flex-col flex-grow">
      <h1 className="text-2xl font-semibold">New Transaction</h1>
      <Suspense fallback={<Spinner className="h-7 w-7 m-auto" />}>
        <NewTransactionTabs />
      </Suspense>
    </main>
  );
};

export default NewTransactionPage;
