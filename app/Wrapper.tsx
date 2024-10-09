import { ReactNode } from "react";
import Header from "./common/Header";
import Navbar from "./common/Navbar";

type WrapperProps = {
  children?: ReactNode;
};

const Wrapper = ({ children }: WrapperProps) => {
  return (
    <div className="w-full h-screen flex flex-col dark:bg-black">
      <Header />
      <div className="flex-1 flex flex-row">
        <Navbar />
        <div
          className="flex-1 border-l border-solid border-gray-200 bg-gray-50 dark:bg-black dark:border-gray-900 p-2 
        dark:text-white"
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Wrapper;
