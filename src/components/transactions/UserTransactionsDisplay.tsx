import { authOptions } from "@/lib/next-auth";
import prisma from "@/lib/prisma";
import { Session, getServerSession } from "next-auth";
import _ from "lodash";
import Transaction from "./Transaction";

type UserTransactionsDisplayProps = {};

const UserTransactionsDisplay = async ({}: UserTransactionsDisplayProps) => {
  const { user } = (await getServerSession(authOptions)) as Session;

  const userTransactions = await prisma.transaction.findMany({
    where: {
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
  });

  const transactionsByDate = _.groupBy(userTransactions, (transaction) => {
    return new Date(transaction.createdAt).toDateString();
  });

  return (
    <section className="mt-6 flex flex-col gap-4">
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
                  <Transaction transaction={transaction} key={transaction.id} />
                );
              })}
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default UserTransactionsDisplay;
