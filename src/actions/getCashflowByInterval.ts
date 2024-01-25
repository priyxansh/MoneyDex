"use server";

import { authOptions } from "@/lib/next-auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

// Todo: Add date range filter
/**
 * Get interval wise income and expense stats.
 * @returns Groupped total income, expense and transaction count for each day, month or year.
 */
export const getCashflowByInterval = async (
  {
    interval,
  }: {
    interval?: "day" | "month" | "year";
  } = {
    interval: "day",
  }
) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/auth/signin");
  }

  try {
    const intervalWiseTransactions = (await prisma.$queryRaw`
    SELECT DATE_TRUNC(${interval}, "createdAt") as interval,
           COUNT(*) as transactionCount,
           SUM(CASE WHEN "type" = 'INCOME' THEN "amount" ELSE 0 END) as total_income,
           SUM(CASE WHEN "type" = 'EXPENSE' THEN "amount" ELSE 0 END) as total_expense
    FROM "Transaction"
    WHERE "createdAt" >= NOW() - INTERVAL '1 month' AND "userId" = ${session.user.id}
    GROUP BY interval
    ORDER BY interval
  `) as {
      interval: Date;
      transactionCount: number;
      total_income: number;
      total_expense: number;
    }[];

    return {
      success: true,
      data: intervalWiseTransactions,
    };
  } catch (error: any) {
    console.error(error);
    return {
      success: false,
      message:
        error.name === "CustomError"
          ? error.message
          : "An error occurred while getting the interval wise transactions.",
      data: [],
    };
  }
};
