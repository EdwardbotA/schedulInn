import { FC } from "react";
import { useAuth } from "../../context/context";
import ReservationCard from "../../components/ReservationCard";

const Reservations: FC = () => {
  const { reservations } = useAuth();

  return (
    <>
      <h1 className="text-3xl font-bold">Mis Reservas</h1>
      {reservations.length > 0 ? (
        reservations.map((reservation) => (
          <ReservationCard key={reservation.id} reservation={reservation} />
        ))
      ) : (
        <p className="text-center italic font-semibold">No tienes reservas</p>
      )}
    </>
  );
};

export default Reservations;
