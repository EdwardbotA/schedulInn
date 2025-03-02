import { FC } from "react";
import { getTotalNights } from "../../utils/getTotalNights";
import { formatPrice } from "../../utils/formatPrice";

interface IShowTotalProps {
  total: number;
  fechaEntrada: string;
  fechaSalida: string;
}

const ShowTotal: FC<IShowTotalProps> = ({
  total,
  fechaEntrada,
  fechaSalida,
}) => {
  return (
    <div className="border p-4 mt-4">
      <h3 className="text-lg font-semibold">Total de la Reservación</h3>
      <p className="text-xl font-semibold">
        noches: {getTotalNights(fechaEntrada, fechaSalida)}
      </p>
      <p className="text-xl font-semibold">total: {formatPrice(total)}</p>
    </div>
  );
};

export default ShowTotal;
