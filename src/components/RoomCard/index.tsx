import { FC } from "react";
import IHotelAdminData from "../../interface/IHotelAdminData";
import IRoomData from "../../interface/IRoomData";
import { Link } from "react-router";

interface RoomCardProps {
  hotel: IHotelAdminData;
  habitacion: IRoomData;
}

const RoomCard: FC<RoomCardProps> = ({ hotel, habitacion }) => {
  return (
    <Link to={`/dashboard/details/${hotel.id}/${habitacion.id}`}>
      <div className="w-full max-w-xs bg-white shadow-md rounded-2xl p-4 cursor-pointer hover:shadow-lg transition-all">
        <img
          src={habitacion.imagen}
          alt="Hotel"
          className="rounded-t-xl object-cover"
        />

        <h2 className="text-xl font-bold">{hotel.nombre}</h2>
        <p className="text-gray-600">
          Habitacion {habitacion.tipo} - ${habitacion.costoBase} la noche
        </p>
        <p className="text-sm text-gray-500">
          Ubicación: {habitacion.ubicacion}
        </p>
      </div>
    </Link>
  );
};

export default RoomCard;
