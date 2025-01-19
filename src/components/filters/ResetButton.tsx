interface ResetButtonProps {
    resetFilters: () => void;
  }
  
  const ResetButton: React.FC<ResetButtonProps> = ({ resetFilters }) => {
    return (
      <button
        onClick={resetFilters}
        className="px-4 h-10 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
      >
        Resetar Filtros
      </button>
    );
  };
  
  export default ResetButton;
  