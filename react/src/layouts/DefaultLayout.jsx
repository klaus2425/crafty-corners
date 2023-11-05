import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import '../styles/index.scss';
import Navbar from '../components/Navbar';
const DefaultLayout = () => {
    const {user, token} = useStateContext();

    if (token) { // Change to false later
        return <Navigate to='./Landing' />;
    }
    const name = 'Jaycie';
    return (
        <div style = {{height:"100dvh"}}>
            <Navbar />
            <Outlet context={[name]}/>
        </div>
    );
}

export default DefaultLayout;