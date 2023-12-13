"use client";

import { signOut } from "next-auth/react";

type SignOutButtonProps = {};

const SignOutButton = ({}: SignOutButtonProps) => {
  return (
    <button
      onClick={() =>
        signOut({
          callbackUrl: "/",
        })
      }
      className="w-full text-left"
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;
