import axios from "axios";
import IReservationData from "../../interface/IReservationData";
import { sendConfirmationEmail } from "../../utils/sendEmail";
import IUserData from "../../interface/IUserData";
import { fetchHotel } from "../hotelAPI/hotelsAdminAPI";

export const fetchBooksAdmin = async (hotelId: string) => {
  const { data } = await axios.get(
    `http://localhost:3001/reservas?hotelId=${hotelId}`
  );

  return data;
};

export const fetchBooksGuest = async (userId: string) => {
  const { data } = await axios.get(
    `http://localhost:3001/reservas?usuarioId=${userId}`
  );

  return data;
};

export const addReservation = async (
  reservationData: Omit<IReservationData, "id">,
  user: IUserData
) => {
  const { data } = await axios.post(
    "http://localhost:3001/reservas",
    reservationData
  );

  const hotel = await fetchHotel(reservationData.hotelId);

  await sendConfirmationEmail(user.email, {
		from_name: 'SchedulInn',
    nombre: user.nombre,
    hotel: hotel.nombre,
    fechaEntrada: reservationData.fechaEntrada,
    fechaSalida: reservationData.fechaSalida,
  });

  return data;
};
