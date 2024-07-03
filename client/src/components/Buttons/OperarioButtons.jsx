// PedidoButtons.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export const OperarioButtons = () => {
  return (
    <>
  <Link to="/OrderModificar">
    <div className="flex flex-col md:flex-row items-center justify-center gap-4">
      <button className="w-full bg-lime-900 dark:bg-gray-900 hover:bg-lime-900 text-white dark:text-lime-600 font-bold py-2 px-4 rounded">
        Registrar cambios en un pedido
      </button> 
    </div>
  </Link>


  <Link to="/OrderOperario">
    <div className="flex flex-col md:flex-row items-center justify-center gap-4">
      <button className="w-full bg-lime-900 dark:bg-gray-900 hover:bg-lime-900 text-white dark:text-lime-600 font-bold py-2 px-4 rounded">
        Ver Características de pedido.
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

