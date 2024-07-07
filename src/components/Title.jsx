import clsx from "clsx";
import React from "react";

const Title = ({ title, className }) => {
  return (
    <h2 className={clsx("text-sm md:text-xl text-[#20409A] font-semibold uppercase", className)}>
      {title}
    </h2>
  );
};

export default Title;