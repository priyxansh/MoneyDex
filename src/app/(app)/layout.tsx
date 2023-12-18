import BottomBar from "@/components/BottomBar";
import SideBar from "@/components/SideBar";

type AppLayoutProps = {
  children: React.ReactNode;
};

const AppLayout = async ({ children }: AppLayoutProps) => {
  return (
    <div className="min-h-screen-svh grid grid-rows-[1fr auto] sm:grid-cols-[250px,1fr]">
      <SideBar />
      {children}
      <BottomBar />
    </div>
  );
};

export default AppLayout;
