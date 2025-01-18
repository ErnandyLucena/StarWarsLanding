import { useState } from "react";

interface PriceFilterProps {
  minPrice: number;
  maxPrice: number;
  setMinPrice: (price: number) => void;
  setMaxPrice: (price: number) => void;
}

const PriceFilter: React.FC<PriceFilterProps> = ({ minPrice, maxPrice, setMinPrice, setMaxPrice }) => {
  const handleIncrementMin = () => setMinPrice(minPrice + 1000);
  const handleDecrementMin = () => setMinPrice(minPrice - 1000);

  const handleIncrementMax = () => setMaxPrice(maxPrice + 1000);
  const handleDecrementMax = () => setMaxPrice(maxPrice - 1000);

  return (
    <div className="mb-4 flex gap-4">
      {/* Min Price */}
      <div className="w-1/2">
        <label htmlFor="minPrice" className="block text-sm font-semibold mb-2">
          Min Price (in credits)
        </label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            id="minPrice"
            value={minPrice.toString()} // Remove leading zero by ensuring it's treated as a number
            onChange={(e) => setMinPrice(Number(e.target.value))}
            className="w-full p-2 bg-gray-700 text-white rounded-lg"
          />
        </div>
      </div>

      {/* Max Price */}
      <div className="w-1/2">
        <label htmlFor="maxPrice" className="block text-sm font-semibold mb-2">
          Max Price (in credits)
        </label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            id="maxPrice"
            value={maxPrice.toString()} // Remove leading zero by ensuring it's treated as a number
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full p-2 bg-gray-700 text-white rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default PriceFilter;
