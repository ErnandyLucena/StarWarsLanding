"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import SectionRenderer from "@/components/Starships/SectionRenderer";
import PriceFilter from "@/components/filters/PriceFilter";
import NameFilter from "@/components/filters/NameFilter";

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(Infinity);
  const [nameFilter, setNameFilter] = useState<string>("");

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };

  return (
    <main className=" items-center justify-center min-h-screen  bg-gray-900">
      {/* Navbar */}
      <div className="p-10">
        <Navbar onSectionChange={handleSectionChange} />
      </div>

      <div className="flex justify-center items-center mt-32">
        <div className="flex justify-center flex-col text-center w-full">
          <h1 className="text-4xl font-bold w-full sm:w-1/2 mx-auto">
            Explore, descubra e conecte-se com tudo o que você ama sobre o universo Star Wars!
          </h1>
          <p className="mt-5 w-full sm:w-1/2 mx-auto text-gray-400">
            Encontre informações sobre personagens, planetas, naves e muito mais. Embarque nessa jornada e se torne parte da galáxia!
          </p>
        </div>
      </div>

      {/* Section Renderer */}
      <div className="mt-44 w-full flex justify-center flex-col">
        <div className="flex flex-col justify-center text-center">
          <h1 className="text-center text-3xl font-bold">Starships Store</h1>
          <p className="text-gray-400">Adquira já sua nave da franquia de StarWars</p>
        </div>
        <div className="mt-10 flex sm:flex-row justify-end gap-4 p-4">
          {/* Filtros */}
          <PriceFilter minPrice={minPrice} maxPrice={maxPrice} setMinPrice={setMinPrice} setMaxPrice={setMaxPrice} />
          <NameFilter nameFilter={nameFilter} setNameFilter={setNameFilter} />
        </div>
        <div className="">
          <SectionRenderer minPrice={minPrice} maxPrice={maxPrice} nameFilter={nameFilter} />
        </div>
      </div>
    </main>
  );
}
