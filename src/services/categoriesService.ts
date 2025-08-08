// RODOLFO SEPAROU ESSE SERVICE DA TRANSACTION FORM PAGE, EU NÃO:

import type { CategoryTypes } from "../types/categoriesTypes";
import { api } from "./api";

//aqui busco as categorias na api(backend)
const getCategories = async (): Promise<CategoryTypes[]> => {
  
  try {
    const response = await api.get("/categories");
    console.log("aqui pego as categories", response);

    return response.data; 
  } catch (err) {
    console.error(err);
    throw new Error(); 
  }
};

export default getCategories;
