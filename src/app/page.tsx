"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import SectionRenderer from "@/components/Starships/SectionRenderer";
import PriceFilter from "@/components/filters/PriceFilter";
import NameFilter from "@/components/filters/NameFilter";
import ResetButton from "@/components/filters/ResetButton";

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(Infinity);
  const [nameFilter, setNameFilter] = useState<string>("");

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };

  const resetFilters = () => {
    setMinPrice(0);
    setMaxPrice(Infinity);
    setNameFilter("");
  };

  return (
    <main className="items-center justify-center min-h-screen bg-indigo-950 relative">
      {/* Navbar */}
      <div className="p-10 z-20 relative">
        <Navbar onSectionChange={handleSectionChange} />
      </div>

      <div className="relative flex justify-center items-center mt-32 z-10 h-screen">
        <div className="relative flex justify-center flex-col text-center w-full z-10">
          <img
            src="images/vader.png"
            alt="Darth Vader"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 opacity-20 h-auto z-0 object-contain"
          />
          <h1 className="text-4xl font-bold w-full sm:w-1/2 mx-auto z-10 text-white">
            Explore, descubra e conecte-se com tudo o que você ama sobre o universo Star Wars!
          </h1>
          <p className="mt-5 w-full sm:w-1/2 mx-auto text-gray-200 z-10">
            Encontre informações sobre personagens, planetas, naves e muito mais. Embarque nessa jornada e se torne parte da galáxia!
          </p>
        </div>
      </div>

      {/* Section Renderer */}
      <div className="mt-2 w-full flex justify-center flex-col">
        <div className="flex flex-col sm:flex-row justify-between items-center z-10 mt-4 p-4">
          {/* Legenda Starships */}
          <div className="text-left">
            <h1 className="text-3xl font-bold">Starships Store</h1>
            <p className="text-gray-400">Adquira já sua nave da franquia de StarWars</p>
          </div>

          {/* Filtros */}
          <div className=" sm:mt-0 flex gap-4 items-center">
            <PriceFilter minPrice={minPrice} maxPrice={maxPrice} setMinPrice={setMinPrice} setMaxPrice={setMaxPrice} />
            <NameFilter nameFilter={nameFilter} setNameFilter={setNameFilter} />
            <div className="mb-4 sm:mt-0">
              <ResetButton resetFilters={resetFilters} />
            </div>
          </div>
        </div>

        <div className="relative z-10 mt-1">
          <SectionRenderer minPrice={minPrice} maxPrice={maxPrice} nameFilter={nameFilter} />
        </div>
      </div>
    </main>
  );
}
