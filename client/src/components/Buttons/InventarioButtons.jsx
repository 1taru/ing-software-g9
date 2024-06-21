// PedidoButtons.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export const InventarioButtons = () => {
  return (
    <>
      <Link to="/inventario" className="m-2">
      <div className="flex flex-col md:flex-row items-center justify-center gap-4">
      <button className="w-full bg-lime-900 dark:bg-gray-900 hover:bg-lime-900 text-white dark:text-lime-600 font-bold py-2 px-4 rounded">
            Ver inventario
          </button>
        </div>
      </Link>

      <div className="flex flex-col md:flex-row items-center justify-center gap-4">
        <button className="w-full bg-lime-900 dark:bg-gray-900 hover:bg-lime-900 text-white dark:text-lime-600 font-bold py-2 px-4 rounded">
          Alertas
        </button>
      </div>
    </>
  );
};

