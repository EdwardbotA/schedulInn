import { FC } from "react";
import Button from "../Button";
import { useForm } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import { useNavigate } from "react-router";
import { fetchUser, registerUser } from "../../services/usersAPI/userAPI";
import IUserData from "../../interface/IUserData";
import { emailValidation } from "../../utils/emailValidation";

interface RegisterFormProps {
  user: string;
}

interface RegisterFormData {
  nombre: string;
  email: string;
  password: string;
  tipo: string;
}

const RegisterForm: FC<RegisterFormProps> = ({ user }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    mode: "all",
    defaultValues: {
      nombre: "",
      email: "",
      password: "",
      tipo: user,
    },
  });

  const navigate = useNavigate();

  const onSubmited = async (formData: RegisterFormData) => {
    try {
      const alreadyRegistered: IUserData[] = await fetchUser(
        formData.email,
        formData.tipo
      );

      if (alreadyRegistered.length > 0) {
        console.error("El correo ya esta registrado");
        return;
      }

      await registerUser(formData);

      navigate("dashboard");
    } catch (error) {
      console.error("Error en el registro", error);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto p-4 border rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Registro</h2>
      <p className="text-sm text-gray-500 mb-4">
        Si ya tienes una cuenta, ingresa tu correo electrónico y contraseña para
        iniciar sesión.
      </p>
      <form
        onSubmit={handleSubmit(onSubmited)}
        className="flex flex-col space-y-3"
      >
        <input
          type="text"
          placeholder="Nombre"
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
          type="email"
          placeholder="Correo electrónico"
          className="border p-2 rounded"
          {...register("email", {
            required: "El correo es obligatorio",
            validate: emailValidation,
          })}
        />
        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}

        <input
          type="password"
          placeholder="Contraseña"
          className="border p-2 rounded"
          {...register("password", {
            required: "La contraseña es obligatoria",
            minLength: {
              value: 8,
              message: "La contraseña debe tener al menos 8 caracteres",
            },
          })}
        />
        {errors.password && (
          <ErrorMessage>{errors.password.message}</ErrorMessage>
        )}

        <select
          className="border p-2 rounded disabled:bg-gray-200"
          disabled
          {...register("tipo")}
        >
          {user === "agente" ? (
            <option value={user}>Administrador</option>
          ) : (
            <option value={user}>Viajero</option>
          )}
        </select>

        <Button handleClick={() => handleSubmit}>Registrarse</Button>
      </form>
    </div>
  );
};

export default RegisterForm;
