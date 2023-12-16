import Header from "@/components/Header";

type AuthLayoutProps = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen-svh grid grid-rows-[auto,1fr]">
      <Header />
      {children}
    </div>
  );
};

export default AuthLayout;
