import Container from "./Container";
import NavBar from "./NavBar";

type HeaderProps = {};

const Header = ({}: HeaderProps) => {
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
    <header className="px-4 py-3 sm:flex sm:justify-between border-b">
      <Container>
        <NavBar routes={routes} />
      </Container>
    </header>
  );
};

export default Header;
