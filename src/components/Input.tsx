import { useId, type InputHTMLAttributes, type ReactNode } from "react";


interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
  fullwidth?: boolean;
  icon?: ReactNode;
  label?: string;
  error?: string;
  id?: string;

}

const Input = ({ icon, label, error, fullwidth, id, className, ...rest}: InputProps) => {

  const generateId = useId();
  const inputId = generateId || id; 
  


  return (
    <div 
      className={`${fullwidth ? "w-full" : ""} mb-4`}>
      {label && (
        <label htmlFor={inputId} className="block txt-sm font-medium text-gray-50 mb-2">
          {label}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <div className="absolute bottom-0 top-5 left-0 pl-3 flex items-center cursor-pointertext-gray-400"> 
         
            {icon}
          </div>
        )}
      </div>
    
      <input 
        id={inputId}
        className={`block w-full rounded-xl border ${error ? 'border-red-700' : 'border-gray-700'}
         bg-gray-800 px-4 py-3 text-sm text-gray-50 transition-all focus:outline-none focus:ring-2
        ${error ? "focus:border-red-700 focus:ring-red-700/2" : "focus:border-primary-500 focus:ring-primary-500/2"}
        ${icon ? "pl-10" : ""}
        ${className}               
        `}
        {...rest} 
             
      />

      {error && (
        <p className="mt-1 text-sm text-red-700">{error}</p>
      )}
    </div>
  )
}

export default Input;