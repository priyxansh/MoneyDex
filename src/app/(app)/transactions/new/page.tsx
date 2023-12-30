import NewTransactionTabs from "@/components/transactions/NewTransactionTabs";

type NewTransactionPageProps = {};

const NewTransactionPage = ({}: NewTransactionPageProps) => {
  return (
    <main className="px-5 py-5 flex flex-col flex-grow">
        <h1 className="text-2xl font-semibold">New Transaction</h1>
        <NewTransactionTabs />
    </main>
  );
};

export default NewTransactionPage;
