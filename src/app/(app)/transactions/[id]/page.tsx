type TransactionPageProps = {
  params: {
    id: string;
  };
};

const TransactionPage = ({ params: { id } }: TransactionPageProps) => {
  return <div>{id}</div>;
};

export default TransactionPage;
