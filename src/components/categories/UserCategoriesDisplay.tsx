import CategoryBox from "./CategoryBox";
import { TransactionCategoryType } from "@prisma/client";
import { getCategories } from "@/actions/category-actions";

type UserCategoriesDisplayProps = {
  type: TransactionCategoryType | "ALL";
  searchQuery: string;
};

const UserCategoriesDisplay = async ({
  type,
  searchQuery,
}: UserCategoriesDisplayProps) => {
  const { data: categories } = await getCategories({
    where: {
      type: type === "ALL" ? undefined : type,
      name: {
        contains: searchQuery,
        mode: "insensitive",
      },
    },
    orderBy: [
      {
        type: "asc",
      },
      {
        name: "asc",
      },
    ],
  });

  return (
    <div className="flex items-center py-2 rounded-md gap-2 flex-wrap">
      <p className="text-sm text-gray-500 w-full">
        <span className="hidden sm:inline">Right-click</span>{" "}
        <span className="sm:hidden">Long-press</span> for more options.
      </p>
      {!categories.length && (
        <p className="text-sm text-gray-500">No results found.</p>
      )}
      {categories.map((category) => (
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
