// import React from "react";
import DragWindowRegion from "@/components/DragWindowRegion";
// import NavigationMenu from "@/components/template/NavigationMenu";

export default function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* <DragWindowRegion title="buddy" /> */}
      {/* <NavigationMenu /> */}
      <main className="h-screen">{children}</main>
    </>
  );
}
