import CategorySearch from "./CategorySearch";
import CategoryTypeSelect from "./CategoryTypeSelect";

type CategoriesFilterProps = {};

const CategoriesFilter = ({}: CategoriesFilterProps) => {
  return (
    <div className="flex gap-4 flex-wrap items-center my-2">
      <CategorySearch />
      <CategoryTypeSelect />
    </div>
  );
};

export default CategoriesFilter;
