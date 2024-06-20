
import React, { useContext } from 'react'
import { UserContext } from '../../../context/userContext'
import { NewOrder } from '../../components/Buttons/NewOrder';

export const OrdersMenu = () => {

  const {user} = useContext(UserContext);
  console.log(user)
  return (
      <>
      {user.accType==='acctype3' && <NewOrder/>}
      
      </>
  )
}
