import { FC } from "react";
import { useAuth } from "../../context/context";
import { Link, Outlet, useLocation, useNavigate } from "react-router";
import AdminHotelList from "../../components/AdminHotelList";
import Button from "../../components/Button";
import RoomCard from "../../components/RoomCard";

const Dashboard: FC = () => {
  const { user, rooms } = useAuth();
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
      </div>
      {location.pathname === "/dashboard" && user!.tipo === "agente" && (
        <>
          <div className="flex gap-2 items-center justify-center grow">
            <Link to={`/dashboard/agregar-hotel`}>
              <Button>Agregar Hotel</Button>
            </Link>
            <Link to={`/dashboard/reservas`}>
              <Button>Ver Reservas</Button>
            </Link>
          </div>
          <AdminHotelList />
        </>
      )}
      {location.pathname === "/dashboard" && user?.tipo === "viajero" && (
        <>
          <div className="flex gap-2 items-center justify-center grow">
            <Link to={`/dashboard/reservas`}>
              <Button>Ver Mis Reservas</Button>
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-bold">Habitaciones</h2>
            <div className="flex flex-wrap gap-4 justify-center">
              {rooms.map((room) =>
                room.habitaciones.map((bed) => (
                  <RoomCard key={bed.id} hotel={room} habitacion={bed} />
                ))
              )}
            </div>
          </div>
        </>
      )}
      <Outlet />
    </section>
  );
};

export default Dashboard;
