import { Navigate, Outlet } from "react-router";
import { useAuth } from "../hooks/useAuth"

export default function PrivateRoutes(){

  const { authState } = useAuth();

  // faço uma verificação p saber se pode acesar as rotas privadas
  if(!authState.user){ // se não estiver logado...
    return <Navigate to="/login" replace={true} /> // retorna pro login
  }
  // se estiver logado retorno o outlet aqui
  return (
    <Outlet />
  )
}