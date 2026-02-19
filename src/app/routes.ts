import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { ArchitectureOverview } from "./components/pages/ArchitectureOverview";
import { DatabaseSchema } from "./components/pages/DatabaseSchema";
import { FolderStructure } from "./components/pages/FolderStructure";
import { ApiStructure } from "./components/pages/ApiStructure";
import { BillingFlow } from "./components/pages/BillingFlow";
import { ScalingStrategy } from "./components/pages/ScalingStrategy";
import { AdminDashboard } from "./components/pages/AdminDashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: ArchitectureOverview },
      { path: "schema", Component: DatabaseSchema },
      { path: "structure", Component: FolderStructure },
      { path: "api", Component: ApiStructure },
      { path: "billing", Component: BillingFlow },
      { path: "scaling", Component: ScalingStrategy },
      { path: "dashboard", Component: AdminDashboard },
    ],
  },
]);
