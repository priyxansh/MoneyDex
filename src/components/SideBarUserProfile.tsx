import { authOptions } from "@/lib/next-auth";
import { getServerSession } from "next-auth";
import { Suspense } from "react";
import { Skeleton } from "./ui/skeleton";
import UserAvatar from "./UserAvatar";

type SideBarUserProfileProps = {};

const SideBarUserProfile = async ({}: SideBarUserProfileProps) => {
  const session = await getServerSession(authOptions);

  return (
    <>
      <Suspense
        fallback={<Skeleton className="h-8 w-8 mr-auto rounded-full" />}
      >
        <UserAvatar className="h-8 w-8 mr-auto" />
      </Suspense>
      <div>
        <p className="font-medium text-base">{session?.user.name}</p>
        <p className="text-sm text-gray-500 break-all">{session?.user.email}</p>
      </div>
    </>
  );
};

export default SideBarUserProfile;
