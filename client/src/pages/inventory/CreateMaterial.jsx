import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const CreateMaterial = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: '',
    doorType: '',
    category: '',
    materialType: '',
    height: '',
    width: '',
    length: '',
    quantity: '',
    price: '',
    location: ''
  });

  const createMaterial = async (e) => {
    e.preventDefault();
    const { name, doorType, category, materialType, height, width, length, quantity, price, location } = data;
    try {
      const { data: response } = await axios.post('http://localhost:8000/inventory/createMaterial', { name, doorType, category, materialType, height, width, length, quantity, price, location });
      if (response.error) {
        toast.error(response.error);
      } else {
        setData({
          name: '',
          doorType: '',
          category: '',
          materialType: '',
          height: '',
          width: '',
          length: '',
          quantity: '',
          price: '',
          location: ''
        });
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
          placeholder='Material'
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tipo de Puerta</label>
        <select
          value={data.doorType}
          onChange={(e) => setData({ ...data, doorType: e.target.value })}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value=''>Seleccione</option>
          <option value='F60'>F60</option>
          <option value='F30'>F30</option>
          <option value='MDF'>MDF</option>
          <option value='TERCIADO'>TERCIADO</option>
        </select>
      </div>
      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Categoría</label>
        <select
          value={data.category}
          onChange={(e) => setData({ ...data, category: e.target.value })}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option value=''>Seleccione</option>
          <option value='Plancha'>Plancha</option>
          <option value='Bastidor'>Bastidor</option>
          <option value='Relleno'>Relleno</option>
        </select>
      </div>
      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tipo de Material</label>
        <input
          type='text'
          placeholder='Tipo Material'
          value={data.materialType}
          onChange={(e) => setData({ ...data, materialType: e.target.value })}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Espesor</label>
        <input
          type='number'
          min='1'
          placeholder='Espesor de material (Milimetros)'
          value={data.height}
          onChange={(e) => {
            const value = e.target.value;
            const newValue = value === '' ? '' : Number(value);
            if (newValue === '' || newValue >= 0) {
              setData({ ...data, height: newValue });
            } else {
              setData({ ...data, height: 0 });
            }
          }}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ancho</label>
        <input
          type='number'
          min='1'
          placeholder='Anchura de material (Milimetros)'
          value={data.width}
          onChange={(e) => {
            const value = e.target.value;
            const newValue = value === '' ? '' : Number(value);
            if (newValue === '' || newValue >= 0) {
              setData({ ...data, width: newValue });
            } else {
              setData({ ...data, width: 0 });
            }
          }}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Largo</label>
        <input
          type='number'
          min='1'
          placeholder='Largo de material (Milimetros)'
          value={data.length}
          onChange={(e) => {
            const value = e.target.value;
            const newValue = value === '' ? '' : Number(value);
            if (newValue === '' || newValue >= 0) {
              setData({ ...data, length: newValue });
            } else {
              setData({ ...data, length: 0 });
            }
          }}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cantidad</label>
        <input
          type='number'
          min='1'
          placeholder='Cantidad'
          value={data.quantity}
          onChange={(e) => {
            const value = e.target.value;
            const newValue = value === '' ? '' : Number(value);
            if (newValue === '' || newValue >= 0) {
              setData({ ...data, quantity: newValue });
            } else {
              setData({ ...data, quantity: 0 });
            }
          }}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Precio</label>
        <input
          type='number'
          min='1'
          placeholder='Precio de producto'
          value={data.price}
          onChange={(e) => {
            const value = e.target.value;
            const newValue = value === '' ? '' : Number(value);
            if (newValue === '' || newValue >= 0) {
              setData({ ...data, price: newValue });
            } else {
              setData({ ...data, price: 0 });
            }
          }}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      
      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ubicación</label>
        <select
          value={data.location}
          onChange={(e) => setData({ ...data, location: e.target.value })}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option value=''>Sin ubicacion</option>
          <option value='Bodega 1'>Bodega 1</option>
          <option value='Bodega 2'>Bodega 2</option>
          <option value='Bodega 3'>Bodega 3</option>
        </select>
      </div>
      <button type='submit' className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-lime-800 dark:hover:bg-lime-900 dark:focus:ring-blue-800">Agregar Material</button>
    </form>
  );
};

export default CreateMaterial;
