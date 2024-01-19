import Spinner from "@/components/Spinner";
import UserAccountsDisplay from "@/components/accounts/UserAccountsDisplay";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Suspense } from "react";

type AccountsPageProps = {};

const AccountsPage = ({}: AccountsPageProps) => {
  return (
    <div className="flex flex-col flex-grow">
      <div className="flex justify-between gap-4 flex-wrap">
        <h1 className="text-2xl font-semibold">Accounts</h1>
        <Button variant="default" asChild className="w-full sm:w-auto">
          <Link href={"/accounts/new"}>
            <span>
              <PlusIcon className="w-5 h-5 mr-2" />
            </span>
            <span>Add Account</span>
          </Link>
        </Button>
      </div>
      <Suspense fallback={<Spinner className="h-7 w-7 m-auto" />}>
        <UserAccountsDisplay />
      </Suspense>
    </div>
  );
};

export default AccountsPage;
