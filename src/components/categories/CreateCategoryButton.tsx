"use client";

import { Button } from "../ui/button";

type CreateCategoryButtonProps = {
  pending: boolean;
};

const CreateCategoryButton = ({ pending }: CreateCategoryButtonProps) => {
  return (
    <Button
      type="submit"
      className="w-full sm:w-auto max-w-[300px]"
      disabled={pending}
    >
      {pending ? "Creating Category..." : "Create Category"}
    </Button>
  );
};

export default CreateCategoryButton;
