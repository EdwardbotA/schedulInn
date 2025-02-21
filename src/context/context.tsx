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
import IReservationData from "../interface/IReservationData";
import { fetchBooks } from "../services/BooksAPI/BooksAPI";

interface GlobalContextProps {
  children: ReactNode;
}

export const GlobalContext = createContext<IGlobalContext>({
  user: null,
  reservations: [],
  login: () => Promise.resolve(null),
  logout: () => {},
});

export const GlobalProvider: FC<GlobalContextProps> = ({ children }) => {
  const [user, setUser] = useState<IUserData | null>(() => {
    const storedUser = localStorage.getItem("user");

    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [reservations, setReservations] = useState<IReservationData[]>([]);

  useEffect(() => {
    if (!user) return;

    const fetchReservations = async () => {
      const results = [
        ...(await Promise.all(
          user.hoteles!.map(async (hotelId) => {
            const book = await fetchBooks(hotelId);
            return book;
          })
        )),
      ].flat();

      setReservations(results);
    };

    fetchReservations();
  }, [user]);

  const login = async (user: Login): Promise<IUserData | null> => {
    const userExists: IUserData[] = await fetchUser(user.email, user.tipo);

    if (userExists.length > 0) {
      const savedUser = {
        id: userExists[0].id,
        nombre: userExists[0].nombre,
        email: userExists[0].email,
        tipo: userExists[0].tipo,
        hoteles: userExists[0].hoteles,
        reservas: userExists[0].reservas,
      };
      localStorage.setItem("user", JSON.stringify(savedUser));
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
    <GlobalContext.Provider value={{ user, logout, login, reservations }}>
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
