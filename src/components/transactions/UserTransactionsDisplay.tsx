import _ from "lodash";
import Transaction from "./Transaction";
import { TransactionFilter } from "@/types/transaction-filter";
import { generateTransactionWhereInput } from "@/lib/utils/generateTransactionWhereInput";
import { getTransactions } from "@/actions/transaction-actions";
import { Transaction as TransactionType } from "@/types/prisma";

type UserTransactionsDisplayProps = {
  filter?: TransactionFilter;
  page?: number;
  perPage?: number;
};

const UserTransactionsDisplay = async ({
  filter,
  page = 1,
  perPage = 10,
}: UserTransactionsDisplayProps) => {
  const whereInput = generateTransactionWhereInput(filter);
  const skip = (page - 1) * perPage;
  const take = perPage;

  const { data } = await getTransactions({
    where: whereInput,
    include: {
      fromAccount: true,
      toAccount: true,
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    skip: skip,
    take: take,
  });

  const transactions = data as TransactionType<{
    include: {
      fromAccount: true;
      toAccount: true;
      category: true;
    };
  }>[];

  const transactionsByDate = _.groupBy(transactions, (transaction) => {
    return new Date(transaction.createdAt).toDateString();
  });

  return (
    <section className="mt-2 flex flex-col gap-2">
      <p className="text-sm text-gray-500 w-full">
        <span className="hidden sm:inline">Right-click</span>{" "}
        <span className="sm:hidden">Long-press</span> for more options.
      </p>
      {!transactions.length && (
        <p className="text-sm text-gray-500">No results found.</p>
      )}
      <div className="flex flex-col gap-4">
        {Object.keys(transactionsByDate).map((date) => {
          return (
            <div className="flex flex-col gap-3" key={date}>
              <h2 className="w-full flex items-center gap-4">
                <span className="flex-grow h-[1px] bg-secondary"></span>
                <span className="font-semibold">{date}</span>
                <span className="flex-grow h-[1px] bg-secondary"></span>
              </h2>
              <div className="w-full flex flex-col gap-2 justify-center">
                {transactionsByDate[date].map((transaction) => {
                  return (
                    <Transaction
                      transaction={transaction}
                      key={transaction.id}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default UserTransactionsDisplay;
