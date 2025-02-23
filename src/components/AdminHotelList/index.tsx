import { FC, useState } from "react";
import { useAuth } from "../../context/context";
import { useQuery } from "@tanstack/react-query";
import { fetchHotelesAdmin } from "../../services/hotelAPI/hotelsAdminAPI";
import IHotelAdminData from "../../interface/IHotelAdminData";
import Button from "../Button";
import { Link } from "react-router";

const AdminHotelList: FC = () => {
  const { user } = useAuth();
  const [openHotel, setOpenHotel] = useState<string | null>(null);
  const [openHotelRoom, setOpenHotelRoom] = useState<string | null | undefined>(
    null
  );

  const {
    data: hotels,
    isLoading,
    error,
  } = useQuery<IHotelAdminData[]>({
    queryKey: ["hotelsAdmin", user!.id],
    queryFn: () => fetchHotelesAdmin(user!.id),
    enabled: !!user?.id,
  });

  if (isLoading) return <p>Cargando...</p>;
  if (error) return <p>Error al cargar los hoteles</p>;

  return (
    <div className="flex flex-col gap-4">
      {hotels!.length > 0 ? (
        hotels!.map((hotel: IHotelAdminData) => (
          <article
            key={hotel.id}
            className="p-4 shadow-md rounded-lg border border-gray-300"
          >
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() =>
                setOpenHotel(openHotel === hotel.id ? null : hotel.id)
              }
            >
              <div>
                <h2 className="text-lg font-bold">{hotel.nombre}</h2>
                <p className="text-sm text-gray-600">{hotel.direccion}</p>
                <p className="text-sm text-gray-600">Tel: {hotel.telefono}</p>
                <p
                  className={
                    hotel.habilitado ? "text-green-600" : "text-red-600"
                  }
                >
                  {hotel.habilitado ? "Disponible" : "No Disponible"}
                </p>
              </div>
              {openHotel === hotel.id ? "🔺" : "🔻"}
            </div>
            {openHotel === hotel.id && (
              <article className="mt-2 space-y-2">
                <h3 className="text-md font-semibold">Habitaciones:</h3>

                {hotel.habitaciones.length > 0 ? (
                  hotel.habitaciones.map((habitacion) => (
                    <div
                      key={habitacion.id}
                      className="border p-2 rounded-md bg-gray-100 cursor-pointer"
                      onClick={() =>
                        setOpenHotelRoom(
                          openHotelRoom === habitacion.id ? null : habitacion.id
                        )
                      }
                    >
                      <p>
                        <strong>Tipo:</strong> {habitacion.tipo}
                      </p>
                      <p>
                        <strong>Costo Base:</strong> ${habitacion.costoBase}
                      </p>
                      <p>
                        <strong>Impuestos:</strong> {habitacion.impuesto}%
                      </p>
                      <p>
                        <strong>Ubicación:</strong> {habitacion.ubicacion}
                      </p>
                      <p
                        className={
                          habitacion.habilitada
                            ? "text-green-600"
                            : "text-red-600"
                        }
                      >
                        {habitacion.habilitada ? "Disponible" : "No Disponible"}
                      </p>
                      {openHotelRoom === habitacion.id && (
                        <Link
                          to={`/dashboard/editar-habitacion/${hotel.id}/${habitacion.id}`}
                        >
                          <Button>Editar Habitación</Button>
                        </Link>
                      )}
                    </div>
                  ))
                ) : (
                  <p>No hay habitaciones</p>
                )}
                <Link to={`/dashboard/editar-hotel/${hotel.id}`}>
                  <Button>Editar Hotel</Button>
                </Link>
              </article>
            )}
          </article>
        ))
      ) : (
        <p className="text-center italic font-semibold">No tienes hoteles</p>
      )}
    </div>
  );
};

export default AdminHotelList;
