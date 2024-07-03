import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const CreateProduct = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ name: '', details: '', materials: [] });
  const [availableMaterials, setAvailableMaterials] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [materialQuantity, setMaterialQuantity] = useState(1);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await axios.get('http://localhost:8000/inventory/getMaterials');
        setAvailableMaterials(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMaterials();
  }, []);

  const addMaterial = () => {
    const material = availableMaterials.find(mat => mat._id === selectedMaterial);
    if (material) {
      setData(prevData => ({
        ...prevData,
        materials: [...prevData.materials, { material: material._id, quantity: materialQuantity }]
      }));
      setSelectedMaterial('');
      setMaterialQuantity(1);
    }
  };

  const createProduct = async (e) => {
    e.preventDefault();
    try {
      const { data: response } = await axios.post('http://localhost:8000/products/createProduct', data);
      if (response.error) {
        toast.error(response.error);
      } else {
        setData({ name: '', details: '', materials: [] });
        toast.success('Producto agregado exitosamente.');
        navigate('/createOrder');
      }
    } catch (error) {
      console.log(error);
      toast.error('Error al agregar el producto.');
    }
  };

  return (
    <form onSubmit={createProduct} className="max-w-sm mx-auto mt-12 flex flex-col w-96 p-6 shadow-lg bg-white dark:bg-slate-900 rounded-md">
      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre del Producto</label>
        <input
          type='text'
          placeholder='Nombre...'
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Detalles</label>
        <textarea
          placeholder='Detalles (Dimensiones, precio, otros...)'
          value={data.details}
          onChange={(e) => setData({ ...data, details: e.target.value })}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>


      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Materiales</label>
        <div className="flex items-center space-x-2">
          <select
            value={selectedMaterial}
            onChange={(e) => setSelectedMaterial(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 flex-grow"
          >
            <option value="">Seleccione un material</option>
            {availableMaterials.map((material) => (
              <option key={material._id} value={material._id}>
                {material.name}
              </option>
            ))}
          </select>
          <input
            type='number'
            min='1'
            value={materialQuantity}
            onChange={(e) => setMaterialQuantity(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-20"
          />
          <button type="button" onClick={addMaterial} className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2.5 py-2.5 dark:bg-lime-800 dark:hover:bg-lime-900 dark:focus:ring-blue-800">
            Agregar
          </button>
        </div>
        <ul className="mt-2">
          {data.materials.map((mat, index) => (
            <li key={index} className="text-sm text-gray-900 dark:text-white">
              {availableMaterials.find(m => m._id === mat.material)?.name} - {mat.quantity}
            </li>
          ))}
        </ul>
      </div>

      <button type='submit' className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-lime-800 dark:hover:bg-lime-900 dark:focus:ring-blue-800">Agregar Producto</button>
    </form>
  );
};

export default CreateProduct;
