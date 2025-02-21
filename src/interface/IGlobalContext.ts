import { Login } from "../components/LoginForm";
import IReservationData from "./IReservationData";
import IUserData from "./IUserData";

export interface IGlobalContext {
  user: IUserData | null;
  reservations: IReservationData[] | [];
  login: (user: Login) => Promise<IUserData | null>;
  logout: () => void;
}
