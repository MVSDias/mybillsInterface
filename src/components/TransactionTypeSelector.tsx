//cria o tipo de despesa da nova transação.

import { type TransactionsPropsType, TransactionType } from "../types/transactionsTypes";


interface TransactionTypeSelectorProps { 
  value: TransactionsPropsType;
  id?: string;
  onChange: (type:TransactionsPropsType) => void;
}


const TransactionTypeSelector = ({value, id, onChange}: TransactionTypeSelectorProps) => { 
  // crio a função para definir o css dos botões seletores de tipos de transações:
  const transactionsTypeButtons = [ 
    {
      type: TransactionType.EXPENSE,
      label: "Despesa",
      activeClass: "bg-red-500 border-red-700 text-red-700 font-medium",
      inactiveClass: "bg-transparent border-red-500 text-red-500 hover:bg-red-100"
    },
    {
      type: TransactionType.INCOME,
      label: "Receita",
      activeClass: "bg-green-500 border-green-700 text-green-700 font-medium",
      inactiveClass: "bg-transparent border-green-500 text-green-500 hover:bg-green-100"
    },
  ];

  return (
    <fieldset id={id} className="grid grid-cols-2 gap-4"> 
      
      {transactionsTypeButtons.map((item) => ( 
        <button 
         key={item.type}
         type="button"
         onClick={() => onChange(item.type)} 
         className={`flex items-center justify-center border rounded-md py-2 px-4 transaction-all cursor-pointer
          ${value === item.type ? item.activeClass : item.inactiveClass}`}
        >
          {item.label}
        </button>
      ))}
      
    </fieldset>
  )
}

export default TransactionTypeSelector