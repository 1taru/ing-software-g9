import React from 'react'
import { Link } from 'react-router-dom';

export const NewOrder = () => {
  return (
    <>
    <Link to="/register" className="m-2">
        <div className="flex flex-col md:flex-row items-center p-4 gap-4">
          <button className="bg-lime-900 dark:bg-gray-900 hover:bg-blue-700 text-white dark:text-lime-600 font-bold py-2 px-4 rounded">
            + Nuevo Pedido.
          </button>
        </div>
    </Link>
    </>
  )
}
