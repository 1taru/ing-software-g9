import React, { useEffect, useState } from 'react'
import axios from 'axios'

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

    return (
      <div className="p-6 bg-gray-100 dark: bg-gray-900 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">Lista de Usuarios</h2>
      <ul role="list" className="divide-y divide-gray-300 max-w-4xl mx-auto bg-white shadow rounded-lg">
          {users.map(user => (
              <li key={user._id} className="flex justify-between items-center gap-x-6 py-5 px-4 hover:bg-gray-50">
                  <div className="flex items-center gap-x-4">
                      <div className="min-w-0 flex-auto">
                          <p className="text-sm font-semibold leading-6 text-gray-900">{user.name}</p>
                          <p className="mt-1 truncate text-xs leading-5 text-gray-500">{user.username}</p>
                      </div>
                  </div>
                  <div className="shrink-0 sm:flex sm:flex-col sm:items-end">
                      <p className="text-sm leading-6 text-gray-900">{user.accType}</p>
                      <p className="mt-1 text-xs leading-5 text-gray-500">Last seen <time>{}</time></p>
                  </div>
              </li>
          ))}
      </ul>
      </div>
    )
}
