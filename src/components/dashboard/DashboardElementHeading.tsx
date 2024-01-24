type DashboardElementHeadingProps = {
  title: string;
};

const DashboardElementHeading = ({ title }: DashboardElementHeadingProps) => {
  return (
    <h3 className="text-base font-semibold text-muted-foreground">{title}</h3>
  );
};

export default DashboardElementHeading;
