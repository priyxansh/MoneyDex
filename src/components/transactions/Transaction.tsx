import Link from "next/link";
import { Button } from "../ui/button";

type TransactionProps = {
  transaction: {
    id: string;
    amount: number;
    type: "INCOME" | "EXPENSE" | "TRANSFER";
    category: {
      id: string;
      name: string;
    } | null;
    fromAccount: {
      id: string;
      name: string;
    };
    toAccount: {
      id: string;
      name: string;
    } | null;
    createdAt: Date;
  };
};

const Transaction = ({
  transaction: { fromAccount, toAccount, category, type, amount, createdAt },
}: TransactionProps) => {
  return (
    <Button
      variant={"ghost"}
      className="grid grid-cols-3 sm:grid-cols-4 gap-2 py-2 sm:py-4 whitespace-normal h-full"
      asChild
    >
      <Link href={`/transactions/${fromAccount.id}`}>
        <div className="flex flex-col sm:grid grid-cols-2 sm:col-span-2">
          <span className="text-sm text-left text-primary">
            {fromAccount.name}
          </span>
          <span className="sm:text-sm text-[12px] text-gray-500 line-clamp-2 break-words">
            {type === "TRANSFER"
              ? `${fromAccount.name} -> ${toAccount?.name}`
              : category
              ? category.name
              : `General`}
          </span>
        </div>
        <span
          className={`text-sm font-semibold text-center sm:text-right ${
            type === "EXPENSE" ? "text-destructive" : "text-primary"
          }`}
        >
          {type === "EXPENSE" ? "-" : ""}${amount}
        </span>
        <span className="text-sm text-right text-gray-500">
          {new Date(createdAt).toTimeString().slice(0, 5)}
        </span>
      </Link>
    </Button>
  );
};

export default Transaction;
