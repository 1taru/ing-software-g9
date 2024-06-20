
import React, { useContext } from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
import { Dashboard, Inicio, Login, Register, Logout, OrdersMenu, AllUsers} from '../pages'
import { UserContext } from '../../context/userContext'

export const Router = () => {

  const { user } = useContext(UserContext);
  
  return (

    <Routes>

        {!user ? (<Route path='/' element={<Login/>}/>) : (<Route path='/' element={<Dashboard/>}/>)}
        {/* admin routes */}
        <Route path='/register' element={ user ? ( user.accType === 'admin' ? ( <Register />) : (<Inicio />) ) : (<Login />)}/>
        <Route path='/allUsers' element={ user ? ( user.accType === 'admin' ? ( <AllUsers />) : (<Inicio />) ) : (<Login />)}/>

        <Route path='/pedidos' element={user ? (user.accType === 'acctype1' || user.accType === 'acctype3' ? (<OrdersMenu />) : (<Inicio />)) : (<Login />)} />

        {!user ? (<Route path='/login' element={<Login/>}/>) : (<Route path= '/login' element ={<Dashboard/>}/>)}

        {user && <Route path = '/logout' element = { <Logout/>}/>}

        {user ? (<Route path='/dashboard' element={<Dashboard />} />) : (<Route path='/dashboard' element={<Navigate to='/login' replace />}/>)}

    </Routes>
    
  )
}
