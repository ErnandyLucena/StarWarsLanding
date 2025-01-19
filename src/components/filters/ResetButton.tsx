interface ResetButtonProps {
    resetFilters: () => void;
  }
  
  const ResetButton: React.FC<ResetButtonProps> = ({ resetFilters }) => {
    return (
      <button
        onClick={resetFilters}
        className="px-4 h-10 text-red-400 hover:text-white border-solid border-2 border-red-500 rounded-xl hover:bg-red-800 transition-colors"
      >
        Resetar Filtros
      </button>
    );
  };
  
  export default ResetButton;
  