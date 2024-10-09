"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Navbar = () => {
  const pathname = usePathname();
  return (
    <div className="w-80">
      <div className="flex flex-col gap-3 p-5">
        <p className="text-gray-600 font-semibold mb-2 dark:text-gray-300">
          Projects
        </p>
        <Link
          href="/storage"
          className={`${
            pathname === "/storage" ? "" : "hover:"
          }text-black cursor-pointer dark:text-white dark:hover:text-gray-300`}
        >
          Storage
        </Link>
        <Link
          href="/schema-visualizer"
          className={`${
            pathname === "/schema-visualizer" ? "" : "hover:"
          }text-black cursor-pointer dark:text-white dark:hover:text-gray-300`}
        >
          Schema Visualizer
        </Link>
        <Link
          href="/new"
          className={`${
            pathname === "/new" ? "" : "hover:"
          }text-black cursor-pointer dark:text-white dark:hover:text-gray-300`}
        >
          New
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
