import React from 'react'
import { Link } from 'react-router-dom';

export const NewProduct = () => {
  return (
    <>
      <div className="flex items-center justify-start p-2 gap-2">
        <Link to="/addProduct" className="ml-0">
          <button className="bg-lime-900 dark:bg-lime-900 hover:bg-blue-700 dark:hover:bg-green-900 text-white dark:text-gray-200 font-bold py-1 px-2 rounded text-sm">
            + Agregar Nuevo Producto
          </button>
        </Link>
      </div>
    </>
  )
}
