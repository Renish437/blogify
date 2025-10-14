import React, { useContext } from 'react'
import { AuthContext } from '../context/Auth'
import { Navigate } from 'react-router-dom';

const GuestRoute = ({children}) => {
    const {isLoggedIn} =useContext(AuthContext);
    if(isLoggedIn()){
        return <Navigate to={`/profile`}/>
    }
  return children;
}

export default GuestRoute