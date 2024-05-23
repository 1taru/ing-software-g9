import './App.css'
import {Routes, Route} from 'react-router-dom'
import { Navbar } from './components'
import { Dashboard, Inicio, Login, Register, Logout } from './pages'
import axios from 'axios'
import {Toaster} from 'react-hot-toast'
import { UserContext, UserContextProvider } from '../context/userContext'
import { useContext } from 'react'
import { Router } from './helpers/Router'

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;

function App() {

  return (
    <UserContextProvider>
      <Navbar/>
      <Toaster position='bottom-right' toastOptions={{duration: 2000}}/>
      <Router/>
    </UserContextProvider>
  )
}

export default App
