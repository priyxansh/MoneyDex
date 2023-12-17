import Container from "./Container";
import NavBar from "./NavBar";
import ThemeToggler from "./ThemeToggler";
import UserAvatarMenu from "./UserAvatarMenu";

type HeaderProps = {};

const Header = async ({}: HeaderProps) => {

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
    <header className="px-4 py-3 border-b-2 sticky top-0 bg-background shadow-sm">
      <Container className="flex">
        <NavBar routes={routes} />
        <div className="flex items-center gap-3 ml-auto">
          <ThemeToggler />
          <UserAvatarMenu />
        </div>
      </Container>
    </header>
  );
};

export default Header;
