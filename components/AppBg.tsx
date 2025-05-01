import React from "react";
import Image from "next/image";
import headerLine from "@/public/header-lines.svg";
import topLeftBlur from "@/public/top-left-blur.svg";
import topRightBlur from "@/public/top-right-blur.svg";
import middleLeft from "@/public/middle-left.png";
import middleRight from "@/public/middle-right.png";

export default function AppBg() {
  return (
    <React.Fragment>
      <Image src={headerLine} alt="header-line" className="absolute hidden md:block md:top-[-350px] lg:top-[-300px] xl:top-[-250px] left-0 w-full h-full object-contain select-none" />
      <Image src={topLeftBlur} alt="top-left-blur" className="absolute top-[-200px] left-[-300px] w-full h-full object-contain select-none" />
      <Image src={topRightBlur} alt="top-right-blur" className="absolute top-[-200px] right-[-300px] w-full h-full object-contain select-none" />
      <Image src={middleLeft} alt="middle-left" className="absolute top-0 left-[-550px] w-full h-full object-contain rounded-full select-none" />
      <Image src={middleRight} alt="middle-right" className="absolute top-0 right-[-550px] w-full h-full object-contain rounded-full select-none" />
    </React.Fragment>
  );
}