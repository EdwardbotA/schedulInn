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
