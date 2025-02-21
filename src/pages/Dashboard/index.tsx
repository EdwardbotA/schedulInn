import { FC } from "react";
import { useAuth } from "../../context/context";
import { Link, Outlet, useLocation, useNavigate } from "react-router";
import AdminHotelList from "../../components/AdminHotelList";
import Button from "../../components/Button";

const Dashboard: FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (!user) {
    navigate("/");
  }

  return (
    <section className="flex flex-col gap-5 w-full py-7 lg:max-w-5xl lg:self-center">
      <div className="flex flex-col w-full gap-4 md:flex-row">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-xl">Hola {user!.nombre}</p>
        </div>
        <div className="flex gap-2 items-center justify-center grow">
          <Link to={`/dashboard/agregar-hotel`}>
            <Button>Agregar Hotel</Button>
          </Link>
          <Link to={`/dashboard/reservas`}>
            <Button>Ver Reservas</Button>
          </Link>
        </div>
      </div>
      {location.pathname === "/dashboard" && user!.tipo === "agente" && (
        <AdminHotelList />
      )}
      <Outlet />
    </section>
  );
};

export default Dashboard;
