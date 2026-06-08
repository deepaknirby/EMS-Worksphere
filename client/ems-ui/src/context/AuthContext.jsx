import React, { createContext, useState, useContext } from 'react'
import createApi from '../api/axiosConfig'
import { getMe } from '../api/employeeApi';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user,setUser] = useState(null);
  const [api,setApi] = useState(null);

  const login = async (email,password) => {
    try {
      const axiosInstance = createApi(email,password);
      const response = await getMe(axiosInstance);
      const data = response.data;

      setUser(
        {
          id: data.id,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          role: data.role,
          password: password,
          isAuthenticated: true
        }
      );

      setApi(() => axiosInstance);

      return {success: true,role: data.role};
    }catch(error) {
      if(error.response?.status === 401) {
        return { success: false, message: "Invalid email or password" };
      }
      return { success: false, message: "Something went wrong" };
    }
  }

  const logout = () => {
    setUser(null);
    setApi(null);
  }

  return (
    <AuthContext.Provider value={{user,api,login,logout}}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext)