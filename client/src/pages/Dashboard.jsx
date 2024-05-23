
import React, { useContext } from 'react'
import { UserContext } from '../../context/userContext'
import { Link } from 'react-router-dom';

export const Dashboard = () => {
    const {user} = useContext(UserContext); //para llamar al usuario logeado.
    console.log(user);
  return (
    <>
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-800">
      <h1 className="text-4xl font bold mb-4 text-center text-gray-800 dark:text-gray-200">Hola {user.name}!</h1>
      {(user && user.accType=='admin') && (
        <Link to="/register">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Registrar Usuarios
        </button>
      </Link>
      ) }
    </div>
    </>
  )
}
