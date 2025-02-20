import { FC, useState } from "react";
import Button from "../../components/Button";
import MainTitle from "../../components/MainTitle";
import RegisterForm from "../../components/RegisterForm";
import LoginForm from "../../components/LoginForm";

const HomePage: FC = () => {
  const [formToShow, setFormToShow] = useState("login");
  const [message, setMessage] = useState({
    pargraph: "Todavía no tienes una cuenta",
    button: "Registrarte aqui",
  });

  const handleClick = () => {
    if (formToShow === "login") {
      setFormToShow("register");
      setMessage({
        pargraph: "ya tienes una cuenta",
        button: "Ingresa aquí",
      });
    } else {
      setFormToShow("login");
      setMessage({
        pargraph: "Todavía no tienes una cuenta",
        button: "Registrarte aqui",
      });
    }
  };

  return (
    <section className="flex grow flex-col items-center justify-center gap-9 md:flex-row md:justify-around lg:w-5xl lg:self-center">
      <MainTitle>SchedulInn</MainTitle>
      <div className="flex flex-col grow justify-center items-center gap-7 w-full md:w-1/2">
        <div className="flex flex-col items-center gap-5 w-full md:justify-center">
          {formToShow === "login" && <LoginForm />}
          {formToShow === "register" && <RegisterForm />}
          <p className="text-center text-2xl font-bold">{message.pargraph}</p>
          <Button handleClick={handleClick}>{message.button}</Button>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
