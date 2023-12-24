import { authOptions } from "@/lib/next-auth";
import { Session, getServerSession } from "next-auth";
import Link from "next/link";
import { Button } from "../ui/button";
import { getUserCategories } from "@/lib/utils/getUserCategories";

type UserCategoriesDisplayProps = {
  type: "INCOME" | "EXPENSE" | "ALL";
};

const UserCategoriesDisplay = async ({ type }: UserCategoriesDisplayProps) => {
  const { user } = (await getServerSession(authOptions)) as Session;

  const typeFilter =
    type === "ALL"
      ? {}
      : {
          equals: type,
        };

  const userCategories = await getUserCategories(user.id, typeFilter);

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
