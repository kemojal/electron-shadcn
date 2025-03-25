import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { PermissionsRequest } from './components/PermissionsRequest';

export default function App() {
  return (
    <div className="w-full h-screen text-black">
      <RouterProvider router={router} />
      <PermissionsRequest />
    </div>
  );
}

const root = createRoot(document.getElementById("app")!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
