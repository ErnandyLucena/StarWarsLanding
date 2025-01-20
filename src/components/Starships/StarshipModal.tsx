import React from "react";

interface Starship {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
}

interface StarshipModalProps {
  starship: Starship | null;
  onClose: () => void;
}

const StarshipModal: React.FC<StarshipModalProps> = ({ starship, onClose }) => {
  if (!starship) return null; 

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-80 flex justify-center items-center z-50">
      <div className="bg-indigo-950 p-10 text-white rounded-lg max-w-lg w-full border-solid border-2 border-indigo-700 shadow-lg shadow-indigo-500/20 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-300 hover:text-gray-100 transition duration-200"
        >
          <img src="images/x.png" className="w-8" alt="" />
        </button>
        <div className="flex items-center mb-4">
          <img
            src="images/86580.png"
            className="w-12 mr-4"
            alt="Starship Icon"
          />
          <h3 className="text-2xl font-bold text-indigo-500">{starship.name}</h3>
        </div>
        <p className="mb-2 flex items-center mt-8">
          <img src="images/starship-icon.png" className="w-5 mr-2" alt="Model Icon" />
          <span className="font-semibold">Model:</span>
          <span className="text-gray-400 ml-2">{starship.model}</span>
        </p>
        <p className="mb-2 flex items-center">
          <img src="images/manufacturing-icon.png" className="w-5 mr-2" alt="Manufacturer Icon" />
          <span className="font-semibold">Manufacturer:</span>
          <span className="text-gray-400 ml-2">{starship.manufacturer}</span>
        </p>
        <p className="mb-2 flex items-center">
          <img src="images/cost-icon.png" className="w-5 mr-2" alt="Cost Icon" />
          <span className="font-semibold">Cost:</span>
          <span className="text-gray-400 ml-2">{starship.cost_in_credits} credits</span>
        </p>
      </div>
    </div>
  );
};

export default StarshipModal;
