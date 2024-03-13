import { Navigate, Outlet, } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import '../styles/index.scss'
import Navbar from '../components/Navbar';
import { Sidebar } from "../components/Sidebar";
import { useThemeContext } from "../context/ThemeProvider";
import { useEffect } from "react";
import axiosClient from "../axios-client";
import { useQuery } from "@tanstack/react-query";
import echo from "../components/Echo";
import Pusher from 'pusher-js';

const DefaultLayout = () => {

    const { user, token, setUser } = useStateContext();
    Pusher.logToConsole = true;
    const { theme } = useThemeContext();
    const { data, error, isLoading } = useQuery({
        queryKey: ['user'], queryFn: () => axiosClient.get('/user')
            .then((res) => res)
    })


    useEffect(() => {
        if (!isLoading) {
            console.log(data.data);
            setUser(data.data);
            echo.private(`user-${data.data.id}`)
                .listen('MessageSent', (data) => {
                    console.log('listen triggered');
                    console.log(data);
   

                }).error((error) => { console.error(error) });
            
            if (!token) {
                return <Navigate to='/Landing' />;
            }
            else if (data?.data?.type === 'admin') {
                return <Navigate to='/Users' />
            }
        }
    }, [data])


    // if (token) {
    //     useEffect(() => {
    //         axiosClient.get('/user')
    //             .then(({ data }) => {
    //                 setUser(data)
    //             })
    //     }, []);
    // }


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