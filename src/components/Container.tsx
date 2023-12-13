type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

const Container = ({ children, className }: ContainerProps) => {
  return (
    <div className={`${className} w-full mx-auto max-w-7xl`}>{children}</div>
  );
};

export default Container;
