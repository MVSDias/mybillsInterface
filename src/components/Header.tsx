import { Activity, LogIn, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router";
import { useAuth } from "../hooks/useAuth";

interface NavLink {
  name: string;
  path: string;
}

const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false); 

  const { authState, signOut } = useAuth();
  const { pathname } = useLocation();

  const isAuthenticated: boolean = !!authState.user;

  const navLink: NavLink[] = [
    {
      name: "dashboard", 
      path: "/dashboard",
    },
    {
      name: "transações", 
      path: "/transacoes",
    },
  ];

  const handleSignOut = (): void => {
    setIsOpen(false);
    signOut();

  }

  const renderAvater = () => {
    if (!authState.user) {
      return null; 
    }

    if (authState.user.photoUrl) {
      return <img
        src={authState.user?.photoUrl}
        alt={` foto de perfil do(a) ${authState.user?.displayName}`}
        className="w-8 h-8 rounded-full border border-gray-700"
      />;
    }

    return (
      <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white">
        {authState.user?.displayName?.charAt(0)}
      </div>
    );
  };
  return (
    <header className="bg-gray-900 border-b border-gray-700">
      <div className="container-app">
        <div className="flex justify-between items-center py-4">
          {/* LOGO*/}
          <Link to="/" className="flex gap-2 text-xl text-primary-500 items-center font-bold">
            <Activity className="h-6 w-6" />
            MyBills - Controle Financeiro
          </Link>


          {/* {MENU DESKTOP - SÓ VAI APARECER NA TELA DO COMPUTADOR - RESPONSIVIDADE} */}

          {isAuthenticated && ( 
            <nav className="hidden md:flex space-x-3">
              
              {navLink.map(
                (
                  link, 
                ) => (
                  <Link 
                    key={link.path} 
                    to={link.path}
                    className={ 
                      pathname === link.path ? " flex items-center justify-center text-primary-500 bg-primary-500/10 rounded-md h-10 px-3 py-2" : "flex items-center justify-center text-gray-400 h-10 px-3 py2 hover:text-primary-500 hover:bg-primary-500/5 rounded-md"
                    }
                  
                  >
                    {link.name}
                  </Link>
                )
              )}
            </nav>
          )}

          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? ( 
              <div className="flex items-center space-x-4">
                {/* //AVATAR */}
                <div className="flex items-center space-x-2">
                  {renderAvater()}
                </div>
                <span className="text-sm font-medium">{authState.user?.displayName}</span>

                <button
                  type="button"
                  onClick={handleSignOut}
                  className=" hover:text-red-300 hover:bg-red-500 p-2 rounded-full transition-colors cursor-pointer"
                >
                <LogOut  className=" text-gray-200"/>
              </button>
              </div>

              

            ) : (
              <Link to={'/login'}>
                <LogIn className="bg-primary-500 text-gray-900 font-semibold px-5 py-2.5 rounded-xl flex items-center justify-center hover:bg-primary-500 transition-all" />
              </Link>
            )}
          </div>

          {/* //BOTÃO MOBILE */}
          
          <div className="md:hidden flex items-center space-x-4">
            <button 
              type="button"
              onClick={() => setIsOpen(!isOpen)} 
              className="text-gray-400 p-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              {isOpen ? <X size={24}/> : <Menu size={24}/>}
            </button>
          </div>

        </div>
      </div>

       

      {isOpen && ( 

        <div>
          <div >
            {isAuthenticated ? ( 
              <>
                <nav className="space-y-1">
                  {navLink.map((link) => ( 
                    <Link 
                      to={link.path} 
                      key={link.path}
                      className={`block p-4 rounded-lg
                       ${pathname === link.path 
                        ? "bg-gray-800 text-primary-500 font-medium" 
                        : "text-gray-400 hover:bg-gray-800 hover:text-primary-500"}   
                      `}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}

                    </Link>
                  ))}
                </nav>


                 {/* // AQUI GUARDO O AVATAR DO USUÁRIO */}

                <div className="flex items-center justify-between p-3.5 border-t border-gray-700">
                  <div className="flex  items-center space-x-2">
                    {renderAvater()}
                    <span>{authState.user?.displayName}</span>

                  </div>
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="cursor-pointer text-gray-400 hover:text-red-700 p-2 rounded-full hover:bg-red-200 transition-color"
                  >
                    <LogOut size={24}/>

                  </button>
                </div>
              </>
            ) : ( 
              <Link  
                to='/login'
                className="bg-primary-500 text-gray-800 font-semibold px-5 py-2.5 items-center justify-center hover:bg-primary-600"
                onClick={() => setIsOpen(false)}
              >
                Entrar
              </Link>
            )}



          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
