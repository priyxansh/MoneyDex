import Spinner from "@/components/Spinner";
import UserTransactionsDisplay from "@/components/transactions/UserTransactionsDisplay";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Suspense } from "react";

type TransactionsPageProps = {
  searchParams?: {
    type?: string;
    search?: string;
  };
};

const TransactionsPage = ({ searchParams }: TransactionsPageProps) => {
  
  return (
    <main className="px-2 sm:px-5 py-5 flex flex-col flex-grow">
      <div className="flex justify-between gap-4 flex-wrap px-3 sm:px-0">
        <h1 className="text-2xl font-semibold">Transactions</h1>
        <Button asChild className="w-full sm:w-auto">
          <Link href="/transactions/new">
            <PlusIcon className="w-5 h-5 mr-2" />
            <span>New Transaction</span>
          </Link>
        </Button>
      </div>
        <Suspense fallback={<Spinner className="h-7 w-7 m-auto" />}>
          <UserTransactionsDisplay />
        </Suspense>
     
    </main>
  );
};

export default TransactionsPage;
