import { FC } from "react";
import { useForm } from "react-hook-form";
import Button from "../Button";
import ErrorMessage from "../ErrorMessage";
import { useAuth } from "../../context/context";
import { addHotel } from "../../services/hotelAPI/hotelsAdminAPI";
import { useNavigate } from "react-router";

interface AddHotelFormData {
  nombre: string;
  direccion: string;
  ciudad: string;
  telefono: string;
  habilitado: boolean;
}

const AddHotelForm: FC = () => {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddHotelFormData>({
    mode: "all",
    defaultValues: {
      nombre: "",
      direccion: "",
      ciudad: "",
      telefono: "",
      habilitado: false,
    },
  });
  const navigate = useNavigate();

  const onSubmited = async (formData: AddHotelFormData) => {
    try {
      const sendData = {
        ...formData,
        adminId: user!.id,
        habitaciones: [],
      };

      await addHotel(sendData);

      navigate("/dashboard");
    } catch (error) {
      console.error("Error en el registro", error);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto p-4 border rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Crear nuevo hotel</h2>

      <form
        onSubmit={handleSubmit(onSubmited)}
        className="flex flex-col space-y-3"
      >
        <input
          type="text"
          placeholder="Nombre del hotel"
          className={`border p-2 rounded ${
            errors.nombre && "border-primary border-2"
          }`}
          {...register("nombre", {
            required: "El nombre es obligatorio",
            minLength: {
              value: 3,
              message: "El nombre debe tener al menos 3 caracteres",
            },
          })}
        />
        {errors.nombre && <ErrorMessage>{errors.nombre.message}</ErrorMessage>}

        <input
          type="text"
          placeholder="Dirección del hotel"
          className={`border p-2 rounded ${
            errors.direccion && "border-primary border-2"
          }`}
          {...register("direccion", {
            required: "La dirección es obligatoria",
            minLength: {
              value: 8,
              message: "La dirección debe tener al menos 8 caracteres",
            },
          })}
        />
        {errors.direccion && (
          <ErrorMessage>{errors.direccion.message}</ErrorMessage>
        )}

        <input
          type="text"
          placeholder="Ciudad del hotel"
          className={`border p-2 rounded ${
            errors.ciudad && "border-primary border-2"
          }`}
          {...register("ciudad", {
            required: "La ciudad es obligatoria",
            minLength: {
              value: 3,
              message: "La ciudad debe tener al menos 3 caracteres",
            },
          })}
        />
        {errors.ciudad && <ErrorMessage>{errors.ciudad.message}</ErrorMessage>}

        <input
          type="text"
          placeholder="Numero de telefono"
          className={`border p-2 rounded ${
            errors.telefono && "border-primary border-2"
          }`}
          {...register("telefono", {
            required: "El numero de telefono es obligatorio",
          })}
        />
        {errors.telefono && (
          <ErrorMessage>{errors.telefono.message}</ErrorMessage>
        )}

        <label className="flex self-center items-center gap-3">
          ¿Quieres habilitar el hotel?
          <input
            type="checkbox"
            className={`border p-2 rounded`}
            {...register("habilitado")}
          />
        </label>

        <Button>Añadir hotel</Button>
      </form>
    </div>
  );
};

export default AddHotelForm;
