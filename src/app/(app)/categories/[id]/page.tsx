type CategoryPageProps = {
  params: {
    id: string;
  };
};

const CategoryPage = ({ params: { id } }: CategoryPageProps) => {
  return <div>{id}</div>;
};

export default CategoryPage;
