// PedidoButtons.jsx
import React from 'react';

const inventarioButtons = () => {
  return (
    <>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Gestionar Nuevo Pedido
      </button>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Ver estado de los pedidos.
      </button>
    </>
  );
};

export default PedidoButtons;
