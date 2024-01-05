import { authOptions } from "@/lib/next-auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { Button } from "../ui/button";

type HeroButtonsProps = {};

const HeroButtons = async ({}: HeroButtonsProps) => {
  const session = await getServerSession(authOptions);

  if (!session)
    return (
      <Button asChild>
        <Link href={"/auth/signin"}>Get Started</Link>
      </Button>
    );

  return (
    <>
      <Button variant={"secondary"}>Edit Profile</Button>
      <Button asChild>
        <Link href={"/dashboard"}>Dashboard</Link>
      </Button>
    </>
  );
};

export default HeroButtons;
