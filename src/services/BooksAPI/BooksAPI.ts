import axios from "axios";
import IReservationData from "../../interface/IReservationData";

export const fetchBooks = async (hotelId: string) => {
  const { data } = await axios.get(
    `http://localhost:3001/reservas?hotelId=${hotelId}`
  );

  return data;
};

export const addReservation = async (
  reservationData: Omit<IReservationData, "id">
) => {
  const { data } = await axios.post(
    "http://localhost:3001/reservas",
    reservationData
  );

  return data;
};
