import {
  DashboardIcon,
  Pencil2Icon,
  PersonIcon,
} from "@radix-ui/react-icons";

import BottomBarLink from "./BottomBarLink";
import BottomBarMenu from "./BottomBarMenu";

type BottomBarProps = {};

const BottomBar = ({}: BottomBarProps) => {
  const bottomBarRoutes = [
    {
      id: 1,
      name: "Dashboard",
      path: "/dashboard",
      icon: <DashboardIcon />,
    },
    {
      id: 2,
      name: "Transactions",
      path: "/transactions",
      icon: <Pencil2Icon />,
    },
    {
      id: 3,
      name: "Accounts",
      path: "/accounts",
      icon: <PersonIcon />,
    },
  ];

  return (
    <nav className="sm:hidden sticky bottom-0 w-full border-t py-2 px-2 flex gap-1">
      {bottomBarRoutes.map((route) => (
        <BottomBarLink
          key={route.id}
          name={route.name}
          path={route.path}
          icon={route.icon}
        />
      ))}
      <BottomBarMenu />
    </nav>
  );
};

export default BottomBar;
