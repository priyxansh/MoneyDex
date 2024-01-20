import { Suspense } from "react";
import { Skeleton } from "./ui/skeleton";
import UserAvatar from "./UserAvatar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/next-auth";

type BottomBarUserProfileProps = {};

const BottomBarUserProfile = async ({}: BottomBarUserProfileProps) => {
  const session = await getServerSession(authOptions);
  return (
    <>
      <Suspense fallback={<Skeleton className="h-8 w-8 rounded-full" />}>
        <UserAvatar className="h-8 w-8" />
      </Suspense>
      <div className="flex flex-col">
        <span className="font-medium">{session?.user.name}</span>
        <span className="text-gray-500 text-sm break-all">
          {session?.user.email}
        </span>
      </div>
    </>
  );
};

export default BottomBarUserProfile;
