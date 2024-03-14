import { Outlet } from "react-router-dom"
import { useStateContext } from "../context/ContextProvider";
import { Navigate } from "react-router-dom";
import Navbar from '../components/Navbar';
import { Toaster } from "react-hot-toast";

const GuestLayout = () => {
    const { token } = useStateContext();
    if (token) {
        return <Navigate to='/' />
    };
    return (
        <div>
            <Toaster />
            <Navbar />
            <Outlet />
        </div>
    );
}

export default GuestLayout;