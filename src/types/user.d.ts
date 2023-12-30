type Account = {
  id: string;
  name: string;
  balance: number;
};

type Category = {
  id: string;
  name: string;
  type: "INCOME" | "EXPENSE";
};

type Transaction = {
  id: string;
  amount: number;
  description: string | null;
  type: "INCOME" | "EXPENSE" | "TRANSFER";
  category: Category | null;
  fromAccount: Account;
  toAccount: Account | null;
};
