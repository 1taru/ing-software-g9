import React from 'react'
import { Link } from 'react-router-dom';

export const NewProduct = () => {
  return (
    <>
    <div className="flex flex-col md:flex-row items-center p-4 gap-4">
      <Link to="/addProduct">
        <button className="bg-lime-900 dark:bg-gray-900 hover:bg-blue-700 dark:hover:bg-green-900 text-white dark:text-lime-600 font-bold py-2 px-4 rounded">
          + Nuevo Producto
        </button>
      </Link>
    </div>
    </>
  )
}
