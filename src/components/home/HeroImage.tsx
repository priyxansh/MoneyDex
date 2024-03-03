import Image from "next/image";
import savingsSvg from "../../../public/savings.svg";

type HeroImageProps = {
  height?: number;
  width?: number;
};

const HeroImage = ({ height, width }: HeroImageProps) => {
  return (
    <Image
      src={savingsSvg}
      alt="MoneyDex hero image"
      height={height}
      width={width}
    />
  );
};

export default HeroImage;
