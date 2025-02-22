import { HashRouter, Navigate, Route, Routes } from "react-router";
import BasePage from "./pages/BasePage";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import { useAuth } from "./context/context";
import { JSX } from "react";
import Reservations from "./pages/Reservation";
import AddHotelForm from "./components/AddHotelForm";
import EditHotelForm from "./components/EditHotelForm";
import AddRoomForm from "./components/AddRoomForm";

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
          >
            <Route path="agregar-hotel" element={<AddHotelForm />} />
            <Route
              path="agregar-habitacion/:hotelId"
              element={<AddRoomForm />}
            />
            <Route path="editar-hotel/:hotelId" element={<EditHotelForm />} />
            <Route
              path="editar-habitacion/:habitacionId"
              element={<h1>Editar habitacion</h1>}
            />
            <Route path="reservas" element={<Reservations />} />
          </Route>
          <Route path="*" element={<PrivateRoute element={<Dashboard />} />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default AppRoutes;
