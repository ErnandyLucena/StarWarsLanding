// src/app/SectionRenderer.tsx

import { useState, useEffect } from "react";
import { fetchCharacters } from "@/utils/fetchStarWarsData";

interface Character {
  name: string;
}

interface Planet {
  name: string;
  climate: string;
  terrain: string;
  population: string;
}

interface Starship {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
}

const SectionRenderer = ({ activeSection }: { activeSection: string }) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [starships, setStarships] = useState<Starship[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (activeSection === "people") {
      setLoading(true);
      fetchCharacters().then(({ characters, planets, starships }) => {
        setCharacters(characters);
        setPlanets(planets);
        setStarships(starships);
        setLoading(false);
      });
    }
  }, [activeSection]);

  if (activeSection === "home") {
    return <h2 className="text-3xl text-black">Welcome to Star Wars Search!</h2>;
  }

  if (activeSection === "people") {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-4 text-black">Star Wars Characters</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul className="list-disc list-inside text-black">
            {characters.map((character, index) => (
              <li className="text-black" key={index}>{character.name}</li>
            ))}
          </ul>
        )}
        <h2 className="text-2xl font-bold mt-4 text-black">Planets</h2>
        <ul className="list-disc list-inside text-black">
          {planets.map((planet, index) => (
            <li key={index}>
              <h3>{planet.name}</h3>
              <p>Climate: {planet.climate}</p>
              <p>Terrain: {planet.terrain}</p>
              <p>Population: {planet.population}</p>
            </li>
          ))}
        </ul>
        <h2 className="text-2xl font-bold mt-4 text-black">Starships</h2>
        <ul className="list-disc list-inside text-black">
          {starships.map((starship, index) => (
            <li key={index}>
              <h3>{starship.name}</h3>
              <p>Model: {starship.model}</p>
              <p>Manufacturer: {starship.manufacturer}</p>
              <p>Cost: {starship.cost_in_credits} credits</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return null;
};

export default SectionRenderer;
