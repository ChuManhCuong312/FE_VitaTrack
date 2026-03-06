import React, { createContext, useContext, useState } from "react";
const AppContext = createContext(void 0);
const DEMO_USERS = {
  user: {
    name: "Nguy\u1EC5n V\u0103n An",
    email: "an.nguyen@email.com",
    role: "user"
  },
  expert: {
    name: "ThS. Tr\u1EA7n Th\u1ECB B\xEDch",
    email: "bich.tran@expert.com",
    role: "expert"
  },
  admin: {
    name: "Admin H\u1EC7 Th\u1ED1ng",
    email: "admin@healthapp.vn",
    role: "admin"
  }
};
function AppProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const login = (_email, _password, role = "user") => {
    setCurrentUser(DEMO_USERS[role]);
    setIsAuthenticated(true);
  };
  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
  };
  const switchRole = (role) => {
    setCurrentUser(DEMO_USERS[role]);
  };
  return /* @__PURE__ */ React.createElement(AppContext.Provider, { value: { currentUser, isAuthenticated, login, logout, switchRole } }, children);
}
function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
export {
  AppProvider,
  useApp
};
