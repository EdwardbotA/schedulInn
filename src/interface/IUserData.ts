interface IUserData {
  id: string;
  nombre: string;
  email: string;
  password: string;
  tipo: string;
  hoteles?: string[];
  reservas?: string[];
}

export default IUserData;
