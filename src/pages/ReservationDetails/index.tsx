import { FC } from "react";
import { Link, useParams } from "react-router";
import { useAuth } from "../../context/context";
import IHotelAdminData from "../../interface/IHotelAdminData";
import { fetchHotelesAdmin } from "../../services/hotelAPI/hotelsAdminAPI";
import { useQuery } from "@tanstack/react-query";
import Button from "../../components/Button";

const ReservationDetails: FC = () => {
  const { reservationId } = useParams();
  const { reservations, user } = useAuth();
  const reservation = reservations.find((res) => res.id === reservationId);

  const {
    data: hotels,
    isLoading,
    error,
  } = useQuery<IHotelAdminData[]>({
    queryKey: ["hotelsAdmin", user!.id],
    queryFn: () =>
      user?.tipo === "agente"
        ? fetchHotelesAdmin(user!.id)
        : fetchHotelesAdmin(),
    enabled: !!user?.id,
  });

  if (isLoading) return <p>Cargando...</p>;
  if (error) return <p>Error al cargar los detalles de la reserva</p>;

  return (
    <div className="w-full mx-auto p-6 bg-white shadow-lg rounded-xl mt-6 lg:max-w-5xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Detalles de la Reservación
      </h2>
      <Link to={`/dashboard/reservas`}>
        <Button>Volver a Mis Reservas</Button>
      </Link>
      <p className="text-gray-600 mt-4">
        ID de Reservación:{" "}
        <span className="font-medium">{reservation?.id}</span>
      </p>
      <p className="text-gray-600">
        Nombre del hotel:{" "}
        <span className="font-medium">
          {hotels?.find((hotel) => hotel.id === reservation?.hotelId)?.nombre}
        </span>
      </p>
      <p className="text-gray-600">
        Direccion del hotel:{" "}
        <span className="font-medium">
          {
            hotels?.find((hotel) => hotel.id === reservation?.hotelId)
              ?.direccion
          }
        </span>
      </p>
      <p className="text-gray-600">
        Habitación:{" "}
        <span className="font-medium">{reservation?.habitacionId}</span>
      </p>
      <p className="text-gray-600">
        Ubicación de la habitación:{" "}
        <span className="font-medium">
          {
            hotels
              ?.find((hotel) => hotel.id === reservation?.hotelId)
              ?.habitaciones.find(
                (habitacion) => habitacion.id === reservation?.habitacionId
              )?.ubicacion
          }
        </span>
      </p>
      <p className="text-gray-600">
        Fecha de Entrada:{" "}
        <span className="font-medium">{reservation?.fechaEntrada}</span>
      </p>
      <p className="text-gray-600">
        Fecha de Salida:{" "}
        <span className="font-medium">{reservation?.fechaSalida}</span>
      </p>

      <h3 className="text-xl font-semibold text-gray-800 mt-4">Huéspedes</h3>
      <ul className="list-disc pl-5 text-gray-600">
        {reservation?.huespedes.map((huesped, index) => (
          <li key={index} className="mt-2">
            <p className="font-medium">{huesped.nombre}</p>
            <p className="text-sm">
              Documento: {huesped.tipoDocumento} {huesped.numeroDocumento}
            </p>
            <p className="text-sm">Email: {huesped.email}</p>
            <p className="text-sm">Teléfono: {huesped.telefono}</p>
          </li>
        ))}
      </ul>

      <h3 className="text-xl font-semibold text-gray-800 mt-4">
        Contacto de Emergencia
      </h3>
      <p className="text-gray-600">
        Nombre:{" "}
        <span className="font-medium">
          {reservation?.contactoEmergencia.nombre}
        </span>
      </p>
      <p className="text-gray-600">
        Teléfono:{" "}
        <span className="font-medium">
          {reservation?.contactoEmergencia.telefono}
        </span>
      </p>
    </div>
  );
};

export default ReservationDetails;
