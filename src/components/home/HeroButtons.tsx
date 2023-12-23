import { authOptions } from "@/lib/next-auth";
import { Session, getServerSession } from "next-auth";
import Link from "next/link";
import { Button } from "../ui/button";

type HeroButtonsProps = {};

const HeroButtons = async ({}: HeroButtonsProps) => {
  const session = (await getServerSession(authOptions)) as Session;

  return (
    <>
      {!session && (
        <Button asChild>
          <Link href={"/auth/signin"}>Get Started</Link>
        </Button>
      )}
      {session && <Button variant={"secondary"}>Edit Profile</Button>}
      {session && (
        <Button asChild>
          <Link href={"/dashboard"}>Dashboard</Link>
        </Button>
      )}
    </>
  );
};

export default HeroButtons;
