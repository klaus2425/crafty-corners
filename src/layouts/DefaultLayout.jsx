import { Navigate, Outlet, useNavigate, } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import '../styles/index.scss'
import Navbar from '../components/Navbar';
import { Sidebar } from "../components/Sidebar";
import { useThemeContext } from "../context/ThemeProvider";
import axiosClient from "../axios-client";
import { useQuery } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
const DefaultLayout = () => {
    const { user, token, setUser } = useStateContext();
    const { theme } = useThemeContext();
    const navigate = useNavigate();
    const { data, isLoading } = useQuery({
        queryKey: ['user'],
        queryFn: () => axiosClient.get('/user')
    })



    if (!isLoading) {
        if (!data?.data.assessment_completed && window.location.pathname != '/assessment') {
            navigate(`/assessment?uid=${data.data.id}`)
        }
        setUser(data.data);
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
                    <Outlet />
                </div>
            </div>
        );
}

export default DefaultLayout;