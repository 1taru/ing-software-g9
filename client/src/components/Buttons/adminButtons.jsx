// PedidoButtons.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export const AdminButtons = () => {
  return (
    <>

      <Link to="/register" className="m-2">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <button className="bg-lime-900 dark:bg-gray-900 hover:bg-lime-900 text-white dark:text-grey-600 font-bold py-2 px-4 rounded">
            Registrar nuevo usuario.
          </button>
        </div>
      </Link>

      <Link to="/allUsers" className="m-2">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <button className="bg-lime-900 dark:bg-gray-900 hover:bg-lime-900 text-white dark:text-grey-600 font-bold py-2 px-4 rounded">
            Ver todos los usuarios.
          </button>
        </div>
      </Link>

      
    </>
  );
};

