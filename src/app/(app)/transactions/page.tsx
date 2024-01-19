import Spinner from "@/components/Spinner";
import TransactionFilters from "@/components/transactions/TransactionFilters";
import UserTransactionsDisplay from "@/components/transactions/UserTransactionsDisplay";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { parseURITransactionFilter } from "@/lib/utils/parseURITransactionFilter";
import { PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Suspense } from "react";

type TransactionsPageProps = {
  searchParams?: {
    filter?: string;
    search?: string;
  };
};

const TransactionsPage = ({ searchParams }: TransactionsPageProps) => {
  const suspenseKey = `filter=${searchParams?.filter}&search=${searchParams?.search}`;

  // Access search params
  const filter = searchParams?.filter;
  const search = searchParams?.search;

  const parsedFilter = parseURITransactionFilter(filter);

  return (
    <div className="flex flex-col flex-grow">
      <div className="flex justify-between gap-4 flex-wrap">
        <h1 className="text-2xl font-semibold">Transactions</h1>
        <Button asChild className="w-full sm:w-auto">
          <Link href="/transactions/new">
            <PlusIcon className="w-5 h-5 mr-2" />
            <span>New Transaction</span>
          </Link>
        </Button>
      </div>
      <section className="mt-4 flex gap-2 flex-wrap">
        <Suspense
          fallback={<Skeleton className="w-[80px] h-[40px] rounded-md" />}
        >
          <TransactionFilters />
        </Suspense>
      </section>
      <Suspense
        key={suspenseKey}
        fallback={<Spinner className="h-7 w-7 m-auto" />}
      >
        <UserTransactionsDisplay filter={parsedFilter} />
      </Suspense>
    </div>
  );
};

export default TransactionsPage;
