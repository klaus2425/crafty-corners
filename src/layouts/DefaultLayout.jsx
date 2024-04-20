import { Navigate, Outlet, useNavigate, } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import '../styles/index.scss'
import Navbar from '../components/Navbar';
import { Sidebar } from "../components/Sidebar";
import { useThemeContext } from "../context/ThemeProvider";
import axiosClient from "../axios-client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { Suspense, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import BottomNav from "../components/BottomNav";
import Loading from "../components/utils/Loading";
import Fallback from "../components/Fallback";

const DefaultLayout = () => {
    const { user, token, setUser, setToken } = useStateContext();
    const { theme } = useThemeContext();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const smallScreen = useMediaQuery({ query: '(max-width: 945px)' })
    const { data, isLoading, } = useQuery({
        queryKey: ['user'],
        queryFn: () => axiosClient.get('/user')
            .catch(() => {
                setToken(null).then(navigate('/'))
                queryClient.removeQueries('user')
            })
    })


    useEffect(() => {
        if (!isLoading && data) {
            setUser(data.data);
        }

    }, [isLoading, data]);


    if (!isLoading) {
        if (!data?.data.assessment_completed && window.location.pathname != '/assessment') {

            // navigate(`/assessment?uid=${data.data.id}`)
            return (
                <Suspense fallback={<Loading />}>
                    <Navigate to={`/assessment?uid=${data.data.id}`} />
                </Suspense>
            )


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
            <div className="body-container" id={theme} style={{ height: "100dvh", overflowY: 'scroll' }}>
                <Toaster
                    position="bottom-center"
                    duration='3000'
                    toastOptions={{
                        className: '',
                        duration: 5000,
                        style: {
                            borderRadius: "100px",
                            border: 0,
                            boxShadow: "0 0px 20px rgb(0 0 0 / 0.1)",
                        }
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
                    smallScreen && <BottomNav />
                }
            </div>
        );
}

export default DefaultLayout;