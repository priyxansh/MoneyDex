import { authOptions } from "@/lib/next-auth";
import Container from "./Container";
import NavBar from "./NavBar";
import ThemeToggler from "./ThemeToggler";
import UserAvatarMenu from "./UserAvatarMenu";
import { getServerSession } from "next-auth";

type HeaderProps = {};

const Header = async ({}: HeaderProps) => {

  const session = await getServerSession(authOptions);

  const routes = [
    {
      id: 1,
      name: "Home",
      path: "/",
    },
    {
      id: 2,
      name: "About",
      path: "/about",
    },
    {
      id: 3,
      name: "Feedback",
      path: "/feedback",
    },
  ];

  return (
    <header className="px-4 py-3 border-b-2">
      <Container className="flex">
        <NavBar routes={routes} />
        <div className="flex items-center gap-3 ml-auto">
          <ThemeToggler />
          {session && <UserAvatarMenu />}
        </div>
      </Container>
    </header>
  );
};

export default Header;
