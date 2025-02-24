import { FC } from "react";
import Button from "../Button";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/context";
import { fetchHabitaciones } from "../../services/hotelAPI/hotelsAdminAPI";

interface SearchFormData {
  hotel: string;
  ciudad: string;
  fechaEntrada: string;
  fechaSalida: string;
  personas: number;
}

const Search: FC = () => {
  const { setRooms, reservations } = useAuth();
  const { register, handleSubmit } = useForm<SearchFormData>({
    mode: "all",
    defaultValues: {
      hotel: "",
      ciudad: "",
      fechaEntrada: "",
      fechaSalida: "",
      personas: 1,
    },
  });

  const onSubmited = async (formData: SearchFormData) => {
    const fechaEntrada = formData.fechaEntrada
      ? new Date(formData.fechaEntrada)
      : null;
    const fechaSalida = formData.fechaSalida
      ? new Date(formData.fechaSalida)
      : null;

    if (fechaEntrada) fechaEntrada.setHours(0, 0, 0, 0);
    if (fechaSalida) fechaSalida.setHours(0, 0, 0, 0);

    let allRooms = await fetchHabitaciones();

    if (formData.hotel.trim() !== "") {
      allRooms = allRooms.filter((room) =>
        room.nombre.toLowerCase().includes(formData.hotel.toLowerCase())
      );
    }

    if (formData.ciudad.trim() !== "") {
      allRooms = allRooms.filter((hotel) =>
        hotel.direccion.toLowerCase().includes(formData.ciudad.toLowerCase())
      );
    }

    if (fechaEntrada && fechaSalida) {
      allRooms = allRooms.map((hotel) => {
        const habitacionesDisponibles = hotel.habitaciones.filter(
          (habitacion) => {
            const reservaDeHabitacion = reservations.filter(
              (reserva) =>
                reserva.hotelId === hotel.id &&
                reserva.habitacionId === habitacion.id
            );

            const estaDisponible = reservaDeHabitacion.every((reserva) => {
              const fechaEntrada = new Date(reserva.fechaEntrada);
              const fechaSalida = new Date(reserva.fechaSalida);
              fechaEntrada.setHours(0, 0, 0, 0);
              fechaSalida.setHours(0, 0, 0, 0);

              return fechaSalida <= fechaEntrada || fechaEntrada >= fechaSalida;
            });

            return estaDisponible;
          }
        );

        return { ...hotel, habitaciones: habitacionesDisponibles };
      });

      allRooms = allRooms.filter((hotel) => hotel.habitaciones.length > 0);
    }

    if (formData.personas > 1) {
      allRooms = allRooms.map((hotel) => {
        const habitacionesAdecuadas = hotel.habitaciones.filter(
          (habitacion) => habitacion.capacidad >= formData.personas
        );

        return { ...hotel, habitaciones: habitacionesAdecuadas };
      });

      allRooms = allRooms.filter((hotel) => hotel.habitaciones.length > 0);
    }

    setRooms(allRooms);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmited)}
      className="flex flex-col space-y-3"
    >
      <input
        type="search"
        placeholder="Buscar por nombre de hotel"
        className="border p-2 rounded"
        {...register("hotel")}
      />
      <input
        type="text"
        placeholder="Ciudad de destino"
        className="border p-2 rounded"
        {...register("ciudad")}
      />
      <input
        type="date"
        className="border p-2 rounded"
        {...register("fechaEntrada")}
      />
      <input
        type="date"
        className="border p-2 rounded"
        {...register("fechaSalida")}
      />
      <input
        type="number"
        min="1"
        placeholder="Número de personas"
        className="border p-2 rounded"
        {...register("personas")}
      />
      <Button>Buscar</Button>
    </form>
  );
};

export default Search;
