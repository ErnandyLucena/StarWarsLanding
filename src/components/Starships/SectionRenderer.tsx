import { useState, useEffect } from "react";
import { fetchCharacters } from "@/utils/fetchStarWarsData";

interface Starship {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  image?: string;
}

interface SectionRendererProps {
  minPrice: number;
  maxPrice: number;
  nameFilter: string;
}

const SectionRenderer: React.FC<SectionRendererProps> = ({ minPrice, maxPrice, nameFilter }) => {
  const [starships, setStarships] = useState<Starship[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchCharacters().then(({ starships }) => {
      const starshipsWithImages = starships.map((starship: Starship, index: number) => ({
        ...starship,
        image: `https://starwars-visualguide.com/assets/img/starships/${index + 1}.jpg`,
      }));
      setStarships(starshipsWithImages);
      setLoading(false);
    });
  }, []);

  // Filtro de preços e nome
  const filteredStarships = starships.filter((starship) => {
    const cost = parseInt(starship.cost_in_credits) || 0; // Tratar valores inválidos de preço
    return (
      cost >= minPrice &&
      cost <= maxPrice &&
      starship.name.toLowerCase().includes(nameFilter.toLowerCase())
    );
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 p-4">
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        filteredStarships.map((starship, index) => (
          <div
            key={index}
            className="bg-gray-800 text-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            {starship.image && (
              <img
                src={starship.image}
                alt={starship.name}
                className="h-16 object-cover rounded-t-lg mb-4"
              />
            )}
            <h3 className="text-lg font-bold mb-2 text-indigo-500">{starship.name}</h3>
            <p className="mb-1">
              <span className="font-semibold">Model:</span> {starship.model}
            </p>
            <p className="mb-1">
              <span className="font-semibold">Manufacturer:</span> {starship.manufacturer}
            </p>
            <p>
              <span className="font-semibold">Cost:</span> {starship.cost_in_credits} credits
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default SectionRenderer;
