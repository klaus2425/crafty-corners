import { Outlet } from "react-router-dom"
import { useStateContext } from "../context/ContextProvider";
import '../styles/index.scss'
import { Navigate } from "react-router-dom";
import Navbar from '../components/Navbar';


const GuestLayout = () => {
    const {token} = useStateContext();
    const {isOpen, setIsOpen} = useStateContext(false);
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