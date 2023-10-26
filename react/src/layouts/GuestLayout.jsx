import { Outlet } from "react-router-dom"
import { useStateContext } from "../context/ContextProvider";

const GuestLayout = () => {
    const {token} = useStateContext;
    if (token) {
        return <Navigate to='/' />
    }
    
    return (
        <div>
            <div className='navbar'>
                <div className='navbar title'>
                    <img src='../../public/Logo.png'/>
                    <h1>Crafty Corners</h1>
                </div>
                <input placeholder="Search for Discussions or Topics"/>
                <button>Login</button>
            </div>
            <Outlet />
        </div>
    )
}

export default GuestLayout;