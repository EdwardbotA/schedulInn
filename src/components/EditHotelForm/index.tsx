import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../Button";
import ErrorMessage from "../ErrorMessage";
import { useNavigate, useParams } from "react-router";
import {
  deleteHotel,
  fetchHotel,
  updateHotel,
} from "../../services/hotelAPI/hotelsAdminAPI";
import IHotelAdminData from "../../interface/IHotelAdminData";

interface EditHotelFormData {
  nombre: string;
  direccion: string;
  telefono: string;
  habilitado: boolean;
}

const EditHotelForm: FC = () => {
  const { hotelId } = useParams();
  const [hotel, setHotel] = useState<IHotelAdminData | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EditHotelFormData>({
    mode: "all",
    defaultValues: {
      nombre: "",
      direccion: "",
      telefono: "",
      habilitado: false,
    },
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchHotel(hotelId).then((res) => setHotel(res));
  }, [hotelId]);

  useEffect(() => {
    if (hotel) {
      setValue("nombre", hotel.nombre);
      setValue("direccion", hotel.direccion);
      setValue("telefono", hotel.telefono);
      setValue("habilitado", hotel.habilitado);
    }
  }, [hotel, setValue]);

  const onSubmited = async (formData: EditHotelFormData) => {
    try {
      await updateHotel(hotelId!, formData);

      navigate("/dashboard");
    } catch (error) {
      console.error("Error en el registro", error);
    }
  };

  const onDeleted = async () => {
    try {
      await deleteHotel(hotelId!);

      navigate("/dashboard");
    } catch (error) {
      console.error("Error en el registro", error);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto p-4 border rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-3">
        <Button handleClick={onDeleted}>Eliminar hotel</Button>
        <Button>Añadir habitación</Button>
      </div>
      <h2 className="text-xl font-bold mb-4">Editar hotel</h2>

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

        <Button>Guardar cambios</Button>
      </form>
    </div>
  );
};

export default EditHotelForm;
