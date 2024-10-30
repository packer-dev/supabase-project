"use client";

import { ReactNode } from "react";
import Header from "./common/Header";
import Navbar from "./common/Navbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type WrapperProps = {
  children?: ReactNode;
};

const Wrapper = ({ children }: WrapperProps) => {
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      <div className="w-full h-screen flex flex-row dark:bg-black">
        <Navbar />
        <div className="flex-1 flex flex-col">
          <Header />
          <div
            className="flex-1 border-l border-solid border-gray-200 bg-gray-50 dark:bg-black dark:border-gray-900 p-2 
        dark:text-white"
          >
            {children}
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default Wrapper;
