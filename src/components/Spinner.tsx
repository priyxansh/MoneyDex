import { Loader2Icon } from "lucide-react";

type SpinnerProps = {
  className?: string;
};

const Spinner = ({ className }: SpinnerProps) => {
  return <Loader2Icon className={`text-primary animate-spin ${className}`} />;
};

export default Spinner;
