import { Outlet } from "react-router";
import { FOOTER } from "../components/Footer";

import Header from "../components/Header";


const AppLayout = () => { // crio o layout q se repete nas minhas paginas
  return (
    <div className="min-h-screen flex-flex-col bg-app">
      <Header />
      <main className="flex-grow py-6">
        <Outlet />
        {/* aqui renderizo minha app */}
      </main>
      <FOOTER />
    </div>
  )
}

export default AppLayout;