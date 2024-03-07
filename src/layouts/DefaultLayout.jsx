import { Navigate, Outlet, } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import '../styles/index.scss';
import Navbar from '../components/Navbar';
import { Sidebar } from "../components/Sidebar";


const DefaultLayout = () => {
    const { user, token, setToken } = useStateContext();

    if (!token || !user) {
        return <Navigate to='/Landing' />;
    }
    else if (user.type === 'admin') {
        return <Navigate to='/Users' />
    }



    return (
        <div style={{ height: "100dvh" }}>
            <Navbar />
            <div className="authenticated-container">
                <Sidebar />
                <Outlet />
            </div>
        </div>
    );
}

export default DefaultLayout;