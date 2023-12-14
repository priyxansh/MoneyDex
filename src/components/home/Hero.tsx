import { Button } from "../ui/button";

type HeroProps = {};

const Hero = ({}: HeroProps) => {
  return (
    <div>
      <h1 className="text-5xl w-1/2 leading-normal font-medium">
        Manage your funds easily with{" "}
        <span className="text-foreground">MoneyDex</span>
        <Button variant={"default"}>Primary</Button>
        <Button variant={"secondary"}>Secondary</Button>
      </h1>
    </div>
  );
};

export default Hero;
