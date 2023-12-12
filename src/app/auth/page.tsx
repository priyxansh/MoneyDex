import { redirect } from "next/navigation";

type AuthPageProps = {};

const AuthPage = ({}: AuthPageProps) => {
  redirect("/auth/signin");
};

export default AuthPage;
