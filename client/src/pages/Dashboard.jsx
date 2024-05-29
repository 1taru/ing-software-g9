import React, { useContext } from 'react';
import { UserContext } from '../../context/userContext';
import { Link } from 'react-router-dom';

export const Dashboard = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-800">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800 dark:text-gray-200">¡Hola {user.name}!</h1>

        {user && (
          <div className="flex flex-wrap justify-center">
            {user.accType === 'admin' && (
              <Link to="/register" className="m-2">
                <button className="bg-gray-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Registrar Usuarios
                </button>
              </Link>
            )}

            {user.accType === 'acctype3' && (
              <>
                <button className="m-2 bg-gray-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Gestionar Nuevo Pedido
                </button>
                <button className="m-2 bg-gray-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Ver estado de los pedidos
                </button>
                <button className="m-2 bg-gray-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Alertas
                </button>
              </>
            )}

            {user.accType === 'acctype2' && (
              <>
                <button className="m-2 bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                  Actualizar Inventario
                </button>
                <button className="m-2 bg-gray-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Ver Inventario
                </button>
                <button className="m-2 bg-gray-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Alertas
                </button>
              </>
            )}

            {user.accType === 'acctype1' && (
              <>
                <button className="m-2 bg-gray-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Registrar Cambios en un Pedido
                </button>
                <button className="m-2 bg-gray-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Ver Características de Pedido
                </button>
                <button className="m-2 bg-gray-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Alertas
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};
