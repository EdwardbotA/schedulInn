import { HashRouter, Route, Routes } from "react-router";
import App from "./App";
import BasePage from "./pages/BasePage";

function AppRoutes() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<BasePage />}>
          <Route index element={<App />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default AppRoutes;
