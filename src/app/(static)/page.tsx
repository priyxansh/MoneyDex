import Container from "@/components/Container";
import Hero from "@/components/home/Hero";

const HomePage = async () => {
  return (
    <main className="px-4">
      <Container className="pt-20">
        <Hero />
      </Container>
    </main>
  );
};

export default HomePage;
