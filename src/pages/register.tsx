import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";



export interface DataProps {
  email: string;
  password: string;
}

const Register = () => {

  const { registerWithEmailESenha } = useAuth()
  
  const { register, handleSubmit } = useForm<DataProps>();
 

  const onSubmit = async(data: DataProps): Promise<DataProps> => {
    await registerWithEmailESenha(data.email, data.password); 
    return data
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <header>
          <h1 className="text-center text-3xl font-extrabold text-green-500">MyBills</h1>
          <p className="mt-2 text-center text-sm text-green-500">
            Gerencie suas finanças de forma simples e eficiente
          </p>
        </header>

        <main className="mt-8 bg-gray-800/10 py-8 px-4 shadow-lg rounded-xl border border-gray-500 sm:px-10 space-y-6">
          <form className="flex flex-col items-center justify-center text-gray-900" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <p className="text-center text-sm  text-green-500 font-extrabol mb-4">Crie sua conta para entrar</p>
            <input className="px-5 py-2 mb-4 text-center border border-gray-500 bg-gray-800/10 rounded-xl  text-white w-full cursor-pointer placeholder:text-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/40 focus:shadow-[0_0_10px_2px_rgba(34,197,94,0.3)]" type="email" {...register("email")} placeholder="Digite seu Email" />
            <input className="px-5 py-2 mb-7 text-center border border-gray-500 bg-gray-800/10 rounded-xl  text-white w-full cursor-pointer placeholder:text-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/40 focus:shadow-[0_0_10px_2px_rgba(34,197,94,0.3)]" type="password" {...register("password")} placeholder="Digite sua Senha" />
            <button className="flex items-center justify-center mb-0 w-full py-3 border border-gray-500 bg-gray-800/10 rounded-xl text-green-500 text-2xl font-bold cursor-pointer transition-all duration-300 hover:ring-2 hover:ring-green-500 hover:ring-offset-1 hover:ring-offset-gray-800 hover:shadow-[0_0_10px_2px_rgba(34,197,94,0.3)]" type="submit" >Registrar</button>

            <footer className="mt-6">
            <p className="mt-1 text-sm text-green-500 text-center">
              Ao registrar, você concorda com nossos termos de uso e política de privacidade.
            </p>
          </footer> 
          </form> 

          
        </main>
      </div>
    </div>
  );
};

export default Register;
