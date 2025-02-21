import { IEmergenciaData, IGuestData } from "./IGuestData";

interface IReservationData {
  id: string;
  usuarioId: string;
  hotelId: string;
  habitacionId: string;
  fechaEntrada: string;
  fechaSalida: string;
  huespedes: IGuestData[];
  contactoEmergencia: IEmergenciaData;
}

export default IReservationData;
