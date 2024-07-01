import React from "react";

const DetailsButton = ({ isExpanded, toggleDetails, materialId }) => {
  return (
    <button
      onClick={() => toggleDetails(materialId)}
      className="mt-2 bg-lime-900 hover:bg-lime-700 text-white dark:text-gray-200 font-bold py-1 px-2 rounded text-xs"
    >
      {isExpanded ? "Ocultar detalles" : "Ver detalles"}
    </button>
  );
};

export default DetailsButton;
