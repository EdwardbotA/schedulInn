import { HashRouter, Navigate, Route, Routes } from "react-router";
import BasePage from "./pages/BasePage";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import { useAuth } from "./context/context";
import { JSX } from "react";

interface IPrivateRoute {
  element: JSX.Element;
}

const PrivateRoute = ({ element }: IPrivateRoute) => {
  const { user } = useAuth();
  return user ? element : <Navigate to="/" />;
};

function AppRoutes() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<BasePage />}>
          <Route index element={<HomePage />} />
          <Route
            path="dashboard"
            element={<PrivateRoute element={<Dashboard />} />}
          />
          <Route path="*" element={<PrivateRoute element={<Dashboard />} />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default AppRoutes;
