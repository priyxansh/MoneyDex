import { PlusIcon } from "@radix-ui/react-icons";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type LoadingProps = {};

const Loading = ({}: LoadingProps) => {
  return (
    <div className="flex flex-col flex-grow">
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
      <div className="flex-grow grid place-items-center">
        <Spinner className="h-7 w-7 m-auto" />
      </div>
    </div>
  );
};

export default Loading;
