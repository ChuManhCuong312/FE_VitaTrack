import React, { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "user" | "expert" | "admin";

export interface AppUser {
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AppContextType {
  currentUser: AppUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role?: UserRole) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const DEMO_USERS: Record<UserRole, AppUser> = {
  user: {
    name: "Nguyễn Văn An",
    email: "an.nguyen@email.com",
    role: "user",
  },
  expert: {
    name: "ThS. Trần Thị Bích",
    email: "bich.tran@expert.com",
    role: "expert",
  },
  admin: {
    name: "Admin Hệ Thống",
    email: "admin@healthapp.vn",
    role: "admin",
  },
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<AppUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (_email: string, _password: string, role: UserRole = "user") => {
    setCurrentUser(DEMO_USERS[role]);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  const switchRole = (role: UserRole) => {
    setCurrentUser(DEMO_USERS[role]);
  };

  return (
    <AppContext.Provider value={{ currentUser, isAuthenticated, login, logout, switchRole }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
