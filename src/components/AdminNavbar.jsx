import { useStateContext } from "../context/ContextProvider";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";
import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import DropDownItem from "./DropDownItem";

const AdminNavbar = () => {
    const { isOpen, setIsOpen, isSignUpOpen, setIsSignUpOpen, setUser, setToken, user, token } = useStateContext();
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

    useEffect(() => {
        axiosClient.get('/user')
            .then(({ data }) => {
                setUser(data)
            })
    }, []);

    const storageBaseUrl = import.meta.env.VITE_API_STORAGE_URL;
    const userPicture = `${storageBaseUrl}${user.profile_picture}`;
    if (token) {
        return (
            <div className='authenticated-navbar'>
                <div className='navbar title'>
                    <img src='/Logo.png' />
                    <h1>Crafty Corners</h1>
                </div>

                <div className="profile">

                    <h3 id="navbar-header">Hi, {user.first_name}</h3>
                    <img className="navbar-img" src={userPicture} alt="Profile Picture" onClick={handleDropDown} />

                    {openDropDown && (
                        <DropDownItem userData={user} logout={onLogout} picture={userPicture} type={user.type} />
                    )}
                </div>
            </div>
        )
    }



}

export default AdminNavbar;
