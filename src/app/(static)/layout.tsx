import NavBar from "@/components/NavBar";

type StaticLayoutProps = {
  children: React.ReactNode;
};

const StaticLayout = ({ children }: StaticLayoutProps) => {
  return (
    <div>
      <NavBar />
      {children}
    </div>
  );
};

export default StaticLayout;
