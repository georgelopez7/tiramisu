import React from "react";
import Navbar from "./navbar/navbar";
import Spacer from "../spacer/spacer";

interface IPageLayoutProps {
  children: React.ReactElement;
}

const PageLayout = ({ children }: IPageLayoutProps) => {
  return (
    <div className="flex flex-col justify-center items-center p-8 lg:w-[40vw] mx-auto">
      <Navbar />
      <Spacer size="medium" />
      {children}
    </div>
  );
};

export default PageLayout;
