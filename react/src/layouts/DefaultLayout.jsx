import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import '../styles/index.scss'
const DefaultLayout = () => {
    const {user, token} = useStateContext();

    if (token) { // Change to false later
        return <Navigate to='./Landing' />;
    }

    return (
        <div style = {{height:"100dvh"}}>
            <div className='authenticated-navbar'>
                <div className='navbar title'>
                    <img src='Logo.png'/>
                    <h1>Crafty Corners</h1>
                </div>
                <div className="search-post">
                    <input type='text' placeholder="Search for Discussions or Topics"/>
                    <button className='add-post'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M12 20.6154L12 3.30768M3.34619 11.9615H20.6539" stroke="#677186" stroke-width="5.76923" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    </button>
                </div>
                <div className="profile">
                    <h3>Hi, Jaycie</h3>
                    <img src="/Jaycie.png" alt="Profile Picture" />
                </div>
                
            </div>
            <Outlet />
        </div>
    );
}

export default DefaultLayout;