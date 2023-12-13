import Header from "@/components/Header";

type StaticLayoutProps = {
  children: React.ReactNode;
};

const StaticLayout = ({ children }: StaticLayoutProps) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default StaticLayout;
