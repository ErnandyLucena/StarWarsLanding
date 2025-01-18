import { useState } from "react";

interface NameFilterProps {
  nameFilter: string;
  setNameFilter: (name: string) => void;
}

const NameFilter: React.FC<NameFilterProps> = ({ nameFilter, setNameFilter }) => {
  return (
    <div className="mb-4">
      <label htmlFor="nameFilter" className="block text-sm font-semibold mb-2">
        Filter by Name
      </label>
      <input
        type="text"
        id="nameFilter"
        value={nameFilter}
        onChange={(e) => setNameFilter(e.target.value)}
        className="w-full p-2 bg-gray-700 text-white rounded-lg"
      />
    </div>
  );
};

export default NameFilter;
