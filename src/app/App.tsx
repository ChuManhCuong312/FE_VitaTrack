import React from "react";
import { RouterProvider } from "react-router";
import { AppProvider } from "./context/AppContext";
import { SidebarProvider } from "./context/SidebarContext";
import { router } from "./routes";
import "../styles/fonts.css";

export default function App() {
  return (
    <AppProvider>
      <SidebarProvider>
        <RouterProvider router={router} />
      </SidebarProvider>
    </AppProvider>
  );
}