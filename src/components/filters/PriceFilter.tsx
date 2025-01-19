import { useState } from "react";

interface PriceFilterProps {
  minPrice: number;
  maxPrice: number;
  setMinPrice: (price: number) => void;
  setMaxPrice: (price: number) => void;
}

const PriceFilter: React.FC<PriceFilterProps> = ({ minPrice, maxPrice, setMinPrice, setMaxPrice }) => {

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
          value={minPrice || ""} // Remove leading zero by ensuring it's treated as a number
          onChange={(e) => setMinPrice(Number(e.target.value))}
          placeholder="Min Price (in credits)" // Placeholder text as label inside input
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
          value={maxPrice || ""} // Remove leading zero by ensuring it's treated as a number
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          placeholder="Max Price (in credits)" // Placeholder text as label inside input
          className="w-full bg-indigo-950 p-2 text-white hover:text-white border-solid border-2 border-indigo-500 rounded-xl hover:bg-indigo-900 transition-colors"
        />
      </div>
    </div>
  );
};

export default PriceFilter;
