import { Sidebar } from "./Sidebar";
import { ReactNode } from "react";

interface ShellProps {
  children: ReactNode;
}

export function Shell({ children }: ShellProps) {
  return (
    <div className="flex min-h-[100dvh] w-full bg-background overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col h-[100dvh] overflow-y-auto scrollbar-thin">
        {children}
      </main>
    </div>
  );
}
