import { FC } from "react";
import { Outlet } from "react-router";
import Header from "../../components/Header";

const BasePage: FC = () => {
  return (
    <main className="flex flex-col min-h-screen p-4">
      <Header />
      <Outlet />
    </main>
  );
};

export default BasePage;
