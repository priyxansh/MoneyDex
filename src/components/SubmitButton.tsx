import { Button } from "./ui/button";

type SubmitButtonProps = {
  isSubmitting: boolean;
  isDirty: boolean;
  text?: string;
  pendingText?: string;
  className?: string;
};

const SubmitButton = ({
  isSubmitting,
  isDirty,
  text = "Submit",
  pendingText = "Submitting...",
  className,
}: SubmitButtonProps) => {
  return (
    <Button
      type="submit"
      disabled={isSubmitting || !isDirty}
      className={className}
    >
      {isSubmitting ? pendingText : text}
    </Button>
  );
};

export default SubmitButton;
