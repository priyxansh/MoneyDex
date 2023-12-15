import Footer from "@/components/Footer";
import Header from "@/components/Header";

type StaticLayoutProps = {
  children: React.ReactNode;
};

const StaticLayout = ({ children }: StaticLayoutProps) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default StaticLayout;
