import NavBar from "@/components/NavBar";

type AuthLayoutProps = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div>
      <NavBar />
      {children}
    </div>
  );
};

export default AuthLayout;
