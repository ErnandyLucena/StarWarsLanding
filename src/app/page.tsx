"use client";

import { useState } from "react";
import SectionRenderer from "@/components/Starships/SectionRenderer";
import PriceFilter from "@/components/filters/PriceFilter";
import NameFilter from "@/components/filters/NameFilter";
import ResetButton from "@/components/filters/ResetButton";

export default function Home() {
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(Infinity);
  const [nameFilter, setNameFilter] = useState<string>("");


  const resetFilters = () => {
    setMinPrice(0);
    setMaxPrice(Infinity);
    setNameFilter("");
  };

  return (
    <main className="flex flex-col items-center justify-center bg-indigo-950 min-h-screen relative font-secondary">
      {/* Navbar */}
      <div className="relative flex justify-center items-center  z-10">
        <div className="flex flex-col text-center w-full z-10">
          
        </div>
      </div>

      {/* Section Renderer */}
      <div className="w-full flex flex-col mt-10">
        <div className="flex flex-col sm:flex-row justify-between items-center z-10 p-4">
          {/* Legenda Starships */}
          <div className="text-left mb-10 md:mb-0 flex items-center">
            <div className="flex">
              <img src="images/logo.png" className=" w-20 md:w-16 h-auto object-contain" alt="Logo" />
            </div>
            <div className="ml-8">
              <h1 className="text-2xl md:text-3xl font-bold text-white">Starships Store</h1>
              <p className="text-gray-400 text-sm md:text-lg">Adquira já sua nave da franquia de StarWars</p>
            </div>
          </div>
          {/* Filtros */}
          <div className="flex gap-4 items-center mt-4 md:mt-0">
            <PriceFilter
              minPrice={minPrice}
              maxPrice={maxPrice}
              setMinPrice={setMinPrice}
              setMaxPrice={setMaxPrice}
            />
            <NameFilter nameFilter={nameFilter} setNameFilter={setNameFilter} />
            <div className="mb-4 sm:mt-0">
              <ResetButton resetFilters={resetFilters} />
            </div>
          </div>
        </div>

        <div className="relative z-10 mt-5">
          <SectionRenderer
            minPrice={minPrice}
            maxPrice={maxPrice}
            nameFilter={nameFilter}
          />
        </div>
      </div>
    </main>
  );
}
