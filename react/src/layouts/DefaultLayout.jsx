import { Navigate, Outlet, } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import '../styles/index.scss';
import Navbar from '../components/Navbar';
import { Sidebar } from "../components/Sidebar";

const DefaultLayout = () => {
    const {user, token} = useStateContext();

    if (!token) { // Change to false later
        return <Navigate to='./Landing' />;
    }
    
    return (
        <div style = {{height:"100dvh"}}>
            <Navbar />
            <div className="authenticated-container">            
                <Sidebar />
                <Outlet />
            </div>
        </div>
    );
}

export default DefaultLayout;