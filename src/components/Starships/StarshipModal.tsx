import React from "react";

interface Starship {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  // Outros campos que você quiser exibir no modal
}

interface StarshipModalProps {
  starship: Starship | null;
  onClose: () => void;
}

const StarshipModal: React.FC<StarshipModalProps> = ({ starship, onClose }) => {
  if (!starship) return null; // Não renderiza se não houver dados

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-lg w-full shadow-lg">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
          X
        </button>
        <h3 className="text-2xl font-bold mb-4 text-indigo-500">{starship.name}</h3>
        <p className="mb-2"><strong>Model:</strong> {starship.model}</p>
        <p className="mb-2"><strong>Manufacturer:</strong> {starship.manufacturer}</p>
        <p className="mb-2"><strong>Cost:</strong> {starship.cost_in_credits} credits</p>
        {/* Outros detalhes podem ser adicionados aqui */}
      </div>
    </div>
  );
};

export default StarshipModal;
