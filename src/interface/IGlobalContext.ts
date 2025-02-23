import { Login } from "../components/LoginForm";
import IHotelAdminData from "./IHotelAdminData";
import IReservationData from "./IReservationData";
import IUserData from "./IUserData";

export interface IGlobalContext {
  user: IUserData | null;
  reservations: IReservationData[] | [];
  rooms: IHotelAdminData[] | [];
  login: (user: Login) => Promise<IUserData | null>;
  logout: () => void;
}
