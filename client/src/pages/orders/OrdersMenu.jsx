import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { FiMoreVertical } from 'react-icons/fi';
import { Menu, MenuItem, MenuButton, MenuList } from '@reach/menu-button';
import '@reach/menu-button/styles.css';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../context/userContext';
import SubjectsButton from '../../components/Buttons/inventoryDir';

export const OrdersMenu = () => {
    const [orders, setOrders] = useState([]);
    const [expandedOrderId, setExpandedOrderId] = useState(null);
    const [editOrderId, setEditOrderId] = useState(null);
    const [newStatus, setNewStatus] = useState('');
    const [newDetails, setNewDetails] = useState('');
    const { user } = useContext(UserContext);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:8000/orders/getOrders');
                console.log(response);
                setOrders(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchOrders();
    }, []);

    const deleteOrder = async (orderId) => {
        try {
            await axios.delete(`http://localhost:8000/orders/${orderId}`);
            setOrders(orders.filter(order => order._id !== orderId));
        } catch (err) {
            console.error(err);
        }
    };

    const toggleDetails = (orderId) => {
        setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
    };

    const toggleEdit = (order) => {
        setEditOrderId(editOrderId === order._id ? null : order._id);
        if (editOrderId !== order._id) {
            setNewStatus(order.status);
            setNewDetails(order.details);
        }
    };

    const updateOrder = async (orderId) => {
        try {
            await axios.put(`http://localhost:8000/orders/${orderId}`, { status: newStatus, details: newDetails });
            const updatedOrders = orders.map(order => 
                order._id === orderId ? { ...order, status: newStatus, details: newDetails } : order
            );
            setOrders(updatedOrders);
            setEditOrderId(null);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="p-6 bg-gray-100 dark:bg-slate-800 min-h-screen">
            <h2 className="text-2xl font-bold mb-6 text-center text-lime-600">Lista de Pedidos</h2>
            <ul role="list" className="divide-y divide-gray-300 dark:divide-gray-800 max-w-4xl mx-auto bg-white dark:bg-slate-900 shadow rounded-lg">
                {orders.map(order => (
                    <li key={order._id} className="flex flex-col gap-y-2 py-5 px-4 ">
                        <div className="gap-x-4 flex flex-col md:flex-row gap-4 items-center  ">

                            <div className="min-w-0 w-full md:w-1/2 ">
                                <p className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-400 ">{order.name}</p>
                                {expandedOrderId === order._id && (
                                    <>
                                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">Creado por: {order.creator}</p>
                                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">Estado: {order.status}</p>
                                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">Fecha de Creación: {order.creationDate}</p>
                                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">Detalles: {order.details}</p>
                                        <div className="mt-1">
                                            {order.products.map(product => (
                                                <div key={product?.product?._id} className="text-xs leading-5 text-gray-500">
                                                    {product.product.name} - Cantidad: {product.quantity}
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                )}
                                <div className='flex flex-row gap-2'>
                                <button
                                    onClick={() => toggleDetails(order._id)}
                                    className="mt-2 bg-lime-900 hover:bg-lime-700 text-white dark:text-gray-200 font-bold py-1 px-2 rounded text-xs"
                                >
                                    {expandedOrderId === order._id ? "Ocultar detalles" : "Ver detalles"}
                                </button>
                              
                                <button
                                    onClick={() => toggleEdit(order)}
                                    className="mt-2 bg-lime-900 hover:bg-lime-700 text-white dark:text-gray-200 font-bold py-1 px-2 rounded text-xs"
                                >
                                    {editOrderId === order._id ? "Cancelar" : "Actualizar pedido"}
                                </button>
                                <Link to={`/orders/${order._id}/changeLogs`} className="mt-2 bg-lime-900 hover:bg-lime-700 text-white dark:text-gray-200 font-bold py-1 px-2 rounded text-xs">
                                    Historial
                                </Link>

                                </div>
                            </div>

                            
                        <div className='w-full md:w-1/2 '>
                              {editOrderId === order._id && (
                                    <div className="mt-2 p-2 bg-gray-200 dark:bg-gray-700 rounded-lg w-full md:w-64">
                                    <label className="block text-xs font-medium text-gray-900 dark:text-gray-400 mb-1">Nuevo Estado</label>
                                    <input
                                        type="text"
                                        placeholder="Nuevo Estado"
                                        value={newStatus}
                                        onChange={(e) => setNewStatus(e.target.value)}
                                        className="mb-2 p-2 text-xs w-full bg-gray-800 text-white border border-gray-300 dark:border-gray-600 rounded"
                                    />
                                    <label className="block text-xs font-medium text-gray-900 dark:text-gray-400 mb-1">Nuevos Detalles</label>
                                    <input
                                        type="text"
                                        placeholder="Nuevos Detalles"
                                        value={newDetails}
                                        onChange={(e) => setNewDetails(e.target.value)}
                                        className="mb-2 p-2 text-xs w-full bg-gray-800 text-white border border-gray-300 dark:border-gray-600 rounded"
                                    />
                                    <div className="flex justify-between">
                                        <button
                                            onClick={() => updateOrder(order._id)}
                                            className="bg-lime-900 hover:bg-lime-700 text-white font-bold py-1 px-2 rounded text-xs mr-2"
                                        >
                                            Aplicar Cambios
                                        </button>
                                        <button
                                            onClick={() => toggleEdit(order)}
                                            className="bg-red-600 hover:bg-red-500 text-white font-bold py-1 px-2 rounded text-xs"
                                        >
                                            Cancelar
                                        </button>
                                    </div>
                                </div>
                                
                                )}
                        </div>

                        </div>

                        
                        <div className="flex-shrink-0 flex flex-col items-end ">
                            <Menu>
                                <MenuButton className="inline-flex justify-center items-center w-10 h-8 rounded-md border border-gray-300 dark:border-sky-900 shadow-sm bg-lime-600 text-sm font-medium text-gray-700 hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-800 focus:ring-indigo-500">
                                    <FiMoreVertical className="text-white" />
                                </MenuButton>
                                <MenuList className="z-10 origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-sky-900 ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <MenuItem onSelect={() => deleteOrder(order._id)} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-sky-700">Eliminar</MenuItem>
                                </MenuList>
                            </Menu>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="flex justify-center mt-6">
                {user.accType === 'acctype3' && (
                    <>
                        <Link to="/createOrder" className="m-2">
                            <button className="bg-lime-900 dark:bg-gray-900 hover:bg-lime-700 text-white dark:text-gray-200 font-bold py-2 px-4 rounded">
                                Crear nuevo pedido
                            </button>
                        </Link>
                        <SubjectsButton />
                    </>
                )}
                <Link to="/" className="m-2">
                    <button className="bg-lime-900 dark:bg-gray-900 hover:bg-lime-700 text-white dark:text-gray-200 font-bold py-2 px-4 rounded">
                        Volver al Inicio
                    </button>
                </Link>
            </div>
        </div>
    );
};