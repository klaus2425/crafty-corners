import { Navigate, Outlet, Link } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import '../styles/index.scss';
import Navbar from '../components/Navbar';
import { Sidebar } from "../components/Sidebar";

const DefaultLayout = () => {
    const {user, token} = useStateContext();

    if (!token) { // Change to false later
        return <Navigate to='./Landing' />;
    }
    const name = 'Jaycie';
    return (
        <div style = {{height:"100dvh"}}>
            <Navbar />
            <div className="authenticated-container">            
                <Sidebar />
                <Outlet context={[name]}/>
            </div>
        </div>
    );
}

export default DefaultLayout;