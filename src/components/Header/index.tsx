import { FC } from "react";
import schedulInnLogo from "../../assets/schedulInnLogo.png";
import Button from "../Button";
import { useLocation } from "react-router";
import { useAuth } from "../../context/context";

const Header: FC = () => {
  const { logout } = useAuth();
  const location = useLocation();

  return (
    <header className="flex w-full justify-between">
      <img src={schedulInnLogo} alt="Logo de SchedulInn" className="h-9" />
      {location.pathname.includes("dashboard") && (
        <Button handleClick={logout}>Log out</Button>
      )}
    </header>
  );
};

export default Header;
