import { FC } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import Button from "../Button";
import ErrorMessage from "../ErrorMessage";
import { useAuth } from "../../context/context";
import { IGuestData } from "../../interface/IGuestData";
import { emailValidation } from "../../utils/emailValidation";
import {
  addReservation,
  fetchBooksGuest,
} from "../../services/BooksAPI/BooksAPI";
import { useNavigate, useParams } from "react-router";

interface ReservationFormData {
  fechaEntrada: string;
  fechaSalida: string;
  contactoEmergenciaNombre: string;
  contactoEmergenciaTelefono: string;
  huespedes: IGuestData[];
}

interface ReservationFromProps {
  cantidad: number | undefined;
}

const ReservationForm: FC<ReservationFromProps> = ({ cantidad }) => {
  const { user, setReservations } = useAuth();
  const { hotelId, habitacionId } = useParams();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ReservationFormData>({
    mode: "all",
    defaultValues: {
      fechaEntrada: "",
      fechaSalida: "",
      contactoEmergenciaNombre: "",
      contactoEmergenciaTelefono: "",
      huespedes: [
        {
          nombre: "",
          fechaNacimiento: new Date(),
          genero: "select",
          tipoDocumento: "select",
          numeroDocumento: "",
          email: "",
          telefono: "",
        },
      ],
    },
  });
  const navigate = useNavigate();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "huespedes",
  });

  const onSubmited = async (formData: ReservationFormData) => {
    try {
      if (hotelId && habitacionId && user) {
        const sendData = {
          usuarioId: user.id,
          hotelId: hotelId,
          habitacionId: habitacionId,
          fechaEntrada: formData.fechaEntrada,
          fechaSalida: formData.fechaSalida,
          huespedes: formData.huespedes,
          contactoEmergencia: {
            nombre: formData.contactoEmergenciaNombre,
            telefono: formData.contactoEmergenciaTelefono,
          },
        };

        await addReservation(sendData, user);

        const updatedBooks = await fetchBooksGuest(user.id);
        setReservations(updatedBooks);

        navigate("/dashboard/reservas");
      }
    } catch (error) {
      console.error("Error en el registro", error);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto p-4 border rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Reservar habitación</h2>

      <form
        onSubmit={handleSubmit(onSubmited)}
        className="flex flex-col space-y-3"
      >
        <label className="flex flex-col gap-1 w-full">
          Fecha de Entrada
          <input
            type="date"
            placeholder="Fecha de entrada"
            className={`border p-2 rounded ${
              errors.fechaEntrada && "border-primary border-2"
            }`}
            {...register("fechaEntrada", {
              required: "La fecha de entrada es obligatorio",
            })}
          />
        </label>
        {errors.fechaEntrada && (
          <ErrorMessage>{errors.fechaEntrada.message}</ErrorMessage>
        )}

        <label className="flex flex-col gap-1 w-full">
          Fecha de Salida
          <input
            type="date"
            placeholder="Fecha de salida"
            className={`border p-2 rounded ${
              errors.fechaSalida && "border-primary border-2"
            }`}
            {...register("fechaSalida", {
              required: "La fecha de salida es obligatorio",
            })}
          />
        </label>
        {errors.fechaSalida && (
          <ErrorMessage>{errors.fechaSalida.message}</ErrorMessage>
        )}

        <label className="flex flex-col gap-1 w-full">
          Contacto de Emergencia:
          <input
            type="text"
            placeholder="Nombre completo"
            className={`border p-2 rounded ${
              errors.contactoEmergenciaNombre && "border-primary border-2"
            }`}
            {...register("contactoEmergenciaNombre", {
              required: "El nombre es obligatorio",
              minLength: {
                value: 3,
                message: "El nombre debe tener al menos 3 caracteres",
              },
            })}
          />
        </label>
        {errors.contactoEmergenciaNombre && (
          <ErrorMessage>{errors.contactoEmergenciaNombre.message}</ErrorMessage>
        )}

        <input
          type="text"
          placeholder="Numero de telefono"
          className={`border p-2 rounded ${
            errors.contactoEmergenciaTelefono && "border-primary border-2"
          }`}
          {...register("contactoEmergenciaTelefono", {
            required: "El Numero de telefono es obligatorio",
            minLength: {
              value: 8,
              message: "El telefono debe tener al menos 8 caracteres",
            },
          })}
        />
        {errors.contactoEmergenciaTelefono && (
          <ErrorMessage>
            {errors.contactoEmergenciaTelefono.message}
          </ErrorMessage>
        )}

        <div className="flex flex-col gap-1 w-full py-3 border-y-2">
          Datos de los huespedes:
          {fields.map((field, index) => (
            <div key={field.id} className="flex flex-col space-y-3 w-full mb-3">
              <input
                type="text"
                placeholder={`Nombre completo ${index + 1}`}
                className={`border p-2 rounded ${
                  errors.huespedes?.[index]?.nombre && "border-primary border-2"
                }`}
                {...register(`huespedes.${index}.nombre` as const, {
                  required: "El nombre del huesped es obligatorio",
                  minLength: {
                    value: 3,
                    message:
                      "El nombre del huesped debe tener al menos 3 caracteres",
                  },
                })}
              />
              {errors.huespedes?.[index]?.nombre && (
                <ErrorMessage>
                  {errors.huespedes?.[index]?.nombre.message}
                </ErrorMessage>
              )}

              <label className="flex flex-col gap-1 w-full">
                Fecha de nacimiento huesped #{index + 1}
                <input
                  type="date"
                  placeholder={`Fecha de nacimiento ${index + 1}`}
                  className={`border p-2 rounded ${
                    errors.huespedes?.[index]?.fechaNacimiento &&
                    "border-primary border-2"
                  }`}
                  {...register(`huespedes.${index}.fechaNacimiento` as const, {
                    required:
                      "El fecha de nacimiento del huesped es obligatorio",
                  })}
                />
              </label>
              {errors.huespedes?.[index]?.fechaNacimiento && (
                <ErrorMessage>
                  {errors.huespedes?.[index]?.fechaNacimiento.message}
                </ErrorMessage>
              )}

              <select
                defaultValue="select"
                className={`border p-2 rounded ${
                  errors.huespedes?.[index]?.genero && "border-primary border-2"
                }`}
                {...register(`huespedes.${index}.genero` as const, {
                  validate: (val) =>
                    val !== "select" || "Debes seleccionar un genero",
                })}
              >
                <option value="select" disabled>
                  Seleccionar genero
                </option>
                <option value="Masculino">Hombre</option>
                <option value="Femenino">Mujer</option>
              </select>
              {errors.huespedes?.[index]?.genero && (
                <ErrorMessage>
                  {errors.huespedes?.[index]?.genero.message}
                </ErrorMessage>
              )}

              <select
                defaultValue="select"
                className={`border p-2 rounded ${
                  errors.huespedes?.[index]?.tipoDocumento &&
                  "border-primary border-2"
                }`}
                {...register(`huespedes.${index}.tipoDocumento` as const, {
                  validate: (val) =>
                    val !== "select" ||
                    "Debes seleccionar un tipo de documento",
                })}
              >
                <option value="select" disabled>
                  Seleccionar tipo de documento
                </option>
                <option value="RC">Registro civil</option>
                <option value="TI">Targeta de identidad</option>
                <option value="CC">Cédula de ciudadanía</option>
                <option value="PP">Pasaporte</option>
              </select>
              {errors.huespedes?.[index]?.tipoDocumento && (
                <ErrorMessage>
                  {errors.huespedes?.[index]?.tipoDocumento.message}
                </ErrorMessage>
              )}

              <input
                type="text"
                placeholder={`Numero de documento`}
                className={`border p-2 rounded ${
                  errors.huespedes?.[index]?.numeroDocumento &&
                  "border-primary border-2"
                }`}
                {...register(`huespedes.${index}.numeroDocumento` as const, {
                  required: "El numero de documento es obligatorio",
                  minLength: {
                    value: 8,
                    message:
                      "El numero de documento debe tener al menos 8 caracteres",
                  },
                })}
              />
              {errors.huespedes?.[index]?.numeroDocumento && (
                <ErrorMessage>
                  {errors.huespedes?.[index]?.numeroDocumento.message}
                </ErrorMessage>
              )}

              <input
                type="email"
                placeholder="Correo electrónico"
                className={`border p-2 rounded ${
                  errors.huespedes?.[index]?.email && "border-primary border-2"
                }`}
                {...register(`huespedes.${index}.email` as const, {
                  required: "El correo es obligatorio",
                  validate: emailValidation,
                })}
              />
              {errors.huespedes?.[index]?.email && (
                <ErrorMessage>
                  {errors.huespedes?.[index]?.email.message}
                </ErrorMessage>
              )}

              <input
                type="text"
                placeholder="Numero de telefono"
                className={`border p-2 rounded ${
                  errors.huespedes?.[index]?.telefono &&
                  "border-primary border-2"
                }`}
                {...register(`huespedes.${index}.telefono` as const, {
                  required: "El telefono es obligatorio",
                  minLength: {
                    value: 8,
                    message: "El telefono debe tener al menos 8 caracteres",
                  },
                })}
              />
              {errors.huespedes?.[index]?.telefono && (
                <ErrorMessage>
                  {errors.huespedes?.[index]?.telefono.message}
                </ErrorMessage>
              )}

              <Button
                type="button"
                handleClick={() => remove(index)}
                isDisabled={fields.length === 1}
              >
                X
              </Button>
            </div>
          ))}
          {fields.length < cantidad! && (
            <Button
              type="button"
              handleClick={() =>
                append({
                  nombre: "",
                  fechaNacimiento: new Date(),
                  genero: "select",
                  tipoDocumento: "select",
                  numeroDocumento: "",
                  email: "",
                  telefono: "",
                })
              }
            >
              + Agregar Huésped
            </Button>
          )}
        </div>

        <Button>Reservar habitación</Button>
      </form>
    </div>
  );
};

export default ReservationForm;
