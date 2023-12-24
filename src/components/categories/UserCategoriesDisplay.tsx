import { authOptions } from "@/lib/next-auth";
import prisma from "@/lib/prisma";
import { Session, getServerSession } from "next-auth";
import Link from "next/link";
import { Button } from "../ui/button";

type UserCategoriesDisplayProps = {
  type: "INCOME" | "EXPENSE" | "ALL";
};

const fetchUserCategories = async (
  userId: string,
  typeFilter:
    | {
        equals?: undefined;
      }
    | {
        equals: "INCOME" | "EXPENSE";
      }
) => {
  const userCategories = await prisma.transactionCategory.findMany({
    where: {
      user: {
        id: userId,
      },
      type: typeFilter,
    },
    orderBy: [
      {
        type: "asc",
      },
      {
        name: "asc",
      },
    ],
    select: {
      id: true,
      name: true,
      type: true,
    },
  });

  return userCategories;
};

const UserCategoriesDisplay = async ({ type }: UserCategoriesDisplayProps) => {
  const { user } = (await getServerSession(authOptions)) as Session;

  const typeFilter =
    type === "ALL"
      ? {}
      : {
          equals: type,
        };

  const userCategories = await fetchUserCategories(user.id, typeFilter);

  return (
    <div className="flex items-center py-2 rounded-md gap-2 flex-wrap">
      {userCategories.map((category) => (
        <Button
          asChild
          variant={category.type === "INCOME" ? "default" : "destructive"}
          key={category.id}
        >
          <Link href={`/categories/${category.id}`}>
            <span>{category.name}</span>
          </Link>
        </Button>
      ))}
    </div>
  );
};

export default UserCategoriesDisplay;
