import { useState, useEffect } from "react";
import { fetchCharacters } from "@/utils/fetchStarWarsData";
import Pagination from "@/components/Starships/Pagination";
import StarshipModal from "@/components/Starships/StarshipModal";

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

const ITEMS_PER_PAGE = 6;

const truncateText = (text: string, maxLength: number) => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + "...";
  }
  return text;
};

const SectionRenderer: React.FC<SectionRendererProps> = ({ minPrice, maxPrice, nameFilter }) => {
  const [starships, setStarships] = useState<Starship[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStarship, setSelectedStarship] = useState<Starship | null>(null); // Para armazenar a nave selecionada

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

  const filteredStarships = starships.filter((starship) => {
    const cost = parseInt(starship.cost_in_credits) || 0;
    return (
      cost >= minPrice &&
      cost <= maxPrice &&
      starship.name.toLowerCase().includes(nameFilter.toLowerCase())
    );
  });

  const totalItems = filteredStarships.length;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentStarships = filteredStarships.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleCardClick = (starship: Starship) => {
    setSelectedStarship(starship);
  };

  const handleCloseModal = () => {
    setSelectedStarship(null);
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 p-4">
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : currentStarships.length > 0 ? (
          currentStarships.map((starship, index) => (
            <div
              key={index}
              className="bg-indigo-950 text-white p-6 rounded-lg cursor-pointer hover:shadow-lg transition-shadow duration-300 border-solid border-2 border-indigo-700 shadow-lg shadow-indigo-500/20"
              onClick={() => handleCardClick(starship)} // Ao clicar no card
            >
              <img src="images/86580.png" className="w-20 mb-4" alt="" />
              <h3 className="text-lg font-bold mb-2 text-indigo-500">{starship.name}</h3>
              <p className="mb-1 flex items-center">
                <img src="images/starship-icon.png" className="w-5 mr-2" alt="" />
                <span className="font-semibold">Model:</span> <span className="text-gray-400 ml-2">{starship.model}</span> 
              </p>
              <p className="mb-1 flex items-center">
                <img src="images/manufacturing-icon.png" className="w-5 mr-2" alt="" />
                <span className="font-semibold">Mfr.:</span> {truncateText(starship.manufacturer, 20)}
              </p>
              <p className="mb-1 flex items-center">
                <img src="images/cost-icon.png" className="w-5 mr-2" alt="" />
                <span className="font-semibold">Cost:</span> {starship.cost_in_credits} credits
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No results found</p>
        )}
      </div>

      {/* Exibe o Modal se uma nave for selecionada */}
      {selectedStarship && (
        <StarshipModal starship={selectedStarship} onClose={handleCloseModal} />
      )}

      {/* Paginação */}
      <Pagination
        currentPage={currentPage}
        totalItems={totalItems}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default SectionRenderer;
