import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../components/admin/auth/login";
import DashboardLayout from "../components/admin/dashboard/layout";
import PublicRoute from "./adminroutes/public-route";
import PrivateRoute from "./adminroutes/private-route";
// import Login from "./auth/login";
// import Dashboard from "./Dashboard/dashboard";
// import PrivateRoute from "../../redux/PrivateRoute";
// import PublicRoute from "../../redux/PublicRoute";

const AdminRouter: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute requiredRole="admin">
            <DashboardLayout />
          </PrivateRoute>
        }
      />
      {/* <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute requiredRole="admin">
            <Dashboard />
          </PrivateRoute>
        }
      /> */}
    </Routes>
  );
};

export default AdminRouter;
