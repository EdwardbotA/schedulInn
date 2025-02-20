import { FC, ReactNode } from "react";

interface MainTitleProps {
  children: ReactNode;
}

const MainTitle: FC<MainTitleProps> = ({ children }) => {
  return <h1 className="text-6xl font-bold text-gray-900 py-3">{children}</h1>;
};

export default MainTitle;
