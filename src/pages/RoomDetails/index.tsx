import { FC } from "react";
import { useParams } from "react-router";
import { useAuth } from "../../context/context";
import ReservationForm from "../../components/ReservationForm";

const RoomDetails: FC = () => {
  const { hotelId, habitacionId } = useParams();
  const { rooms } = useAuth();

  const hotel = rooms.find((hotel) => hotel.id === hotelId);
  const habitacion = hotel?.habitaciones.find((h) => h.id === habitacionId);

  return (
    <section className="flex flex-col gap-5 w-full">
      <div className="flex w-full justify-between items-center border-b-2 border-primary pb-5">
        <h2 className="text-2xl font-bold text-gray-800">{hotel?.nombre}</h2>
        <div>
          <p>
            <strong>Dirección:</strong> {hotel?.direccion}
          </p>
          <p>
            <strong>Teléfono:</strong> {hotel?.telefono}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4">
        <h3 className="text-xl font-semibold text-gray-800 mt-4">
          Detalles de la habitación:
        </h3>
        <div className="flex gap-2 w-full">
          <div className="flex flex-col gap-2 grow">
            <p>
              <strong>Tipo:</strong> {habitacion?.tipo}
            </p>
            <p>
              <strong>Capacidad Maxima:</strong> {habitacion?.capacidad}{" "}
              personas
            </p>
            <p>
              <strong>Ubicación:</strong> {habitacion?.ubicacion}
            </p>
            <p>
              <strong>Costo Base:</strong> ${habitacion?.costoBase}
            </p>
            <p>
              <strong>Impuesto:</strong> ${habitacion?.impuesto}
            </p>
          </div>
          <figure className="w-1/3 self-center">
            <img
              src={habitacion?.imagen}
              alt="Hotel"
              className="rounded w-full object-contain"
            />
          </figure>
        </div>
      </div>
      <ReservationForm cantidad={habitacion?.capacidad} />
    </section>
  );
};

export default RoomDetails;
