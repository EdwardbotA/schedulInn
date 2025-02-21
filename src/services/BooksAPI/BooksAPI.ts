import axios from "axios";

export const fetchBooks = async (hotelId: string) => {
  const { data } = await axios.get(
    `http://localhost:3001/reservas?hotelId=${hotelId}`
  );

  return data;
};
