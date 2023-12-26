"use client";

import { Button } from "../ui/button";

type SaveCategoryButtonProps = {
  isSubmitting: boolean;
  isDirty: boolean;
};

const SaveCategoryButton = ({
  isSubmitting,
  isDirty,
}: SaveCategoryButtonProps) => {
  return (
    <Button type="submit" variant="default" disabled={isSubmitting || !isDirty}>
      {isSubmitting ? "Saving..." : "Save"}
    </Button>
  );
};

export default SaveCategoryButton;
