import { Navigate, Outlet, } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import '../styles/index.scss'
import Navbar from '../components/Navbar';
import { Sidebar } from "../components/Sidebar";
import { useThemeContext } from "../context/ThemeProvider";
import { useEffect } from "react";
import axiosClient from "../axios-client";


const DefaultLayout = () => {
    const { user, token, setUser } = useStateContext();

    const { theme } = useThemeContext();
    if (!token || !user) {
        return <Navigate to='/Landing' />;
    }
    else if (user.type === 'admin') {
        return <Navigate to='/Users' />
    }
    if (token) {
        useEffect(() => {
            axiosClient.get('/user')
                .then(({ data }) => {
                    setUser(data)
                })
        }, []);
    }

    return (
        <div  style={{ height: "100dvh" }}>
            <Navbar />
            <div className="authenticated-container" id={theme}>
                <Sidebar />
                <Outlet />
            </div>
        </div>
    );
}

export default DefaultLayout;