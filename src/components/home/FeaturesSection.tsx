import { ActivityLogIcon, BarChartIcon, Pencil2Icon, PlusCircledIcon } from "@radix-ui/react-icons";
import FeatureCard from "./FeatureCard";

type FeaturesSectionProps = {};

const FeaturesSection = ({}: FeaturesSectionProps) => {
  const features = [
    {
      id: 1,
      title: "Transaction Logging",
      description:
        "Effortlessly log your income and expenses with a user-friendly interface. Stay organized with easy-to-use transaction entry.",
      icon: <ActivityLogIcon height={65} width={65} className="mx-auto my-3 p-3 bg-secondary text-primary rounded-full"/>,
    },
    {
      id: 2,
      title: "Intuitive Graphs",
      description:
        "Visualize your spending habits with our intuitive graphs. Understand your spending habits and make better financial decisions.",
        icon: <BarChartIcon height={65} width={65} className="mx-auto my-3 p-3 bg-secondary text-primary rounded-full"/>,
    },
    {
      id: 3,
      title: "Customizable Categories",
      description:
        "Create your own categories to organize your transactions. Create as many categories as you need to stay organized.",
        icon: <PlusCircledIcon height={65} width={65} className="mx-auto my-3 p-3 bg-secondary text-primary rounded-full"/>,
    },
    {
      id: 4,
      title: "Transaction History",
      description:
        "Access a comprehensive transaction history. Review and analyze past spending to make informed financial choices.",
        icon: <Pencil2Icon height={65} width={65} className="mx-auto my-3 p-3 bg-secondary text-primary rounded-full"/>,
    },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {features.map((feature) => (
        <FeatureCard
          key={feature.id}
          title={feature.title}
          description={feature.description}
          icon={feature.icon}
        />
      ))}
    </div>
  );
};

export default FeaturesSection;
