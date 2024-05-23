import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ name: '', username: '', password: '', accType: 'acctype1' });
  const [showPassword, setShowPassword] = useState(false);
  
  const registerUser = async (e) => {
    e.preventDefault();
    const { name, username, password, accType } = data;
    try {
      const { data } = await axios.post('/register', { name, username, password, accType });
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({});
        toast.success('Registro Exitoso.');
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={registerUser} className="max-w-sm mx-auto mt-12 flex flex-col w-96 p-6 shadow-lg bg-white dark:bg-slate-900 rounded-md">
      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
        <input
          type='text'
          placeholder='Nombre...'
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre de Usuario</label>
        <input
          type='text'
          placeholder='Nombre de usuario...'
          value={data.username}
          onChange={(e) => setData({ ...data, username: e.target.value })}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder='Contraseña...'
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-600 dark:text-gray-400"
          >
            {showPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" stroke="currentColor" fill="none">
                <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path d="M2.458 12C3.732 7.943 7.262 5 12 5c4.738 0 8.268 2.943 9.542 7-.373 1.358-1.08 2.587-2.013 3.557M15 12a3 3 0 01-4.243 2.829M9.172 9.172a4 4 0 015.656 0m3.05-1.515a9.964 9.964 0 01-3.793 2.343M12 3v.01M3.05 9.515a9.964 9.964 0 013.793-2.343M9.172 9.172a4 4 0 00-5.656 0M12 3c-1.684 0-3.278.268-4.752.758" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" stroke="currentColor" fill="none">
                <path d="M15 12a3 3 0 01-6 0 3 3 0 016 0z" />
                <path d="M2.458 12C3.732 7.943 7.262 5 12 5c4.738 0 8.268 2.943 9.542 7-.373 1.358-1.08 2.587-2.013 3.557M15 12a3 3 0 01-4.243 2.829M9.172 9.172a4 4 0 015.656 0m3.05-1.515a9.964 9.964 0 01-3.793 2.343M12 3v.01M3.05 9.515a9.964 9.964 0 013.793-2.343M9.172 9.172a4 4 0 00-5.656 0M12 3c-1.684 0-3.278.268-4.752.758" />
              </svg>
            )}
          </button>
        </div>
      </div>
      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tipo de Cuenta</label>
        <select
          value={data.accType}
          onChange={(e) => setData({ ...data, accType: e.target.value })}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="acctype1">AccType 1</option>
          <option value="acctype2">AccType 2</option>
          <option value="acctype3">AccType 3</option>
        </select>
      </div>
      <button type='submit' className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Registrar</button>
    </form>
  );
};
