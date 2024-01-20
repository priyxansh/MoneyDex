import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/next-auth";

type UserAvatarProps = {
  className?: string;
};

const UserAvatar = async ({ className }: UserAvatarProps) => {
  const session = await getServerSession(authOptions);

  return (
    <Avatar className={`h-7 w-7 ${className}`}>
      <AvatarImage src={session?.user.image as string} />
      <AvatarFallback>{session?.user.name?.split("")[0]}</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
