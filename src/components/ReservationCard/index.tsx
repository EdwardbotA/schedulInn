import { FC } from "react";
import IReservationData from "../../interface/IReservationData";
import IHotelAdminData from "../../interface/IHotelAdminData";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../context/context";
import { fetchHotelesAdmin } from "../../services/hotelAPI/hotelsAdminAPI";
import Button from "../Button";
import { Link } from "react-router";

interface IReservationCardProps {
  reservation: IReservationData;
}

const ReservationCard: FC<IReservationCardProps> = ({ reservation }) => {
  const { user } = useAuth();
  const { data: hotels } = useQuery<IHotelAdminData[]>({
    queryKey: ["hotelsAdmin", user!.id],
    queryFn: () =>
      user?.tipo === "agente"
        ? fetchHotelesAdmin(user!.id)
        : fetchHotelesAdmin(),
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

  return (
    <article className="flex flex-col shadow-lg rounded-lg p-6 border gap-5">
      <h2 className="text-xl font-semibold text-gray-800">
        Reserva #{reservation.id} hotel:{" "}
        {hotels?.find((hotel) => hotel.id === reservation.hotelId)?.nombre}
      </h2>
      <div className="mt-2 text-gray-600">
        <p className="font-medium">
          Inicio de reserva: {reservation.fechaEntrada}
        </p>
        <p className="font-medium">fin de reserva: {reservation.fechaSalida}</p>
        <p className="font-medium">
          Nombre del los huespedes:{" "}
          {reservation.huespedes.map((huespede) => huespede.nombre).join(", ")}
        </p>
        <p className="font-medium">
          habitacion:{" "}
          {
            rooms
              ?.find((room) => room.hotelId === reservation.hotelId)
              ?.room.find((bed) => bed.id === reservation.habitacionId)?.tipo
          }
        </p>
      </div>
      <Link to={`/dashboard/reservas/${reservation.id}`}>
        <Button>Ver Detalles</Button>
      </Link>
    </article>
  );
};

export default ReservationCard;
