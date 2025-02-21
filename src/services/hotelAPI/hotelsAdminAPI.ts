import axios from "axios";

export const fetchHotelesAdmin = async (adminId: string) => {
  const { data } = await axios.get(
    `http://localhost:3001/hotelesAdmin?adminId=${adminId}`
  );

  return data;
};
