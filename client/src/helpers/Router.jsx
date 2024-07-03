
import React, { useContext } from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
import { Dashboard, Inicio, Login, Register, Logout, OrdersMenu, AllUsers, CreateOrder, CreateProduct, CreateMaterial, InventoryMenu, UmbralMenu } from '../pages'
import { UserContext } from '../../context/userContext'
import { OrderChangeLogs } from '../pages/orders/OrderUpdates'

export const Router = () => {

  const { user } = useContext(UserContext);
  
  return (

    <Routes>

        {!user ? (<Route path='/' element={<Login/>}/>) : (<Route path='/' element={<Dashboard/>}/>)}
        {/* admin routes */}
        <Route path='/register' element={ user ? ( user.accType === 'admin' ? ( <Register />) : (<Inicio />) ) : (<Login />)}/>
        <Route path='/allUsers' element={ user ? ( user.accType === 'admin' ? ( <AllUsers />) : (<Inicio />) ) : (<Login />)}/>

        <Route path='/pedidos' element={user ? (user.accType === 'acctype1' || user.accType === 'acctype3' || user.accType === 'acctype2' ? (<OrdersMenu />) : (<Inicio />)) : (<Login />)} />
        <Route path='/createOrder' element={user ? (user.accType === 'acctype3' ? (<CreateOrder />) : (<Inicio />)) : (<Login />)} />
        <Route path='/orders/:id/changeLogs' element={user ? (<OrderChangeLogs />) : (<Login />)} />
        <Route path='/addProduct' element={user ? (user.accType === 'acctype3' ? (<CreateProduct />) : (<Inicio />)) : (<Login />)} />


        <Route path='/createMaterial' element={user ? (user.accType === 'acctype2'  ? (<CreateMaterial />) : (<Inicio />)) : (<Login />)} />
        <Route path='/inventario' element={user ? (user.accType === 'acctype2' || user.accType === 'acctype3' ? (<InventoryMenu />) : (<Inicio />)) : (<Login />)} />
        <Route path='/umbral' element={user ? (user.accType === 'acctype2' ? (<UmbralMenu />) : (<Inicio />)) : (<Login />)} />
        
        {!user ? (<Route path='/login' element={<Login/>}/>) : (<Route path= '/login' element ={<Dashboard/>}/>)}

        {user && <Route path = '/logout' element = { <Logout/>}/>}

        {user ? (<Route path='/dashboard' element={<Dashboard />} />) : (<Route path='/dashboard' element={<Navigate to='/login' replace />}/>)}

    </Routes>
    
  )
}
