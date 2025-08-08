import { createContext } from "react";
import type { AuthContextProps } from "../types/authType";

export const AuthContext = createContext<AuthContextProps | undefined>(undefined); // crio o contexto vazio.
