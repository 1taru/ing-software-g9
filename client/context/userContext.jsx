import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const UserContext = createContext({});

export function UserContextProvider({children}){
    
    const [user, setuser] = useState(() => {
        // Intentar recuperar el usuario de localStorage al inicio
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    useEffect(()=>{
        if(!user){
            axios.get('/profile').then(({data})=>{
                setuser(data)
            })
        }
    }, []);

    useEffect(() => {
        // Almacenar el usuario en localStorage cada vez que cambia
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
        } else {
          localStorage.removeItem('user');
        }
      }, [user]);

    const logoutUser = async () => {
        try {
            await axios.post('/logout');
            setuser(null);
            localStorage.removeItem('user');
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };
    
    return(
        <UserContext.Provider value={{user,setuser,logoutUser}}>
            {children}
        </UserContext.Provider>
    )
}
