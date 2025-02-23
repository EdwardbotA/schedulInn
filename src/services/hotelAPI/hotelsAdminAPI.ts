import axios from "axios";
import IHotelAdminData from "../../interface/IHotelAdminData";
import IRoomData from "../../interface/IRoomData";

export const fetchHabitaciones = async () => {
  const { data } = await axios.get("http://localhost:3001/hotelesAdmin");

  const rooms: IHotelAdminData[] = data
    .filter((hotel: IHotelAdminData) => hotel.habilitado)
    .map((hotel: IHotelAdminData) => {
      return {
        ...hotel,
        habitaciones: hotel.habitaciones.filter(
          (room: IRoomData) => room.habilitada
        ),
      };
    })
    .filter((hotel: IHotelAdminData) => hotel.habitaciones.length > 0);

  return rooms;
};

export const fetchHotelesAdmin = async (adminId: string) => {
  const { data } = await axios.get(
    `http://localhost:3001/hotelesAdmin?adminId=${adminId}`
  );

  return data;
};

export const addHotel = async (hotelData: Omit<IHotelAdminData, "id">) => {
  const { data } = await axios.post(
    "http://localhost:3001/hotelesAdmin",
    hotelData
  );

  return data;
};

export const fetchHotel = async (hotelId: string | undefined) => {
  const { data } = await axios.get(
    `http://localhost:3001/hotelesAdmin/${hotelId}`
  );

  return data;
};

export const updateHotel = async (
  hotelId: string,
  hotelData: Partial<IHotelAdminData>
) => {
  const { data } = await axios.patch(
    `http://localhost:3001/hotelesAdmin/${hotelId}`,
    hotelData
  );

  return data;
};

export const deleteHotel = async (hotelId: string) => {
  const { data } = await axios.delete(
    `http://localhost:3001/hotelesAdmin/${hotelId}`
  );

  return data;
};
