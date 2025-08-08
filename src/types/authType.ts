// crio os tipos q serão usados em auth
export interface AuthState {
  user: {
    uid: string | null;
    displayName: string | null;
    email: string | null;
    photoUrl: string | null;
  } | null; 
  error: string | null;
  loading: boolean;
};

export interface AuthContextProps {
  // crio os tipos do contexto de autenticação
  authState: AuthState;
  signWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  loginWithEmailESenha: (email: string, password: string) => Promise<void>;
  registerWithEmailESenha: (email: string, password: string) => Promise<void>;
};


