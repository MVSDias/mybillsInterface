import { ChevronLeft, ChevronRight } from "lucide-react";

interface MonthYearSelectProps {
  month: number;
  year: number;
  onChangeMonth: (month: number) => void;
  onChangeYear: (year: number) => void;
}

const MonthYearSelect = ({ month, year, onChangeMonth, onChangeYear }: MonthYearSelectProps) => {
  const monthNames: readonly string[] = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const currentYear = new Date().getFullYear();
  const rangeYears: number[] = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i);

  const handleNextMonth = (): void => {
    if(month === 12){
      onChangeMonth(1);
      onChangeYear(year + 1);
      
    } else {
      onChangeMonth(month + 1); 
    }
  };

  const handlePrevMonth = (): void => {
    if(month === 1){
      onChangeMonth(12);
      onChangeYear(year -1); 


    } else {
        onChangeMonth(month -1); 
    }
  };

  
  return (
    <div className="flex items-center justify-between bg-gray-900 rounded-lg p-3 border border-gray-700">
      <button
        type="button"
        className="p-2 rounded-full hover:bg-gray-800 hover: text-primary-500 transition-colors cursor-pointer"
        aria-label="Mês Anterior"
        onClick={handlePrevMonth}
      >
        <ChevronLeft />
      </button>

      <div className="flex items-center gap-4">
        <label htmlFor="month-select" className="sr-only">
          Selecionar Mês
        </label>
        <select
          id="month-select"
          value={month}
          onChange={(e) => onChangeMonth(Number(e.target.value))}
          className="bg-gray-800 border-gray-800 rounded-md py-1 px-3 text-sm font-medium text-gray-100 focus:outline-none focus:ring-1 focus:ring-primary-500 cursor-pointer"
        >
          {monthNames.map((name, index) => (
            <option key={name} value={index + 1}>
              {name}
            </option>
          ))}
        </select>

        <label htmlFor="year-select" className="sr-only">
          Selecionar Ano
        </label>
        <select
          id="year-select"
          value={year}
          onChange={(e) => onChangeYear(Number(e.target.value))}
          className="bg-gray-800 border-gray-800 rounded-md py-1 px-3 text-sm font-medium text-gray-100 focus:outline-none focus:ring-1 focus:ring-primary-500 cursor-pointer"
        >
          {rangeYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <button
        type="button"
        className="p-2 rounded-full hover:bg-gray-800 hover: text-primary-500 transition-colors cursor-pointer"
        aria-label="Próximo Anterior"
        onClick={handleNextMonth}
      >
        <ChevronRight />
      </button>
    </div>
  );
};

export default MonthYearSelect;
