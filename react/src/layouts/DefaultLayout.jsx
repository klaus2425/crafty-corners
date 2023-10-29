import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";

const DefaultLayout = () => {
    const {user, token} = useStateContext();

    if (token) {
        return <Navigate to='./Landing' />;
    }

    return (
        <div>
            <div className='navbar'>
                <div className='navbar title'>
                    <img src='Logo.png'/>
                    <h1>Crafty Corners</h1>
                </div>
                <input type='text' placeholder="Search for Discussions or Topics"/>
                <button></button>
            </div>
            <Outlet />
        </div>
    );
}

export default DefaultLayout;