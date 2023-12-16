"use client"

import { useState } from "react";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";

type GoogleProps = {
  className?: string;
};

const Google = ({ className }: GoogleProps) => {
  const [pending, setPending] = useState(false);

  const handleSignIn = async () => {
    setPending(true);

    await signIn("google", {
      callbackUrl: "/dashboard",
    });

    setPending(false);
  };

  return (
    <Button
      variant={"secondary"}
      className={`${className} flex gap-2`}
      onClick={handleSignIn}
      disabled={pending}
    >
      <span className="font-medium text-lg">G</span>
      <span>Sign in with Google</span>
    </Button>
  );
};

export default Google;
