// CreateOrder.jsx
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { NewProduct } from '../../components/Buttons/NewProduct';
import { UserContext } from '../../../context/userContext';

export const CreateOrder = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [details, setDetails] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/products/getProducts');
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  const handleProductChange = (productId) => {
    setSelectedProducts((prevSelectedProducts) =>
      prevSelectedProducts.includes(productId)
        ? prevSelectedProducts.filter((id) => id !== productId)
        : [...prevSelectedProducts, productId]
    );
  };

  const handleQuantityChange = (productId, quantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: quantity
    }));
  };

  const createOrder = async (e) => {
    e.preventDefault();
    const productsForOrder = selectedProducts.map((productId) => ({
      product: productId,
      quantity: quantities[productId] || 1
    }));

    try {
      const { data: response } = await axios.post('http://localhost:8000/orders/createOrder', {
        name,
        products: productsForOrder,
        details,
        creator: user.name,
        creationDate: new Date().toISOString(),
        status: 'area1'
      });
      if (response.error) {
        toast.error(response.error);
      } else {
        toast.success('Pedido creado exitosamente.');
        navigate('/pedidos');
      }
    } catch (error) {
      console.log(error);
      toast.error('Error al crear el pedido.');
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-6 text-center text-lime-600">Crear Nuevo Pedido</h2>
      <form onSubmit={createOrder} className="max-w-lg mx-auto mt-12 flex flex-col w-96 p-6 shadow-lg bg-white dark:bg-slate-900 rounded-md">
        
        <h4 className="text-sm font-bold text-gray-100">Seleccionar los productos asociados al pedido:</h4>
        {products.map((product) => (
          <div key={product._id} className="mb-4 flex items-center">
            <label className="block text-sm font-medium text-gray-900 dark:text-white mr-4">
              <input
                type="checkbox"
                checked={selectedProducts.includes(product._id)}
                onChange={() => handleProductChange(product._id)}
                className="mr-2"
              />
              {product.name}
            </label>
            {selectedProducts.includes(product._id) && (
              <input
                type="number"
                min="1"
                value={quantities[product._id] || 1}
                onChange={(e) => handleQuantityChange(product._id, e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-16 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            )}
          </div>
        ))}
        <NewProduct />
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-900 dark:text-white">Nombre del Pedido</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-900 dark:text-white">Detalles</label>
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            rows="3"
          />
        </div>
        <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-lime-800 dark:hover:bg-lime-900 dark:focus:ring-blue-800">
          Crear Pedido
        </button>
      </form>
    </>
  );
};
