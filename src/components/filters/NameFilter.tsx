import { useState, useEffect } from "react";
import { fetchCharacters } from "@/utils/fetchStarWarsData"; // Importe a função

interface NameFilterProps {
  nameFilter: string;
  setNameFilter: (name: string) => void;
}

const NameFilter: React.FC<NameFilterProps> = ({ nameFilter, setNameFilter }) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (nameFilter.length > 1) { // Começa a buscar quando tiver mais de 2 caracteres
      setLoading(true);
      const fetchStarships = async () => {
        try {
          const { starships } = await fetchCharacters(); // Chama a função para pegar os dados
          const filteredStarships = starships.filter((starship) =>
            starship.name.toLowerCase().includes(nameFilter.toLowerCase())
          );
          setSuggestions(filteredStarships.map(starship => starship.name)); // Armazena as sugestões
        } catch (error) {
          console.error("Erro ao buscar naves:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchStarships();
    } else {
      setSuggestions([]); // Limpa as sugestões se o filtro for menor que 3 caracteres
    }
  }, [nameFilter]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameFilter(e.target.value);
  };

  const handleSuggestionClick = (name: string) => {
    setNameFilter(name);
    setSuggestions([]); // Limpa as sugestões após a seleção
  };

  return (
    <div className="relative mb-4">
      <label htmlFor="nameFilter" className="block text-sm font-semibold mb-2">
        Filter by Name
      </label>
      <input
        type="text"
        id="nameFilter"
        value={nameFilter}
        onChange={handleInputChange}
        className="w-full p-2 bg-gray-700 text-white rounded-lg"
      />
      {loading && <p className="text-white mt-2">Loading...</p>}
      {/* Exibindo as sugestões de autocomplete */}
      {suggestions.length > 0 && !loading && (
        <ul className="absolute bg-gray-800 text-white w-full mt-2 rounded-lg shadow-lg max-h-40 overflow-y-auto">
          {suggestions.map((name, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(name)}
              className="p-2 hover:bg-gray-600 cursor-pointer"
            >
              {name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NameFilter;
