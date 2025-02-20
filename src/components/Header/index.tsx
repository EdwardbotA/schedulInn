import { FC } from "react";
import schedulInnLogo from "../../assets/schedulInnLogo.png";

const Header: FC = () => {
  return (
    <header className="flex  w-full">
      <img src={schedulInnLogo} alt="Logo de SchedulInn" className="h-9" />
    </header>
  );
};

export default Header;
