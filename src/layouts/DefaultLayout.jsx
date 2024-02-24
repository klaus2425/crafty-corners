import { Navigate, Outlet, } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import '../styles/index.scss';
import Navbar from '../components/Navbar';
import { Sidebar } from "../components/Sidebar";
import Swal from 'sweetalert2';

const DefaultLayout = () => {
    const { user, token, setToken } = useStateContext();
    if(user.email_verified_at === null) {
        Swal.fire({
            position: "center",
            icon: "info",
            title: "Verify your email first",
            showConfirmButton: false,
            timer: 1500
          });
        setToken(null);
        return <Navigate to='/Landing' />;

    }
    else if (!token || !user) { 
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