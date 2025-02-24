interface IRoomData {
  id: string;
  tipo: string;
  capacidad: number;
  costoBase: number;
  impuesto: number;
  ubicacion: string;
  habilitada: boolean;
  imagen: string;
}

export default IRoomData;
