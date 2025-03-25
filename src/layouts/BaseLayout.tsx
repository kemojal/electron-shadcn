import React from "react";
import DragWindowRegion from "@/components/DragWindowRegion";
// import NavigationMenu from "@/components/template/NavigationMenu";

interface BaseLayoutProps {
  children: React.ReactNode;
}

export default function BaseLayout({ children }: BaseLayoutProps) {
  return (
    <div className="min-h-screen bg-white text-black">
      {/* <DragWindowRegion title="buddy" /> */}
      {/* <NavigationMenu /> */}
      <main className="h-screen">{children}</main>
    </div>
  );
}
