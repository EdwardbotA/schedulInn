import { FC } from "react";
import { Outlet } from "react-router";

const BasePage: FC = () => {
  return (
    <main className="flex flex-col min-h-screen p-4">
      <Outlet />
    </main>
  );
};

export default BasePage;
