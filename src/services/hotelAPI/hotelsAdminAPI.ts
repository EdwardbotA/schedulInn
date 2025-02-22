import axios from "axios";
import IHotelAdminData from "../../interface/IHotelAdminData";

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
