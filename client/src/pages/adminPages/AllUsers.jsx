import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FiMoreVertical } from 'react-icons/fi'
import { Menu, MenuItem, MenuButton, MenuList } from '@reach/menu-button'
import '@reach/menu-button/styles.css'
import { Link } from 'react-router-dom'

export const AllUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8000/users');
                setUsers(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchUsers();
    }, []);

    const deleteUser = async (userId) => {
        try {
            await axios.delete(`http://localhost:8000/users/${userId}`);
            setUsers(users.filter(user => user._id !== userId));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="p-6 bg-gray-100 dark:bg-slate-800 min-h-screen">
            <h2 className="text-2xl font-bold mb-6 text-center text-lime-600">Lista de Usuarios</h2>
            <ul role="list" className="divide-y divide-gray-300 dark:divide-gray-800 max-w-4xl mx-auto bg-white dark:bg-slate-900 shadow rounded-lg">
                {users.map(user => (
                    <li key={user._id} className="flex justify-between items-center gap-x-6 py-5 px-4">
                        <div className="flex items-center gap-x-4 flex-grow">
                            <div className="min-w-0 flex-auto">
                                <p className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-400">{user.name}</p>
                                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{user.username}</p>
                            </div>
                        </div>
                        <div className="flex-shrink-0 flex flex-col items-end">
                            <p className="text-sm leading-6 text-gray-500">{user.accType}</p>
                            {user.accType !== 'admin' && (
                                <Menu>
                                    <MenuButton className="inline-flex justify-center items-center w-10 h-8 rounded-md border border-gray-300 dark:border-sky-900 shadow-sm bg-lime-600 text-sm font-medium text-gray-700 hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-800 focus:ring-indigo-500">
                                        <FiMoreVertical className="text-white" />
                                    </MenuButton>
                                    <MenuList className="z-10 origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-sky-900 ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <MenuItem onSelect={() => deleteUser(user._id)} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-sky-700">Eliminar</MenuItem>
                                    </MenuList>
                                </Menu>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
            <div className="flex justify-center mt-6">
                <Link to="/register" className="m-2">
                    <button className="bg-lime-900 dark:bg-gray-900 hover:bg-lime-700 text-white dark:text-gray-400 font-bold py-2 px-4 rounded">
                        Registrar nuevo usuario
                    </button>
                </Link>
                <Link to="/" className="m-2">
                    <button className="bg-lime-900 dark:bg-gray-900 hover:bg-lime-700 text-white dark:text-gray-400 font-bold py-2 px-4 rounded">
                        Volver al Inicio
                    </button>
                </Link>
            </div>
        </div>
    )
}
