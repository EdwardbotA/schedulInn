import { FC, useState } from "react";
// import Button from "../../components/Button";
import MainTitle from "../../components/MainTitle";
// import RegisterForm from "../../components/RegisterForm";
import LoginForm from "../../components/LoginForm";
import { useAuth } from "../../context/context";

const HomePage: FC = () => {
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const { user } = useAuth();

  return (
    <section className="flex grow flex-col items-center justify-center gap-9 md:flex-row md:justify-around lg:w-5xl lg:self-center">
      <MainTitle>SchedulInn</MainTitle>
      {/* <div className="flex flex-col grow justify-center items-center gap-7 w-full md:w-1/2">
        <div className="flex flex-col items-center gap-2 w-full md:flex-row  md:justify-center">
          <Button
            handleClick={() => {
              setShowRegisterForm(!showRegisterForm);
              if (user) {
                setUser("");
              } else {
                setUser("agente");
              }
            }}
            isDisabled={user === "viajero"}
          >
            Soy Administrador
          </Button>
          <Button
            handleClick={() => {
              setShowRegisterForm(!showRegisterForm);
              if (user) {
                setUser("");
              } else {
                setUser("viajero");
              }
            }}
            isDisabled={user === "agente"}
          >
            Soy Usuario
          </Button>
        </div>
        {showRegisterForm && <RegisterForm user={user} />}
      </div> */}
      <LoginForm user={user} />
    </section>
  );
};

export default HomePage;
