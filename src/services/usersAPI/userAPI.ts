import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import IUserData from "../../interface/IUserData";
import { db } from "../../config/firebase";

export const fetchUser = async (email: string, tipo: string) => {
  const q = query(
    collection(db, "usuarios"),
    where("email", "==", email),
    where("tipo", "==", tipo)
  );

  const querySnapshot = await getDocs(q);

  const usuarios = querySnapshot.docs.map((doc) => {
    const data = doc.data() as Omit<IUserData, "id">;

    return {
      id: doc.id,
      ...data,
    };
  });

  return usuarios;
};

export const registerUser = async (userData: Omit<IUserData, "id">) => {
  await addDoc(collection(db, "usuarios"), userData);
};
