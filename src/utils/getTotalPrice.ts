import IRoomData from "../interface/IRoomData";

export const getTotalPrice = (
  nights: number,
  costoBase: IRoomData["costoBase"],
  impuesto: IRoomData["impuesto"]
) => {
  if (nights > 0) {
    const subtotal = nights * costoBase;
    const totalImpuesto = subtotal * (impuesto / 100);
    const total = subtotal + totalImpuesto;

    return total;
  } else {
    return 0;
  }
};
