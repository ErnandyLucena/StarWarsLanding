import { useState } from "react";

interface PriceFilterProps {
  minPrice: number;
  maxPrice: number;
  setMinPrice: (price: number) => void;
  setMaxPrice: (price: number) => void;
}

const PriceFilter: React.FC<PriceFilterProps> = ({ minPrice, maxPrice, setMinPrice, setMaxPrice }) => {
  

  // Função para validar valores
  const validateValue = (value: string, setValue: (price: number) => void) => {
    if (value === "") {
      setValue(Infinity); 
    } else if (Number(value) < 0) {
      setValue(0); 
    } else {
      setValue(Number(value)); 
    }
  };

  return (
    <div className="mb-4 flex gap-4">
      {/* Min Price */}
      <div className="w-1/2">
        <label htmlFor="minPrice" className="sr-only">
          Min Price (in credits)
        </label>
        <input
          type="number"
          id="minPrice"
          value={minPrice === 0 ? "" : minPrice} // Permite o campo ficar vazio quando minPrice for 0
          onChange={(e) => validateValue(e.target.value, setMinPrice)}
          placeholder="Min Price (in credits)"
          className="w-full bg-indigo-950 p-2 text-white hover:text-white border-solid border-2 border-indigo-500 rounded-xl hover:bg-indigo-900 transition-colors"
        />
      </div>

      {/* Max Price */}
      <div className="w-1/2">
        <label htmlFor="maxPrice" className="sr-only">
          Max Price (in credits)
        </label>
        <input
          type="number"
          id="maxPrice"
          value={maxPrice === 0 ? "" : maxPrice} // pra exibir o placeholder quando vazio
          onChange={(e) => validateValue(e.target.value, setMaxPrice)}
          placeholder="Max Price (in credits)"
          className="w-full bg-indigo-950 p-2 text-white hover:text-white border-solid border-2 border-indigo-500 rounded-xl hover:bg-indigo-900 transition-colors"
        />
      </div>
    </div>
  );
};

export default PriceFilter;
