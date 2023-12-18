type SideBarSeparatorProps = {
  className? : string
};

const SideBarSeparator = ({className}: SideBarSeparatorProps) => {
  return <div className={`w-full bg-accent h-[1px] ${className}`}></div>;
};

export default SideBarSeparator;
