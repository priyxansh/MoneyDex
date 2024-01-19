import NewCategoryForm from "@/components/categories/NewCategoryForm";

type NewCategoryPageProps = {};

const NewCategoryPage = ({}: NewCategoryPageProps) => {
  return (
    <div>
      <h1 className="text-2xl font-semibold">New Category</h1>
      <NewCategoryForm />
    </div>
  );
};

export default NewCategoryPage;
