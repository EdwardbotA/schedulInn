import IRoomData from "./IRoomData";

interface IHotelAdminData {
  id: string;
  adminId: string;
  nombre: string;
  direccion: string;
  telefono: string;
  habilitado: boolean;
  habitaciones: IRoomData[];
}

export default IHotelAdminData;
