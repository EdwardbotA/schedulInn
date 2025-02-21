import { FC } from "react";
import { useAuth } from "../../context/context";
import IHotelAdminData from "../../interface/IHotelAdminData";
import { fetchHotelesAdmin } from "../../services/hotelAPI/hotelsAdminAPI";
import { useQuery } from "@tanstack/react-query";
import Button from "../../components/Button";

const Reservations: FC = () => {
  const { user, reservations } = useAuth();
  const { data: hotels } = useQuery<IHotelAdminData[]>({
    queryKey: ["hotelsAdmin", user!.id],
    queryFn: () => fetchHotelesAdmin(user!.id),
    enabled: !!user?.id,
  });

  const rooms = hotels
    ?.map((hotel) => {
      if (hotel.habitaciones.length === 0) return [];

      return {
        room: hotel.habitaciones,
        hotelId: hotel.id,
      };
    })
    .flat();

  console.log(rooms);

  return (
    <>
      <h1>Reservas</h1>
      {reservations.map((reservation) => (
        <article key={reservation.id}>
          <h2>
            Reserva #{reservation.id} hotel:{" "}
            {hotels?.find((hotel) => hotel.id === reservation.hotelId)?.nombre}
          </h2>
          <p>Inicio de reserva: {reservation.fechaEntrada}</p>
          <p>fin de reserva: {reservation.fechaSalida}</p>
          <p>
            Nombre del los huespedes:{" "}
            {reservation.huespedes
              .map((huespede) => huespede.nombre)
              .join(", ")}
          </p>
          <p>
            habitacion:{" "}
            {
              rooms
                ?.find((room) => room.hotelId === reservation.hotelId)
                ?.room.find((bed) => bed.id === reservation.habitacionId)?.tipo
            }
          </p>
          <Button>Editar</Button>
        </article>
      ))}
    </>
  );
};

export default Reservations;
