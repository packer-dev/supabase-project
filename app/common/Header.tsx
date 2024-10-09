"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import React from "react";

const Header = () => {
  //
  const { setTheme, theme } = useTheme();
  //
  return (
    <div className="w-full flex">
      <span
        className="w-80 border px-5 py-2 text-3xl text-black dark:text-white font-bold text border-solid 
     border-gray-200 dark:border-gray-900 border-r-none flex items-center"
      >
        Logo
      </span>
      <div
        className="flex-1 flex justify-between p-2 bg-gray-50 dark:bg-black items-center border-b border-solid border-gray-200 
      dark:border-gray-900"
      >
        <span className="dark:text-white">Project</span>
        <div className="flex-row flex items-center gap-5">
          <Button>Feedback</Button>
          <div
            aria-hidden
            className="text-xl -mb-1 dark:text-white dark:hover:text-gray-300"
            onClick={() => {
              setTheme(theme === "dark" ? "light" : "dark");
            }}
          >
            {theme !== "dark" && <span className="bx bx-moon" />}
            {theme === "dark" && <span className="bx bxs-moon" />}
          </div>
          <span className="bx bx-cog cursor-pointer hover:text-black text-xl dark:text-white dark:hover:text-gray-300" />
          <span className="bx bx-user cursor-pointer hover:text-black text-xl dark:text-white dark:hover:text-gray-300" />
        </div>
      </div>
    </div>
  );
};

export default Header;
