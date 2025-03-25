import React, { lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";

const HomePage = lazy(() => import('./pages/HomePage'));
const SettingsPage = lazy(() => import('./pages/SettingsPage'));

export default function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

const root = createRoot(document.getElementById("app")!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
