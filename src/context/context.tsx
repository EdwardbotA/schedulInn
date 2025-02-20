import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { IGlobalContext } from "../interface/IGlobalContext";
import IUserData from "../interface/IUserData";
import { fetchUser } from "../services/usersAPI/userAPI";
import { Login } from "../components/LoginForm";

interface GlobalContextProps {
  children: ReactNode;
}

export const GlobalContext = createContext<IGlobalContext>({
  user: null,
  login: () => {},
  logout: () => {},
});

export const GlobalProvider: FC<GlobalContextProps> = ({ children }) => {
  const [user, setUser] = useState<IUserData | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      login(JSON.parse(storedUser));
    }
  }, []);

  const login = async (user: Login): Promise<IUserData | null> => {
    const userExists: IUserData[] = await fetchUser(user.email, user.tipo);

    if (userExists.length > 0) {
      localStorage.setItem(
        "user",
        JSON.stringify({ email: user.email, tipo: user.tipo })
      );
      setUser(userExists[0]);

      return userExists[0];
    }

    return null;
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <GlobalContext.Provider value={{ user, logout, login }}>
      {children}
    </GlobalContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error("useAuth debe usarse dentro de GlobalProvider");
  }

  return context;
}
