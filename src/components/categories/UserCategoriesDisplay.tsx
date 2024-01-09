import { authOptions } from "@/lib/next-auth";
import { Session, getServerSession } from "next-auth";
import { getUserCategories } from "@/lib/utils/getUserCategories";

import CategoryBox from "./CategoryBox";

import { TransactionCategoryType } from "@/types/prisma";

type UserCategoriesDisplayProps = {
  type: TransactionCategoryType | "ALL";
  searchQuery: string;
};

const UserCategoriesDisplay = async ({
  type,
  searchQuery,
}: UserCategoriesDisplayProps) => {
  const { user } = (await getServerSession(authOptions)) as Session;

  const userCategories = await getUserCategories(user.id, type, searchQuery);

  return (
    <div className="flex items-center py-2 rounded-md gap-2 flex-wrap">
      <p className="text-sm text-gray-500 w-full">
        <span className="hidden sm:inline">Right-click</span>{" "}
        <span className="sm:hidden">Long-press</span> for more options.
      </p>
      {!userCategories.length && (
        <p className="text-sm text-gray-500">No results found.</p>
      )}
      {userCategories.map((category) => (
        <CategoryBox
          key={category.id}
          name={category.name}
          type={category.type}
          id={category.id}
        />
      ))}
    </div>
  );
};

export default UserCategoriesDisplay;
