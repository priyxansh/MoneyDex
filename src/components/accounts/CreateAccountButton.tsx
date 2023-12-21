"use client";

import { Button } from "../ui/button";

type CreateAccountButtonProps = {
  pending: boolean;
};

const CreateAccountButton = ({ pending }: CreateAccountButtonProps) => {
  return (
    <Button
      type="submit"
      className="w-full sm:w-auto max-w-[300px]"
      disabled={pending}
    >
      {pending ? "Creating Account..." : "Create Account"}
    </Button>
  );
};

export default CreateAccountButton;
