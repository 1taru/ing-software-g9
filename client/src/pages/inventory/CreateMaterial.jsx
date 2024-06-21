import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const CreateMaterial = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ name: '', price: '', quantity: '', location: ''});
  
  const createMaterial = async (e) => {
    e.preventDefault();
    const { name, price, quantity, location } = data;
    try {
      const { data: response } = await axios.post('http://localhost:8000/inventory/createMaterial', { name, price, quantity, location });
      if (response.error) {
        toast.error(response.error);
      } else {
        setData({ name: '', price: '', quantity: '', location: ''});
        toast.success('Material agregado exitosamente.');
        navigate('/createMaterial');
      }
    } catch (error) {
      console.log(error);
      toast.error('Error al agregar el Material.');
    }
  };

  return (
    <form onSubmit={createMaterial} className="max-w-sm mx-auto mt-12 flex flex-col w-96 p-6 shadow-lg bg-white dark:bg-slate-900 rounded-md">
      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre del Material</label>
        <input
          type='text'
          placeholder='Clavo'
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Precio</label>
        <input
          type='number'
          placeholder='100'
          value={data.price}
          onChange={(e) => setData({ ...data, price: e.target.value })}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cantidad</label>
        <input
          type='number'
          placeholder='5000'
          value={data.quantity}
          onChange={(e) => setData({ ...data, quantity: e.target.value })}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ubicación</label>
        <textarea
          placeholder='Bodega 1'
          value={data.location}
          onChange={(e) => setData({ ...data, location: e.target.value })}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <button type='submit' className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-lime-800 dark:hover:bg-lime-900 dark:focus:ring-blue-800">Agregar Material</button>
    </form>
  );
};

export default CreateMaterial;
