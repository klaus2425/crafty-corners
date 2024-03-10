import { Outlet } from "react-router-dom"
import { useStateContext } from "../context/ContextProvider";
import { Navigate } from "react-router-dom";
import Navbar from '../components/Navbar';

const GuestLayout = () => {
    const { token } = useStateContext();
    if (token) {
        return <Navigate to='/' />
    };
    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    );
}

export default GuestLayout;