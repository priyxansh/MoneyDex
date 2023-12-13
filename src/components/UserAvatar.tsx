import { getServerSession } from "next-auth";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { authOptions } from "@/lib/next-auth";

type UserAvatarProps = {};

const UserAvatar = async ({}: UserAvatarProps) => {
  const session = await getServerSession(authOptions);

  return (
    <Avatar className="h-8 w-8">
      <AvatarImage src={session?.user.image as string} />
      <AvatarFallback>{session?.user.name?.split("")[0]}</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
