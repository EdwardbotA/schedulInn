import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/context";
import { useNavigate } from "react-router";
import IUserData from "../../interface/IUserData";
import ErrorMessage from "../ErrorMessage";
import Button from "../Button";
import { emailValidation } from "../../utils/emailValidation";

export type Login = Pick<IUserData, "email" | "tipo" | "password">;

const LoginForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Login>({
    mode: "all",
    defaultValues: {
      tipo: "select",
      email: "",
      password: "",
    },
  });
  const [message, setMessage] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmited = async (data: Login) => {
    const loggedUser: IUserData | null = await login(data);

    if (!loggedUser) {
      setMessage("El usuario no existe o el tipo de cuenta es incorrecto");
      return;
    }

    if (loggedUser.password !== data.password) {
      setMessage("Contraseña incorrecta");
      return;
    }

    navigate("dashboard");
  };

  return (
    <div className="w-full max-w-xl mx-auto p-4 border rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Iniciar sesión</h2>
      <form
        onSubmit={handleSubmit(onSubmited)}
        className="flex flex-col space-y-3"
      >
        <select
          defaultValue="select"
          className={`border p-2 rounded ${
            errors.email && "border-primary border-2"
          }`}
          {...register("tipo", {
            validate: (val) =>
              val !== "select" || "Debes seleccionar un tipo de cuenta",
          })}
        >
          <option value="select" disabled>
            Selecciona tu tipo de cuenta
          </option>
          <option value="agente">Administrador</option>
          <option value="viajero">Viajero</option>
        </select>
        {errors.tipo && <ErrorMessage>{errors.tipo.message}</ErrorMessage>}
        <input
          type="email"
          placeholder="Correo electrónico"
          className={`border p-2 rounded ${
            errors.email && "border-primary border-2"
          }`}
          {...register("email", {
            required: "El campo correo es requerido",
            validate: emailValidation,
          })}
        />
        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}

        <input
          type="password"
          placeholder="Contraseña"
          className={`border p-2 rounded ${
            errors.password && "border-primary border-2"
          }`}
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

        {message && <ErrorMessage>{message}</ErrorMessage>}
        <Button>Ingresar</Button>
      </form>
    </div>
  );
};

export default LoginForm;
