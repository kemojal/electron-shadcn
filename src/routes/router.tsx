import { createHashRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import { SettingsPage } from "../pages/SettingsPage";

export const router = createHashRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/settings",
    element: <SettingsPage />,
  },
]);
