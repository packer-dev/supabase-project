"use client";

import { ReactNode, useEffect } from "react";
import Header from "./common/Header";
import Navbar from "./common/Navbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useParams } from "next/navigation";

type WrapperProps = {
  children?: ReactNode;
};

const Wrapper = ({ children }: WrapperProps) => {
  const client = new QueryClient();
  const router = useParams();
  useEffect(() => {
    // Parse the URL hash parameters
    if (typeof window !== "undefined") {
      const hashParams = new URLSearchParams(window.location.hash.slice(1));
      const tokenData = {
        accessToken: hashParams.get("access_token"),
        expiresAt: hashParams.get("expires_at"),
        expiresIn: hashParams.get("expires_in"),
        refreshToken: hashParams.get("refresh_token"),
        tokenType: hashParams.get("token_type"),
        type: hashParams.get("type"),
      };
    }
  }, [router]);
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
