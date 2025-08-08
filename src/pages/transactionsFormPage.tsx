import { AlertCircle, Calendar, DollarSign, Save, Tag } from "lucide-react";
import { type ChangeEvent, type FormEvent, useEffect, useId, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import Button from "../components/Button";
import Card from "../components/Card";
import Input from "../components/Input";
import Select from "../components/Select";
import TransactionTypeSelector from "../components/TransactionTypeSelector";
import getCategories from "../services/categoriesService";
import { createTransactions } from "../services/transactionService";
import type { CategoryTypes } from "../types/categoriesTypes";
import {
  type CreateTransactionDTO,
  type TransactionsPropsType,
  TransactionType,
} from "../types/transactionsTypes";

interface CreateTransaction {
  description: string;
  amount: number;
  date: Date | string ;
  categoryId: string;
  type: TransactionsPropsType;
}

const initialFormData = {
  
  description: "", 
  amount: 0, 
  date: "", 
  categoryId: "", 
  type: TransactionType.EXPENSE, 
};

const TransactionForm = () => {
  const [categories, setCategories] = useState<CategoryTypes[]>([]);
  const [formData, setFormData] = useState<CreateTransaction>(initialFormData);
  const [error, setError] = useState<string | null>(null); 
  const [loading, setLoading] = useState<boolean>(false);
  const formId = useId(); 

  const navigate = useNavigate();

  const ValidateForm = (): boolean => {
    
    if(!formData.description || !formData.amount || !formData.categoryId || !formData.date){ 
      setError('Preencha todos os campos'); 
      return false;      
    }

    if(formData.amount <= 0){ 
      setError('O valor tem q ser maior que zero');
    }
    return true;
  }

  useEffect(() => {
    
    const fetchCategories = async (): Promise<void> => {
      
      const response = await getCategories(); 
      setCategories(response);
    };

    fetchCategories();
  }, []);

  const filteredCategories = categories.filter(category => category.type === formData.type);

  //CRIO A FUNÇÃO QUE VAI CONTROLAR QUAL TYPE ESTÁ ATIVO:
  const handleTransactionType = (itemType: TransactionsPropsType): void => {
    setFormData((prev) => ({ ...prev, type: itemType }));
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => { 

    const {name, value} = event.target;
    setFormData((prev) => ({...prev, [name]: value})); 
  }

  const handleSubmit = async (e: FormEvent ): Promise<void> => {
    e.preventDefault();
    setLoading(true)
    setError(null);

    try { 
      if(!ValidateForm()){
        return; 
      }

      const transactionData :CreateTransactionDTO = { 
        description: formData.description,
        amount: formData.amount,
        categoryId: formData.categoryId,
        type: formData.type,
        date: `${formData.date}T12:00:00.000z`,
      }


      const response = await createTransactions(transactionData);
      toast.success("Transação adicionada com sucesso");

      navigate('/transacoes')

      console.log(response)
    } catch(err){
      console.error(err)
      toast.error("Erro ao adicionar transação")
    } finally {
      setLoading(false)
    }
    
    
  };

  const handleCancel = () => {
    navigate('/transacoes')
  }

  return (
    <div className="container-app py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Nova Trasação</h1>

      <Card>

        {error && (
          <div className="flex items-c bg-red-300 border gap-2 border-red-700 rounded-xl p-4 mb-6">
            <AlertCircle className="w-5 h5 text-red-700"/>
            <p className="text-red-700">{error}</p>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex gap-2 flex-col">
            <label htmlFor={formId}>Tipo de Despesa</label>
            <TransactionTypeSelector
              id={formId}
              value={formData.type}
              onChange={handleTransactionType} 
            />
          </div>
          <Input 
            label="Descrição" 
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Ex: Supermercado, Salário, Plano de saúde..."
            
          />
          <Input 
            label="Valor" 
            name="amount"
            type="number"
            step="0.01"
            required
            
            value={formData.amount}
            onChange={handleInputChange}
            placeholder="R$ 0,00"
            icon={<DollarSign className="w-4 h-4 text-gray-400"/>}
            
          />
          <Input 
            label="Data" 
            name="date"
            type="date"            
            value={typeof formData.date === "string" ? formData.date : formData.date.toISOString().slice(0, 10)}
            onChange={handleInputChange}            
            icon={<Calendar className="w-4 h-4 text-gray-400"/>}
            
          />

          <Select 
            label="Categoria"
            name="categoryId"
            value={formData.categoryId}
            onChange={handleInputChange}
            icon={<Tag className="w-4 h-4" />}
            
            options={[
              {value: "", label:"Selecione uma categoria" },
              ...filteredCategories.map((category) => ({
                 value: category.id, 
                 label: category.name
              }))
            ]}
          />

          <div className="flex justify-end space-x-3 mt-2">
            <Button 
              className="" 
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={loading}

            >
              Cancelar 

            </Button>
            <Button
              type="submit"
              variant={formData.type === TransactionType.EXPENSE ? "danger" : "success"}
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center ">
                  <div className="w-4 h-4 border-4 border-gray-700 border-t-transparent rounded-full        animate-spin">                    
                  </div>
                </div>
              ) : <Save className="w-4 h-4 mr-2"/>}

              Salvar          

            </Button>
          </div>
        </form>
      </Card>

      </div>
      
    </div>
  );
};
export default TransactionForm;

