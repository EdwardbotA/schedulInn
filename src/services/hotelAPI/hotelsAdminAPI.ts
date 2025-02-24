import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import IHotelAdminData from "../../interface/IHotelAdminData";
import { db } from "../../config/firebase";

export const fetchHabitaciones = async () => {
  const q = query(
    collection(db, "hotelesAdmin"),
    where("habilitado", "==", true)
  );
  const querySnapshot = await getDocs(q);

  const rooms = querySnapshot.docs
    .map((doc) => {
      const hotel = doc.data() as Omit<IHotelAdminData, "id">;

      return {
        id: doc.id,
        ...hotel,
        habitaciones:
          hotel.habitaciones.filter((room) => room.habilitada) || [],
      };
    })
    .filter((hotel) => hotel.habitaciones.length > 0);

  return rooms;
};

export const fetchHotelesAdmin = async (adminId: string = "") => {
  let q;

  if (adminId) {
    q = query(collection(db, "hotelesAdmin"), where("adminId", "==", adminId));
  } else {
    q = query(collection(db, "hotelesAdmin"));
  }

  const querySnapshot = await getDocs(q);

  const hotels = querySnapshot.docs.map((doc) => {
    const data = doc.data() as Omit<IHotelAdminData, "id">;

    return {
      id: doc.id,
      ...data,
    };
  });

  return hotels;
};

export const addHotel = async (hotelData: Omit<IHotelAdminData, "id">) => {
  await addDoc(collection(db, "hotelesAdmin"), hotelData);
};

export const fetchHotel = async (hotelId: string | undefined) => {
  if (!hotelId) return null;

  const docRef = doc(db, "hotelesAdmin", hotelId);
  const docSnap = await getDoc(docRef);
  const data = docSnap.data() as Omit<IHotelAdminData, "id">;

  if (!docSnap.exists()) {
    throw new Error("El hotel no existe");
  }

  return { id: docSnap.id, ...data };
};

export const updateHotel = async (
  hotelId: string,
  hotelData: Partial<IHotelAdminData>
) => {
  const docRef = doc(db, "hotelesAdmin", hotelId);

  await updateDoc(docRef, hotelData);
};

export const deleteHotel = async (hotelId: string) => {
  const docRef = doc(db, "hotelesAdmin", hotelId);

  await deleteDoc(docRef);
};
