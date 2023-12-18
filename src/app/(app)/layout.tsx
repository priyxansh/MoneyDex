import BottomBar from "@/components/BottomBar";
import SideBar from "@/components/SideBar";

type AppLayoutProps = {
  children: React.ReactNode;
};

const AppLayout = async ({ children }: AppLayoutProps) => {
  return (
    <div className="min-h-screen-svh sm:grid grid-cols-[250px,1fr] flex flex-col justify-between">
      <SideBar />
      {children}
      <BottomBar />
    </div>
  );
};

export default AppLayout;
