import BottomBar from "@/components/BottomBar";
import SideBar from "@/components/SideBar";

type AppLayoutProps = {
  children: React.ReactNode;
};

const AppLayout = async ({ children }: AppLayoutProps) => {
  return (
    <div>
      <SideBar />
      {children}
      <BottomBar />
    </div>
  );
};

export default AppLayout;
