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
      <input
        type="text"
        id="nameFilter"
        value={nameFilter}
        onChange={handleInputChange}
        placeholder="Filter by Name" // Placeholder como label dentro do campo de input
        className="w-full bg-indigo-950 p-2 text-white hover:text-white border-solid border-2 border-indigo-500 rounded-xl hover:bg-indigo-900 transition-colors"
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
