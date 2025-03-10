import IReservationData from "../../interface/IReservationData";
import { sendConfirmationEmail } from "../../utils/sendEmail";
import IUserData from "../../interface/IUserData";
import { fetchHotel } from "../hotelAPI/hotelsAdminAPI";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/firebase";
import { formatPrice } from "../../utils/formatPrice";

export const fetchBooksAdmin = async (hotelId: string) => {
  const q = query(collection(db, "reservas"), where("hotelId", "==", hotelId));
  const querySnapshot = await getDocs(q);

  const reservas = querySnapshot.docs.map((doc) => {
    const data = doc.data() as Omit<IReservationData, "id">;

    return {
      id: doc.id,
      ...data,
    };
  });

  return reservas;
};

export const fetchBooksGuest = async (userId: string) => {
  const q = query(collection(db, "reservas"), where("usuarioId", "==", userId));
  const querySnapshot = await getDocs(q);

  const reservas = querySnapshot.docs.map((doc) => {
    const data = doc.data() as Omit<IReservationData, "id">;

    return {
      id: doc.id,
      ...data,
    };
  });

  return reservas;
};

export const addReservation = async (
  reservationData: Omit<IReservationData, "id">,
  user: IUserData
) => {
  await addDoc(collection(db, "reservas"), reservationData);

  const hotel = await fetchHotel(reservationData.hotelId);
  const habitacion = hotel?.habitaciones.find(
    (habitacion) => habitacion.id === reservationData.habitacionId
  );

  await sendConfirmationEmail(user.email, {
    email: user.email,
    from_name: "SchedulInn",
    totalNoches: reservationData.totalNoches,
    tipo: habitacion!.tipo,
    costeTotal: formatPrice(reservationData.costeTotal),
    nombre: user.nombre,
    hotel: hotel!.nombre,
    fechaEntrada: reservationData.fechaEntrada,
    fechaSalida: reservationData.fechaSalida,
  });
};
