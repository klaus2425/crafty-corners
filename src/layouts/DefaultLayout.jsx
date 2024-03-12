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
    const userData = useQuery({queryKey: ['user'], queryFn: () => axiosClient.get('/user').then((res) => res)})

    if (!userData.isLoading) {
        console.log(userData.data.data);
        setUser(userData.data.data);
        if (!token) {
            return <Navigate to='/Landing' />;
        }
        else if (userData.data?.type === 'admin') {
            return <Navigate to='/Users' />
        }
    }


    // if (token) {
    //     useEffect(() => {
    //         axiosClient.get('/user')
    //             .then(({ data }) => {
    //                 setUser(data)
    //             })
    //     }, []);
    // }


    return (
        <div className="body-container" id={theme}  style={{ height: "100dvh" }}>
            <Navbar />
            <div className="authenticated-container" >
                <Sidebar />
                <Outlet />
            </div>
        </div>
    );
}

export default DefaultLayout;