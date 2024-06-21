// PedidoButtons.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export const LogisticaButtons = () => {
  return (
    <>
      <Link to="/pedidos" className="m-2">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <button className="bg-lime-900 dark:bg-gray-900 hover:bg-blue-700 text-white dark:text-lime-600 font-bold py-2 px-4 rounded">
            Acceder a los pedidos.
          </button>
        </div>
      </Link>

      <Link to="/createOrder" className="m-2">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <button className="bg-lime-900 dark:bg-gray-900 hover:bg-blue-700 text-white dark:text-lime-600 font-bold py-2 px-4 rounded">
            Gestionar nuevo pedido.
          </button>
        </div>
      </Link>

      <div className="flex flex-col md:flex-row items-center gap-4">
        <button className="bg-lime-900 dark:bg-gray-900 hover:bg-blue-700 text-white dark:text-lime-600 font-bold py-2 px-4 rounded">
          Alertas
        </button>
      </div>
    </>
  );
};

