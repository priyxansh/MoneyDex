import { validateTransactionPaginationParams } from "@/actions/transaction-actions";
import Spinner from "@/components/Spinner";
import PerPageSelect from "@/components/transactions/PerPageSelect";
import TransactionFilters from "@/components/transactions/TransactionFilters";
import TransactionPagination from "@/components/transactions/TransactionPagination";
import UserTransactionsDisplay from "@/components/transactions/UserTransactionsDisplay";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { parsePaginationParams } from "@/lib/utils/parsePaginationParams";
import { parseURITransactionFilter } from "@/lib/utils/parseURITransactionFilter";
import { PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Suspense } from "react";

type TransactionsPageProps = {
  searchParams?: {
    filter?: string;
    page?: string;
    perPage?: string;
  };
};

const TransactionsPage = async ({ searchParams }: TransactionsPageProps) => {
  const filterSuspenseKey = `filter=${searchParams?.filter}`;

  // Access search params
  const page = searchParams?.page;
  const perPage = searchParams?.perPage;
  const filter = searchParams?.filter;

  // Parse params to usable values
  const parsedFilter = parseURITransactionFilter(filter);
  const { parsedPage, parsedPerPage } = parsePaginationParams({
    page,
    perPage,
  });

  // Redirect if page params are invalid
  // Todo: do this for filter
  await validateTransactionPaginationParams({
    page: parsedPage,
    perPage: parsedPerPage,
    filter: parsedFilter,
  });

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
        <PerPageSelect
          page={parsedPage}
          perPage={parsedPerPage}
          paramsFilter={filter}
        />
      </section>
      <Suspense
        fallback={<Skeleton className="w-56 h-10 mt-2 mx-auto rounded-md" />}
      >
        <TransactionPagination
          page={parsedPage}
          perPage={parsedPerPage}
          filter={parsedFilter}
          paramsFilter={filter}
        />
      </Suspense>
      <Suspense
        key={filterSuspenseKey}
        fallback={<Spinner className="h-7 w-7 m-auto" />}
      >
        <UserTransactionsDisplay
          page={parsedPage}
          perPage={parsedPerPage}
          filter={parsedFilter}
        />
      </Suspense>
    </div>
  );
};

export default TransactionsPage;
