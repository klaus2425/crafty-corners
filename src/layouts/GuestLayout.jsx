import { Outlet } from "react-router-dom"
import { useStateContext } from "../context/ContextProvider";
import { Navigate } from "react-router-dom";
import Navbar from '../components/Navbar';
import { Toaster } from "react-hot-toast";
import '../styles/index.scss'

const GuestLayout = () => {
    const { token } = useStateContext();
    if (token) {
        return <Navigate to='/' />
    };
    return (
        <div>
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
            <Outlet />
        </div>
    );
}

export default GuestLayout;