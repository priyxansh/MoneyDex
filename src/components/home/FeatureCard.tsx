import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

type FeatureCardProps = {
  title: string;
  description: string;
  icon?: React.ReactNode;
};

const FeatureCard = ({ title, description, icon }: FeatureCardProps) => {
  return (
    <Card>
      <CardHeader className="text-center">
        <CardDescription className="text-center">{icon}</CardDescription>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <p>{description}</p>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
