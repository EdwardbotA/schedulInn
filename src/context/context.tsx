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
import {
  fetchBooksAdmin,
  fetchBooksGuest,
} from "../services/BooksAPI/BooksAPI";
import { fetchHabitaciones } from "../services/hotelAPI/hotelsAdminAPI";
import IHotelAdminData from "../interface/IHotelAdminData";

interface GlobalContextProps {
  children: ReactNode;
}

export const GlobalContext = createContext<IGlobalContext>({
  user: null,
  reservations: [],
  rooms: [],
  login: () => Promise.resolve(null),
  logout: () => {},
  setReservations: () => {},
});

export const GlobalProvider: FC<GlobalContextProps> = ({ children }) => {
  const [user, setUser] = useState<IUserData | null>(() => {
    const storedUser = localStorage.getItem("user");

    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [reservations, setReservations] = useState<IReservationData[]>([]);
  const [rooms, setRooms] = useState<IHotelAdminData[]>([]);

  useEffect(() => {
    if (!user) return;

    const fetchReservations = async () => {
      if (user.hoteles) {
        const results = [
          ...(await Promise.all(
            user.hoteles.map(async (hotelId) => {
              const book = await fetchBooksAdmin(hotelId);
              return book;
            })
          )),
        ].flat();
        setReservations(results);
      } else if (user.reservas) {
        const results = await fetchHabitaciones();
        const books = await fetchBooksGuest(user.id);

        setRooms((prev) =>
          JSON.stringify(prev) !== JSON.stringify(results) ? results : prev
        );
        setReservations((prev) =>
          JSON.stringify(prev) !== JSON.stringify(books) ? books : prev
        );
      }
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
    <GlobalContext.Provider
      value={{ user, logout, login, reservations, rooms, setReservations }}
    >
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
