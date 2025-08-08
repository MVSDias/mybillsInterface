import { BrowserRouter, Route, Routes } from "react-router";

import { AuthProvider } from "../context/AuthProvider";
import AppLayout from "../layout/AppLayout";
import Dashboard from "../pages/dashboard";
import Home from "../pages/home";
import Login from "../pages/login";
import Register from "../pages/register";
import Transactions from "../pages/transactionsPage";
import TransactionsForm from "../pages/transactionsFormPage";
import PrivateRoutes from "./PrivateRoutes";

//criando as rotas da aplicação.
const AppRoutes = () => {
  // aqui decide quem vai ficazr na tela. O que vai ser renderizado quando a rota for acessada
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<PrivateRoutes />}>
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/transacoes" element={<Transactions />} />
              <Route path="/transacoes/nova" element={<TransactionsForm />} />
            </Route>
          </Route>

          <Route path="*" element={<h2>Página não encontrada</h2>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default AppRoutes;

