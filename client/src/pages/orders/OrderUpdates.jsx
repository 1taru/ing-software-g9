import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export const OrderChangeLogs = () => {
    const { id } = useParams();
    const [changeLogs, setChangeLogs] = useState([]);

    useEffect(() => {
        const fetchChangeLogs = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/orders/${id}/changeLogs`);
                setChangeLogs(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchChangeLogs();
    }, [id]);

    return (
        <div className="p-6 bg-gray-100 dark:bg-slate-800 min-h-screen">
            <h2 className="text-2xl font-bold mb-6 text-center text-lime-600">Historial de Cambios del Pedido</h2>
            <ul className="max-w-4xl mx-auto bg-white dark:bg-slate-900 shadow rounded-lg divide-y divide-gray-300 dark:divide-gray-800">
                {changeLogs.map((log, index) => (
                    <li key={index} className="py-4 px-4">
                        <p className="text-sm text-gray-700 dark:text-gray-300"><strong>Fecha:</strong> {new Date(log.changedAt).toLocaleString()}</p>
                        <p className="text-sm text-gray-700 dark:text-gray-300"><strong>Estado:</strong> {log.status}</p>
                        <p className="text-sm text-gray-700 dark:text-gray-300"><strong>Detalles:</strong> {log.details}</p>
                    </li>
                ))}
            </ul>
            <div className="flex justify-center mt-6">
                <a href="/pedidos" className="bg-lime-900 dark:bg-gray-900 hover:bg-lime-700 text-white dark:text-gray-200 font-bold py-2 px-4 rounded">
                    Volver a la Lista de Pedidos
                </a>
            </div>
        </div>
    );
};
