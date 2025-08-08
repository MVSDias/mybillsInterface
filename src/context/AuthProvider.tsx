// ENVOLVE TODA APLICAÇÃO E COLOCA O AuthState NO CONTEXTO

import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { type ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { firebaseAuth, googleAuthProvider } from "../config/firebaseConfig";
import type { AuthState } from "../types/authType";
import { AuthContext } from "./AuthContext"; 


export const AuthProvider = ({ children }: { children: ReactNode }) => {

  const navigate = useNavigate();

  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    error: null,
    loading: false,
  });

  
  useEffect(() => {

    const unsubscribe = onAuthStateChanged(
      firebaseAuth,
      async (user) => {

        console.log(user);

        if (user) {
          const token = await user.getIdToken();
          console.log("Token de autenticação:", token);

          setAuthState({
            user: {
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
              photoUrl: user.photoURL,
            },
            error: null, 
            loading: false, 
          });
        } else {
          setAuthState({ user: null, error: null, loading: false }); 
        }
      },
      (error) => {
        console.error("Erro na autenticação");
        setAuthState({ user: null, error: error.message, loading: false }); 
      },
    );

    return () => unsubscribe();
  }, []);

  

  const getMensagemFirebase = (code: string) => {
    switch (code) {
      case "auth/email-already-in-use":
        return "Este e-mail já está em uso.";
      case "auth/invalid-email":
        return "E-mail inválido.";
      case "auth/weak-password":
        return "A senha deve ter pelo menos 6 caracteres.";
      case "auth/user-not-found":
        return "Usuário não encontrado.";
      case "auth/wrong-password":
        return "Senha incorreta.";
      default:
        return "Ocorreu um erro. Tente novamente.";
    }
  };

  //crio a função registrar com email e senha
  const registerWithEmailESenha = async (email: string, password: string): Promise<void> => {
    setAuthState((prev) => ({ ...prev, loading: true })); 

    try {
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
      await loginWithEmailESenha(email, password); 
      setAuthState((prev) => ({ ...prev, loading: false }));
      navigate("/dashboard");
    } catch (err: unknown) {
      if (err instanceof FirebaseError) {
        const mensagem = getMensagemFirebase(err.code); 
        toast.error(mensagem);
      } else {
        toast.error("Erro desconhecido ao criar conta");
      }
    }
  };

  // crio a função login com email e senha:
  const loginWithEmailESenha = async (email: string, password: string): Promise<void> => {
    setAuthState((prev) => ({ ...prev, loading: true })); 

    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password);

      setAuthState((prev) => ({ ...prev, loading: false }));
      navigate("/dashboard");
    } catch (err: unknown) {
      console.error(err);
      toast.error("Senha e/ou Email inválido(s)");
    }
  };

  // crio a função de login com google
  const signWithGoogle = async (): Promise<void> => {
    setAuthState((prev) => ({ ...prev, loading: true }));

    try {
      await signInWithPopup(firebaseAuth, googleAuthProvider); 
      navigate("/dashboard"); 
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro ao tentar logar"; 

      setAuthState((prev) => ({ ...prev, loading: false, error: message }));
    }
  };

  // função de signOut
  const signOut = async (): Promise<void> => {
    try {
      await firebaseSignOut(firebaseAuth); 
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro ao tentar deslogar"; 

      setAuthState((prev) => ({ ...prev, loading: false, error: message }));
    }
  };

  

  return (
    <AuthContext.Provider
      value={{
        authState,
        loginWithEmailESenha,
        registerWithEmailESenha,
        signWithGoogle,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
