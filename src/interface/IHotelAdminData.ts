import IRoomData from "./IRoomData";

interface IHotelAdminData {
  id: string;
  adminId: string;
  nombre: string;
  direccion: string;
  ciudad: string;
  telefono: string;
  habilitado: boolean;
  habitaciones: IRoomData[];
}

export default IHotelAdminData;
