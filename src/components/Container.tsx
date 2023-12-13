type ContainerProps = {
  children: React.ReactNode;
};

const Container = ({ children }: ContainerProps) => {
  return <div className="w-full mx-auto max-w-7xl">{children}</div>;
};

export default Container;
