import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import HomePage from "./features/home/HomePage";
import AssetsPage from "./features/assets/AssetsPage";
import IncidentsPage from "./features/incidents/IncidentsPage";
import VehiclesPage from "./features/vehicles/VehiclesPage";
import ZonesPage from "./features/zones/ZonesPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "assets", element: <AssetsPage /> },
      { path: "incidents", element: <IncidentsPage /> },
      { path: "vehicles", element: <VehiclesPage /> },
      { path: "zones", element: <ZonesPage /> },
    ],
  },
]);
