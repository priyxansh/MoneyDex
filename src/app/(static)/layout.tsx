import Container from "@/components/Container";
import Header from "@/components/Header";

type StaticLayoutProps = {
  children: React.ReactNode;
};

const StaticLayout = ({ children }: StaticLayoutProps) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default StaticLayout;
