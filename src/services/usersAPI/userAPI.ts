import axios from "axios";
import IUserData from "../../interface/IUserData";

export const fetchUser = async (email: string, tipo: string) => {
  const { data } = await axios.get(
    `http://localhost:3001/usuarios?email=${email}&tipo=${tipo}`
  );

  return data;
};

export const registerUser = async (userData: Omit<IUserData, "id">) => {
  const { data } = await axios.post("http://localhost:3001/usuarios", userData);

  return data;
};
