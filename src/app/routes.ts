import { createBrowserRouter, redirect } from "react-router";
import { Layout } from "./components/Layout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
// User pages
import Overview from "./pages/user/Overview";
import HealthProfile from "./pages/user/HealthProfile";
import FoodDiary from "./pages/user/FoodDiary";
import Exercise from "./pages/user/Exercise";
import AIAssistant from "./pages/user/AIAssistant";
import ExpertPage from "./pages/user/ExpertPage";
import Settings from "./pages/user/Settings";
// Expert pages
import ExpertDashboard from "./pages/expert/ExpertDashboard";
import ExpertUsers from "./pages/expert/ExpertUsers";
import ExpertCreateMenu from "./pages/expert/ExpertCreateMenu";
import ExpertAlerts from "./pages/expert/ExpertAlerts";
import ExpertSettings from "./pages/expert/ExpertSettings";
// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminFood from "./pages/admin/AdminFood";
import AdminExperts from "./pages/admin/AdminExperts";
import AdminSettings from "./pages/admin/AdminSettings";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        loader: () => redirect("/login"),
      },
      // User routes
      { path: "dashboard", Component: Overview },
      { path: "dashboard/health-profile", Component: HealthProfile },
      { path: "dashboard/food-diary", Component: FoodDiary },
      { path: "dashboard/exercise", Component: Exercise },
      { path: "dashboard/ai-assistant", Component: AIAssistant },
      { path: "dashboard/expert", Component: ExpertPage },
      { path: "dashboard/settings", Component: Settings },
      // Expert routes
      { path: "expert", Component: ExpertDashboard },
      { path: "expert/users", Component: ExpertUsers },
      { path: "expert/create-menu", Component: ExpertCreateMenu },
      { path: "expert/alerts", Component: ExpertAlerts },
      { path: "expert/settings", Component: ExpertSettings },
      // Admin routes
      { path: "admin", Component: AdminDashboard },
      { path: "admin/users", Component: AdminUsers },
      { path: "admin/food", Component: AdminFood },
      { path: "admin/experts", Component: AdminExperts },
      { path: "admin/settings", Component: AdminSettings },
    ],
  },
]);
