import React from 'react'
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'

const ProtectedRoutes = ({children}) => {
    const { user } = useAuth();

    if(!user?.isAuthenticated) {
        return <Navigate to='/signin'></Navigate>
    }

    return children;
}

export default ProtectedRoutes