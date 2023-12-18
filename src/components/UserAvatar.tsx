"use client";

import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

type UserAvatarProps = {
  className?: string;
};

const UserAvatar = ({ className }: UserAvatarProps) => {
  const { data: session } = useSession();

  return (
    <Avatar className={`h-7 w-7 ${className}`}>
      <AvatarImage src={session?.user.image as string} />
      <AvatarFallback>{session?.user.name?.split("")[0]}</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
