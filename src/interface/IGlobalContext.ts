import { Login } from "../components/LoginForm";
import IUserData from "./IUserData";

export interface IGlobalContext {
  user: IUserData | null;
  login: (user: Login) => Promise<IUserData | null>;
  logout: () => void;
}
