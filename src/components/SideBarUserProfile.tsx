"use client";

import { useSession } from "next-auth/react";

type SideBarUserProfileProps = {};

const SideBarUserProfile = ({}: SideBarUserProfileProps) => {
  const { data: session } = useSession();

  return (
    <div>
      <p className="font-medium text-base">{session?.user.name}</p>
      <p className="text-sm text-gray-500 break-all">{session?.user.email}</p>
    </div>
  );
};

export default SideBarUserProfile;
