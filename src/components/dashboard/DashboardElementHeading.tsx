type DashboardElementHeadingProps = {
  title: string;
};

const DashboardElementHeading = ({ title }: DashboardElementHeadingProps) => {
  return (
    <h3 className="text-sm sm:text-base font-semibold text-muted-foreground text-center sm:text-left">{title}</h3>
  );
};

export default DashboardElementHeading;
