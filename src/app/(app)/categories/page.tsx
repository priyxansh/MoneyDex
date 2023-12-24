import Spinner from "@/components/Spinner";
import CategoriesFilter from "@/components/categories/CategoriesFilter";
import UserCategoriesDisplay from "@/components/categories/UserCategoriesDisplay";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";

type CategoriesPageProps = {
  searchParams?: {
    type?: string;
  };
};

const CategoriesPage = ({ searchParams }: CategoriesPageProps) => {
  const type = searchParams?.type?.toUpperCase() ?? "ALL";
  const keyString = `search=${searchParams?.type}`;

  if (type !== "ALL" && type !== "INCOME" && type !== "EXPENSE") {
    return redirect("/categories");
  }

  return (
    <main className="px-5 py-5 flex flex-col flex-grow">
      <div className="flex justify-between gap-4 flex-wrap">
        <h1 className="text-2xl font-semibold">Categories</h1>
        <Button variant="default" asChild className="w-full sm:w-auto">
          <Link href={"/categories/new"}>
            <span>
              <PlusIcon className="w-5 h-5 mr-2" />
            </span>
            <span>Create Category</span>
          </Link>
        </Button>
      </div>
      <section className="mt-4">
        <CategoriesFilter defaultValue={type} />
        <Suspense
          key={keyString}
          fallback={<Spinner className="h-7 w-7 m-auto" />}
        >
          <UserCategoriesDisplay type={type} />
        </Suspense>
      </section>
    </main>
  );
};

export default CategoriesPage;
