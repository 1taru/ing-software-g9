// PedidoButtons.jsx
import React from 'react';

export const LogisticaButtons = () => {
  return (
    <>

      <div className="flex flex-col md:flex-row items-center gap-4">
        <button className="bg-lime-900 dark:bg-gray-900 hover:bg-blue-700 text-white dark:text-lime-600 font-bold py-2 px-4 rounded">
          Ver estado de los pedidos.
        </button>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-4">
        <button className="bg-lime-900 dark:bg-gray-900 hover:bg-blue-700 text-white dark:text-lime-600 font-bold py-2 px-4 rounded">
          Gestionar Nuevo Pedido
        </button>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-4">
        <button className="bg-lime-900 dark:bg-gray-900 hover:bg-blue-700 text-white dark:text-lime-600 font-bold py-2 px-4 rounded">
          Alertas
        </button>
      </div>
      
    </>
  );
};

