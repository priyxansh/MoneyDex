import { getTransactionCount } from "@/actions/transaction-actions";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type TransactionPaginationProps = {
  page?: number;
  perPage?: number;
  filter?: string;
};

const TransactionPagination = async ({
  page = 1,
  perPage = 10,
  filter,
}: TransactionPaginationProps) => {
  const skip = page * perPage;

  const countResult =
    (await getTransactionCount({
      skip,
    })) ?? 0;

  const nextTransactionCount = countResult.count ?? 0;

  const hasNextPage = Math.ceil(nextTransactionCount / perPage) > 0;
  const hasPreviousPage = page > 1;

  return (
    <section className="mt-2">
      <Pagination>
        <PaginationContent className="flex flex-wrap items-center justify-center">
          <PaginationItem>
            <PaginationPrevious
              disabled={!hasPreviousPage}
              href={{
                query: {
                  page: page - 1,
                  perPage,
                  filter: filter,
                },
              }}
            />
          </PaginationItem>
          <div className="flex gap-1">
            {hasPreviousPage ? (
              <PaginationItem>
                <PaginationLink
                  href={{
                    query: {
                      page: page - 1,
                      perPage,
                      filter: filter,
                    },
                  }}
                >
                  {page - 1}
                </PaginationLink>
              </PaginationItem>
            ) : null}
            <PaginationItem>
              <PaginationLink
                isActive
                href={{
                  query: {
                    page,
                    perPage,
                    filter: filter,
                  },
                }}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
            {hasNextPage ? (
              <PaginationItem>
                <PaginationLink
                  href={{
                    query: {
                      page: page + 1,
                      perPage,
                      filter: filter,
                    },
                  }}
                >
                  {page + 1}
                </PaginationLink>
              </PaginationItem>
            ) : null}
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          </div>
          <PaginationItem>
            <PaginationNext
              disabled={!hasNextPage}
              href={{
                query: {
                  page: page + 1,
                  perPage,
                  filter: filter,
                },
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </section>
  );
};

export default TransactionPagination;
