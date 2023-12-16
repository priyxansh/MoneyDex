import { authOptions } from "@/lib/next-auth";
import { getServerSession } from "next-auth";
import GitHub from "@/components/OAuthButtons/GitHub";
import Google from "@/components/OAuthButtons/Google";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { redirect } from "next/navigation";

type SignInPageProps = {};

const SignInPage = async ({}: SignInPageProps) => {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="grid place-items-center px-4">
      <Card className="max-w-sm w-full min-w-fit py-6 px-3 shadow-lg">
        <CardHeader className="text-center">
          <CardTitle>Welcome</CardTitle>
          <CardDescription>
            Continue to <span className="text-primary">MoneyDex</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 items-center justify-center px-1 sm:px-6">
          <GitHub className="w-full" />
          <span className="text-gray-500 text-sm">or</span>
          <Google className="w-full" />
        </CardContent>
      </Card>
    </div>
  );
};

export default SignInPage;
