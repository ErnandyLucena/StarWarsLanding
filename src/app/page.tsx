"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import SectionRenderer from "@/components/SectionRenderer";

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");

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
    <p className="mt-5 w-full sm:w-1/2 mx-auto">
      Encontre informações sobre personagens, planetas, naves e muito mais. Embarque nessa jornada e se torne parte da galáxia!
    </p>
  </div>
</div>

      {/* Section Renderer */}
      <div className="mt-6 w-full max-w-4xl">
        <SectionRenderer activeSection={activeSection} />
      </div>
    </main>
  );
}
