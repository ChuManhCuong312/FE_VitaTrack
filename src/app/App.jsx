import React from "react";
import { RouterProvider } from "react-router";
import { AppProvider } from "./context/AppContext";
import { SidebarProvider } from "./context/SidebarContext";
import { router } from "./routes";
import "../styles/fonts.css";
function App() {
  return /* @__PURE__ */ React.createElement(AppProvider, null, /* @__PURE__ */ React.createElement(SidebarProvider, null, /* @__PURE__ */ React.createElement(RouterProvider, { router })));
}
export {
  App as default
};
