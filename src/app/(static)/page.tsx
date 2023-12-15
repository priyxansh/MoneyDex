import Container from "@/components/Container";
import FeaturesSection from "@/components/home/FeaturesSection";
import Hero from "@/components/home/Hero";

const HomePage = async () => {
  return (
    <main className="px-4">
      <Container className="py-20 flex flex-col gap-12">
        <Hero />
        <FeaturesSection />
      </Container>
    </main>
  );
};

export default HomePage;
