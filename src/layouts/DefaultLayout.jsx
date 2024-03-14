import { Navigate, Outlet, } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import '../styles/index.scss'
import Navbar from '../components/Navbar';
import { Sidebar } from "../components/Sidebar";
import { useThemeContext } from "../context/ThemeProvider";
import { useEffect } from "react";
import axiosClient from "../axios-client";
import { useQuery } from "@tanstack/react-query";

const DefaultLayout = () => {

    const { user, token, setUser } = useStateContext();
    const { theme } = useThemeContext();
    const { data, isLoading } = useQuery({
        queryKey: ['user'], queryFn: () => axiosClient.get('/user')
            .then((res) => res)
    })
    

    useEffect(() => {
        if (!isLoading) {
            setUser(data.data);
            if (data?.data?.type === 'admin') {
                return <Navigate to='/Users' />
            }
        }
    }, [data])

    if (!token || !user) {
        return <Navigate to='/Landing' />;
    }

    if (user.type === 'admin') {
        return <Navigate to='/Users' />
    } else
    return (
        <div className="body-container" id={theme} style={{ height: "100dvh", overflowY: 'scroll' }}>
            <Navbar />
            <div className="authenticated-container" >
                <Sidebar />
                <Outlet />
            </div>
        </div>
    );
}

export default DefaultLayout;