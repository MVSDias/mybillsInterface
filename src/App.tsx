import AppRoutes from "./routes";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <AppRoutes />
      <ToastContainer position="top-center" theme="dark" autoClose={2000} />      {/* Aqui injeto minhas rotas*/}
    </div>
  )
}

export default App;
