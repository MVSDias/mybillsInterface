import { Mail } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import GoogleLoginButton from "../components/GoogleLoginButton";
import { useAuth } from "../hooks/useAuth";
import type { DataProps } from "./register";

const Login = () => {
  const navigate = useNavigate();

  const { signWithGoogle, loginWithEmailESenha, authState } = useAuth(); 

  const { register, handleSubmit } = useForm<DataProps>();

  //FUNÇÃO QUE CHAMA O LOGIN COM EMAIL E SENHA DO AUTHPROVIDER.
  const onSubmit = async (data: DataProps): Promise<DataProps> => {
    await loginWithEmailESenha(data.email, data.password); 
    return data;
  };

  //FUNÇÃO QUE CHAMA O LOGIN COM GOOGLE DO AUTHPROVIDER
  const handleLogin = async () => {
    try {
      await signWithGoogle(); 
    } catch (err) {
      console.error("Erro ao fazer login com Google", err);
    }
  };

  useEffect(() => { 
    if (authState.user && !authState.loading) {
      navigate("/dashboard", { replace: true }); 
    }
  }, [authState.user, authState.loading, navigate]);

  

  return (
    <div className="max-h-screen flex items-center justify-center bg-gray-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <header>
          <h1 className="text-center text-3xl font-extrabold text-green-500 font-extrabol">MyBills</h1>
          <p className="mt-2 text-center text-sm  text-green-500 font-extrabol">
            Gerencie suas finanças de forma simples e eficiente
          </p>
        </header>

        <main className="mt-8 bg-gray-800/20 py-8 px-4 shadow-lg rounded-xl border border-gray-500 sm:px-10 space-y-6">
          <section>
            <h2 className="text-lg font-medium text-green-500 text-center">
              Faça login para continuar
            </h2>
            <p className="mt-1 text-sm  mb-4 text-green-500 text-center">
              Acesse sua conta para começar a gerenciar suas finanças
            </p>

            <section>
              <form
                className="flex flex-col items-center justify-center "
                onSubmit={handleSubmit(onSubmit)}
                autoComplete="off"
              >
                <input
                  className="px-5 py-2 mb-3 m-auto text-center border border-gray-500 bg-gray-800/10 rounded-xl  text-white w-full cursor-pointer placeholder:text-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/40 focus:shadow-[0_0_10px_2px_rgba(34,197,94,0.3)]"
                  type="email"
                  {...register("email")}
                  placeholder="Digite seu Email"
                />
                <input
                  className="px-5 py-2 mb-6 m-auto text-center border border-gray-500 bg-gray-800/10 rounded-xl  text-white w-full cursor-pointer placeholder:text-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/40 focus:shadow-[0_0_10px_2px_rgba(34,197,94,0.3)]"
                  type="password"
                  {...register("password")}
                  placeholder="Digite sua Senha"
                />

                <button
                  className="flex items-center justify-center mb-0 w-full py-3 border border-gray-500   font-bold bg-gray-800/10 rounded-xl text-green-500 cursor-pointer transition-all duration-300 hover:ring-2 hover:ring-green-500 hover:ring-offset-1 hover:ring-offset-gray-800 hover:shadow-[0_0_10px_2px_rgba(34,197,94,0.3)]"
                  type="submit"
                >
                  <Mail className="h-5 w-5 mr-2" /> Entrar com Email e Senha
                </button>
                <p className="mt-1 text-sm text-green-500 text-center ">
                  Ainda não tem conta? <a href="/register">Clique aqui p criar!</a>
                </p>
              </form>
            </section>
          </section>

          <GoogleLoginButton isLoading={false} onClick={handleLogin} />

          {authState && (
            <div className="bg-red-50 text-center text-red-700 mt-4">
              <p>{authState.error}</p>
            </div>
          )}

          <footer className="mt-6">
            <p className="mt-1 text-sm text-green-500 text-center">
              Ao fazer login, você concorda com nossos termos de uso e política de privacidade.
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default Login;
