import GitHub from "@/components/OAuthButtons/GitHub";
import Google from "@/components/OAuthButtons/Google";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type SignInPageProps = {};

const SignInPage = ({}: SignInPageProps) => {
  return (
    <div className="grid place-items-center">
      <Card className="w-3/12 min-w-fit py-6 px-3 shadow-lg">
        <CardHeader className="text-center">
          <CardTitle>Welcome</CardTitle>
          <CardDescription>
            Continue to <span className="text-primary">MoneyDex</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 items-center justify-center">
          <GitHub className="w-full" />
          <span className="text-gray-500 text-sm">or</span>
          <Google className="w-full" />
        </CardContent>
      </Card>
    </div>
  );
};

export default SignInPage;
