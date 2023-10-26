import { Outlet } from "react-router-dom"
import { useStateContext } from "../context/ContextProvider";

const GuestLayout = () => {
    const {token} = useStateContext;
    if (token) {
        return <Navigate to='/' />
    }
    
    return (
        <div>
            <div className="navbar"></div>
            <Outlet />
        </div>
    )
}

export default GuestLayout;