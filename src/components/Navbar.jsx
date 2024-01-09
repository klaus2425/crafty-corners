import { useStateContext } from "../context/ContextProvider";
import LoginModal from "./LoginModal";
import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import DropDownItem from "./DropDownItem";

const Navbar = () => {
    const {isOpen, setIsOpen, setUser, setToken, user, token} = useStateContext();
    const [openDropDown, setOpenDropDown] = useState(false);
    const onLogout = () => {
        axiosClient.post('/logout')
        .then(() => {
            setUser({});
            setToken(null);
            window.location.reload();
        })
    }    
    const handleDropDown = () => {
        openDropDown ? setOpenDropDown(false) : setOpenDropDown(true);
    }

    if (token) {
        useEffect(() => {
            axiosClient.get('/user')
            .then(({data}) => {
                setUser(data)
            })
        }, []);
    }
    

    const storageBaseUrl = import.meta.env.VITE_API_STORAGE_URL;
    const userPicture = `${storageBaseUrl}${user.profile_picture}`;
    if (token){ 
        return (
            <div className='authenticated-navbar'>
                <div className='navbar title'>
                    <img src='/Logo.png'/>
                    <h1>Crafty Corners</h1>
                </div>
                <div className="search-post">
                    <input type='text' placeholder="Search for Discussions or Topics"/>
                </div>
                <div className="profile">
                    <button className='add-post'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M12 20.6154L12 3.30768M3.34619 11.9615H20.6539" stroke="#677186" strokeWidth="5.76923" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                    <h3 id="navbar-header">Hi, {user.first_name}</h3>
                    <img className="navbar-img" src={userPicture} alt="Profile Picture" onClick={handleDropDown} />

                    {openDropDown && (
                        <DropDownItem userData={user} logout={onLogout} picture = {userPicture} type={user.type}/>
                    )}
                </div>
            </div>
        )
    }
    else {
        return (
            <div className='navbar'>
                <div className='navbar title'>
                    <img src='Logo.png'/>
                    <h1>Crafty Corners</h1>
                </div>
                <div className="guest-buttons">
                    <button className="guest-login" onClick={() => setIsOpen(true)}>Log In</button>
                    
                    <LoginModal isOpen={isOpen} setIsOpen={setIsOpen}/>
                </div>

            </div>
        );
    }


}

export default Navbar;
