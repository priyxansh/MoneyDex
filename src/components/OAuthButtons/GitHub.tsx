"use client";

import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import { useState } from "react";

type GitHubProps = {
  className?: string;
};

const GitHub = ({ className }: GitHubProps) => {
  const [pending, setPending] = useState(false);

  const handleSignIn = async () => {
    setPending(true);

    await signIn("github", {
      callbackUrl: "/dashboard",
    });

    setPending(false);
  };

  return (
    <Button
      variant={"default"}
      className={`${className} flex gap-2`}
      onClick={handleSignIn}
      disabled={pending}
    >
      <GitHubLogoIcon />
      <span>Sign in with GitHub</span>
    </Button>
  );
};

export default GitHub;
