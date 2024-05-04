import { Toaster } from "react-hot-toast";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from '../components/Navbar';
import { useStateContext } from "../context/ContextProvider";
import '../styles/index.scss';
import { Suspense } from "react";
import Loading from "../components/utils/Loading";

const GuestLayout = () => {
    const { token } = useStateContext();
    if (token) {
        return <Navigate to='/' />
    };
    return (
        <div className="landing-bg">
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
            <Suspense fallback={<Loading />}>
                <Outlet />
            </Suspense>
        </div>
    );
}

export default GuestLayout;