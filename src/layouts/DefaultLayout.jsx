import { useQuery } from "@tanstack/react-query";
import { Suspense, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useMediaQuery } from "react-responsive";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import axiosClient from "../axios-client";
import BottomNav from "../components/BottomNav";
import Fallback from "../components/Fallback";
import Navbar from '../components/Navbar';
import { Sidebar } from "../components/Sidebar";
import { useStateContext } from "../context/ContextProvider";
import { useThemeContext } from "../context/ThemeProvider";
import '../styles/index.scss';

const DefaultLayout = () => {
    const { user, token, setUser, } = useStateContext();
    const { theme } = useThemeContext();
    const navigate = useNavigate();
    const smallScreen = useMediaQuery({ query: '(max-width: 945px)' })
    const { data, isLoading, } = useQuery({
        queryKey: ["user"],
        queryFn: () => axiosClient.get('/user').catch((err) => {
            if (err.response.status === 401) {
                localStorage.clear();
                window.location.reload();
            }
        })
    })


    useEffect(() => {
        if (!isLoading && data) {
            setUser(data.data);
        }

    }, [isLoading, data]);


    if (!isLoading) {
        if (!data?.data.assessment_completed && window.location.pathname != '/assessment') {
            navigate(`/assessment?uid=${data.data.id}`)
        }
        if (data?.data?.type === 'admin') {
            return <Navigate to='/Users' />
        }
    }

    if (!token || !user) {
        return <Navigate to='/Landing' />;
    }

    if (user.type === 'admin') {
        return <Navigate to='/Users' />
    }

    else
        return (
            user.type &&
            <div className="body-container" id={theme} style={{ height: "100dvh", overflowY: 'scroll' }}>
                <Toaster
                    position="bottom-center"
                    duration='3000'
                    toastOptions={{
                        className: 'toaster',
                        duration: 5000,
                        boxShadow: "0 0px 20px rgb(0 0 0 / 0.1)",

                    }}
                />
                <Navbar />
                <div className="authenticated-container" >
                    <Sidebar />
                    <Suspense fallback={<Fallback />}>
                        <Outlet />
                    </Suspense>
                </div>
                {
                    smallScreen &&
                    <BottomNav />
                }
            </div>
        );
}

export default DefaultLayout;