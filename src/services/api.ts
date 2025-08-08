//AQUI FICAM AS CONFIGURAÇÕES DO AXIOS.  E 


import axios,  { type AxiosInstance, type InternalAxiosRequestConfig } from "axios";
import { firebaseAuth } from "../config/firebaseConfig";

//CRIO A CHAMADA HTTP PARA A API
export const api: AxiosInstance = axios.create({ 
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,

})

// CONFIGURO O INTERCEPTOR PARA ADICIONAR O TOKEN DE AUTORIZAÇÃO NAS REQUISIÇÕES. é como um middleware no frontend. Intercepta as requisiçoes e adiciona o token ao header da requisição.
api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => { 

    const user = firebaseAuth.currentUser 

    if(user){ 
      
      try{
        const token = await user.getIdToken();
        config.headers.set("Authorization", `Bearer ${token}`); 

      } catch(err){
        console.error("Erro ao obter token do usuário no Firebase", err)

      }
    }

    return config; 

  }
)