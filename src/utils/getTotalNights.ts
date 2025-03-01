import IReservationData from "../interface/IReservationData";

export const getTotalNights = (
  inicio: IReservationData["fechaEntrada"],
  fin: IReservationData["fechaSalida"]
) => {
  if (inicio === "" || fin === "") return 0;

  const fechaInicio = new Date(inicio);
  const fechaFin = new Date(fin);
  const diferencia = fechaFin.getTime() - fechaInicio.getTime();
  const noches = Math.abs(diferencia / (1000 * 60 * 60 * 24));
  return noches;
};
