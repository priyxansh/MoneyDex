import { getCashflowByInterval } from "@/actions/getCashflowByInterval";
import DashboardElementHeading from "./DashboardElementHeading";
import TransactionLineChart from "./TransactionLineChart";
import _ from "lodash";

type MonthlyOverviewProps = {};

const MonthlyOverview = async ({}: MonthlyOverviewProps) => {
  const { data: dayWiseTransactions } = await getCashflowByInterval();

  // Todo: format income and expense values with correct currencies
  const chartData = _.map(dayWiseTransactions, (transaction) => {
    return {
      day: transaction.interval.getDate(),
      totalIncome: transaction.total_income,
      totalExpense: transaction.total_expense,
    };
  });

  return (
    <section className="flex flex-col gap-2">
      <DashboardElementHeading title="Monthly Overview" />
      <div className="w-full h-64 sm:h-[75vh] max-h-[600px] min-h-[300px]">
        {chartData.length === 0 ? (
          <div className="flex flex-col justify-center items-center h-full">
            <p className="text-lg font-semibold text-muted-foreground">
              No data to show.
            </p>
            <p className="text-center">
              <span className="text-sm text-muted-foreground">
                Record transactions to see overview.
              </span>
            </p>
          </div>
        ) : (
          <TransactionLineChart chartData={chartData} />
        )}
      </div>
    </section>
  );
};

export default MonthlyOverview;
