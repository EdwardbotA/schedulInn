import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../Button";
import ErrorMessage from "../ErrorMessage";
import { useNavigate, useParams } from "react-router";
import {
  fetchHotel,
  updateHotel,
} from "../../services/hotelAPI/hotelsAdminAPI";
import IHotelAdminData from "../../interface/IHotelAdminData";
import { AddRoomFormData } from "../AddRoomForm";

const EditRoomForm: FC = () => {
  const { hotelId, habitacionId } = useParams();
  const [hotel, setHotel] = useState<IHotelAdminData | null>(null);
  const room = hotel?.habitaciones.find((h) => h.id === habitacionId);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AddRoomFormData>({
    mode: "all",
    defaultValues: {
      tipo: "select",
      costoBase: 0,
      impuesto: 0,
      ubicacion: "",
      habilitada: true,
    },
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchHotel(hotelId).then((res) => setHotel(res));
  }, [hotelId]);

  useEffect(() => {
    if (room) {
      setValue("tipo", room.tipo);
      setValue("costoBase", room.costoBase);
      setValue("impuesto", room.impuesto);
      setValue("ubicacion", room.ubicacion);
      setValue("habilitada", room.habilitada);
    }
  }, [setValue, room]);

  const onSubmited = async (formData: AddRoomFormData) => {
    try {
      if (hotel) {
        const updatedRoom = hotel.habitaciones.map((h) =>
          h.id === room?.id ? { ...formData, id: h.id } : h
        );

        await updateHotel(hotelId!, {
          habitaciones: updatedRoom,
        });

        navigate(`/dashboard/editar-hotel/${hotelId}`);
      }
    } catch (error) {
      console.error("Error en el registro", error);
    }
  };

  const onDeleted = async () => {
    try {
      if (hotel) {
        const updatedRoom = hotel.habitaciones.filter((h) => h.id !== room?.id);

        await updateHotel(hotelId!, {
          habitaciones: updatedRoom,
        });

        navigate(`/dashboard/editar-hotel/${hotelId}`);
      }
    } catch (error) {
      console.error("Error en el registro", error);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto p-4 border rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-bold mb-4">Editar habitación</h2>
        <Button handleClick={onDeleted}>Eliminar habitación</Button>
      </div>

      <form
        onSubmit={handleSubmit(onSubmited)}
        className="flex flex-col space-y-3"
      >
        <select
          defaultValue="select"
          className="border p-2 rounded"
          {...register("tipo", {
            validate: (val) =>
              val !== "select" || "Debes seleccionar un tipo de habitación",
          })}
        >
          <option value="select" disabled>
            Seleccione el tipo de habitación
          </option>
          <option value="simple">habitación Simple</option>
          <option value="doble">habitación Doble</option>
          <option value="Queen">habitación Queen</option>
          <option value="King">habitación King</option>
        </select>
        {errors.tipo && <ErrorMessage>{errors.tipo.message}</ErrorMessage>}

        <fieldset className="flex gap-6 w-full">
          <label className="flex flex-col w-1/2">
            Costo base de la habitación
            <input
              type="number"
              className={`w-full border p-2 rounded ${
                errors.costoBase && "border-primary border-2"
              }`}
              {...register("costoBase", {
                required: "El costo base es obligatorio",
                validate: (val) =>
                  val > 0 || "El costo base debe ser mayor a cero",
              })}
            />
            {errors.costoBase && (
              <ErrorMessage>{errors.costoBase.message}</ErrorMessage>
            )}
          </label>

          <label className="flex flex-col w-1/2">
            Porcentaje de impuestos
            <input
              type="number"
              className={`w-full border p-2 rounded ${
                errors.impuesto && "border-primary border-2"
              }`}
              {...register("impuesto", {
                required: "El impuesto es obligatorio",
                validate: {
                  menor: (val) =>
                    val > -1 || "El impuesto debe ser cero o mayor",
                  mayor: (val) =>
                    val < 101 || "El impuesto debe ser menor a 100",
                },
              })}
            />
            {errors.impuesto && (
              <ErrorMessage>{errors.impuesto.message}</ErrorMessage>
            )}
          </label>
        </fieldset>

        <input
          type="text"
          placeholder="Ubicacion de la habitación"
          className={`border p-2 rounded ${
            errors.ubicacion && "border-primary border-2"
          }`}
          {...register("ubicacion", {
            required: "La ubicacion es obligatoria",
          })}
        />
        {errors.ubicacion && (
          <ErrorMessage>{errors.ubicacion.message}</ErrorMessage>
        )}

        <label className="flex self-center items-center gap-3">
          ¿Quieres habilitar el hotel?
          <input
            type="checkbox"
            className={`border p-2 rounded`}
            {...register("habilitada")}
          />
        </label>

        <Button>Agregar habitación</Button>
      </form>
    </div>
  );
};

export default EditRoomForm;
