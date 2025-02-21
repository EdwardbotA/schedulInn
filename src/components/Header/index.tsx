import { FC } from "react";
import schedulInnLogo from "../../assets/schedulInnLogo.png";
import Button from "../Button";
import { Link, useLocation } from "react-router";
import { useAuth } from "../../context/context";

const Header: FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <header className="flex w-full justify-between">
      <Link to={`${user ? "/dashboard" : "/"}`}>
        <img
          src={schedulInnLogo}
          alt="Logo de SchedulInn"
          className="h-9 hover:scale-110 transition-transform"
        />
      </Link>
      {location.pathname.includes("dashboard") && (
        <Button handleClick={logout}>Log out</Button>
      )}
    </header>
  );
};

export default Header;
