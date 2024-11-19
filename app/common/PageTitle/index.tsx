import { ReactNode } from "react";

export function PageTitle({ children }: { children: ReactNode }) {
  return (
    <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
      {children}
    </h1>
  );
}
