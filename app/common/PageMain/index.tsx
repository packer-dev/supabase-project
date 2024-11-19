import { ReactNode } from "react";

export function PageMain({ children }: { children: ReactNode }) {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-4 lg:p-4">
      {children}
    </main>
  );
}
