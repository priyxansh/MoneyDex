import Container from "./Container";

type FooterProps = {};

const Footer = ({}: FooterProps) => {
  return (
    <footer className="px-4 py-3 border-t-2">
      <Container>
        <p className="text-sm">Built by <a href={"https://www.github.com/priyxansh"} target="_blank" className="font-medium underline text-primary">priyxansh</a>. Source code available on <a href={"https://www.github.com/priyxansh/expense-tracker"} target="_blank" className="font-medium underline text-primary">GitHub</a>.</p>
      </Container>
    </footer>
  );
};

export default Footer;
