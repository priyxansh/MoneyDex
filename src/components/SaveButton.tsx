"use client";

import { Button } from "./ui/button";

type SaveButtonProps = {
  isSubmitting: boolean;
  isDirty: boolean;
};

const SaveButton = ({ isSubmitting, isDirty }: SaveButtonProps) => {
  return (
    <Button type="submit" variant="default" disabled={isSubmitting || !isDirty}>
      {isSubmitting ? "Saving..." : "Save"}
    </Button>
  );
};

export default SaveButton;
