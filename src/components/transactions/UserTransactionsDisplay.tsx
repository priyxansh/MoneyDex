import { authOptions } from "@/lib/next-auth";
import prisma from "@/lib/prisma";
import { Session, getServerSession } from "next-auth";
import _ from "lodash";
import Transaction from "./Transaction";
import { TransactionFilter } from "@/types/transaction-filter";
import { generateTransactionWhereInput } from "@/lib/utils/generateTransactionWhereInput";

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
  const { user } = (await getServerSession(authOptions)) as Session;

  const whereInput = generateTransactionWhereInput(filter);

  const skip = (page - 1) * perPage;
  const take = perPage;

  // Todo: put this in a separate function
  const userTransactions = await prisma.transaction.findMany({
    where: {
      ...whereInput,
      user: {
        id: user.id,
      },
    },
    include: {
      fromAccount: true,
      toAccount: true,
      category: true,
    },
    orderBy: [
      {
        createdAt: "desc",
      },
    ],
    skip: skip,
    take: take,
  });

  const transactionsByDate = _.groupBy(userTransactions, (transaction) => {
    return new Date(transaction.createdAt).toDateString();
  });

  return (
    <section className="mt-2 flex flex-col gap-2">
      <p className="text-sm text-gray-500 w-full">
        <span className="hidden sm:inline">Right-click</span>{" "}
        <span className="sm:hidden">Long-press</span> for more options.
      </p>
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
