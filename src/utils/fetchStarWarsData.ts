// src/utils/fetchStarWarsData.ts

const API_BASE_URL = "https://swapi.dev/api";

interface StarWarsCharacter {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
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

export const fetchCharacters = async (page = 1): Promise<{ characters: StarWarsCharacter[]; planets: Planet[]; starships: Starship[] }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/people/?page=${page}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || "Failed to fetch Star Wars characters");
    }

    // Obter planetas e naves
    const planets = await Promise.all(
      data.results.map(async (character: StarWarsCharacter) => {
        const homeworldResponse = await fetch(character.homeworld);
        const homeworldData = await homeworldResponse.json();
        return homeworldData;
      })
    );

    const starships = await Promise.all(
      data.results.map(async (character: StarWarsCharacter) => {
        const starshipPromises = character.starships.map(async (url) => {
          const response = await fetch(url);
          return response.json();
        });
        return Promise.all(starshipPromises);
      })
    );

    return { characters: data.results, planets, starships: starships.flat() };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { characters: [], planets: [], starships: [] };
  }
};
