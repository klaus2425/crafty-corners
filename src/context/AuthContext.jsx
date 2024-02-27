import { createContext, useContext, useState } from 'react';
import axiosClient from '../axios-client';
import { useStateContext } from "../context/ContextProvider";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const {user, token, setUser, setToken } = useStateContext();
  const [error, setError] = useState();

  const csrfToken = () => axiosClient.get('/sanctum/csrf-cookie', {
    baseURL: 'http://192.168.1.108:8000/',
    withCredentials: true,
  })
  const getUser = async () => {
    const { data } = await axiosClient.get('/user');
    setUser(data);
  }

  const login = async (payload) => {
    axiosClient
      .post("/login", payload)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          if (response.data.errors) {
            Swal.fire({
              position: "top-end",
              icon: "warning",
              title: `${Object.values(response.data.errors)[0]}`,
              showConfirmButton: false,
              timer: 2500
            });
          } else {
            Swal.fire({
              position: "top-end",
              icon: "warning",
              title: `Invalid Credentials`,
              showConfirmButton: false,
              timer: 2500
            });

          }
        }
      });
  }
  return <AuthContext.Provider value={{ user, error, login, getUser }}>
      {children}
  </AuthContext.Provider>
}

export default function useAuthContext() {
  return useContext(AuthContext);
}