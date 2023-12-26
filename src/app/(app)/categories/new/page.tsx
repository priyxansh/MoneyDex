import NewCategoryForm from "@/components/categories/NewCategoryForm";

type NewCategoryPageProps = {};

const NewCategoryPage = ({}: NewCategoryPageProps) => {
  return (
    <main className="px-5 py-5">
      <h1 className="text-2xl font-semibold">New Category</h1>
      <NewCategoryForm />
    </main>
  );
};

export default NewCategoryPage;
