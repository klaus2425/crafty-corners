import { Link } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";
import { useEffect } from "react";
import axiosClient from "../axios-client";

const Navbar = () => {
    const {isOpen, setIsOpen, isSignUpOpen, setIsSignUpOpen, setUser, setToken} = useStateContext();

    const onLogout = (ev) => {
        ev.preventDefault();

        axiosClient.post('/logout')
        .then(() => {
            setUser({}),
            setToken(null)
        })
    }

    useEffect(() => {
        axiosClient.get('/user')
        .then(({data}) => {
            setUser(data)
        })
    }, []);

    const {user, token} = useStateContext();
    if (token){ //change to true
        return (
            <div className='authenticated-navbar'>
                <div className='navbar title'>
                    <img src='Logo.png'/>
                    <h1>Crafty Corners</h1>
                </div>
                <div className="search-post">
                    <input type='text' placeholder="Search for Discussions or Topics"/>
                </div>
                <div className="profile">
                    <button className='add-post'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M12 20.6154L12 3.30768M3.34619 11.9615H20.6539" stroke="#677186" stroke-width="5.76923" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                    <h3>Hi, {user.first_name}</h3>
                    <img src="/Jaycie.png" alt="Profile Picture" />
                    <button id='logout_button' onClick={onLogout}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none">
                            <path d="M8 18.9282C9.21615 19.6303 10.5957 20 12 20C13.4043 20 14.7838 19.6303 16 18.9282C17.2162 18.2261 18.2261 17.2162 18.9282 16C19.6303 14.7838 20 13.4043 20 12C20 10.5957 19.6303 9.21615 18.9282 8C18.2261 6.78385 17.2162 5.77394 16 5.0718C14.7838 4.36965 13.4043 4 12 4C10.5957 4 9.21615 4.36965 8 5.0718" stroke="#33363F" stroke-width="2"/>
                            <path d="M2 12L1.21913 11.3753L0.719375 12L1.21913 12.6247L2 12ZM11 13C11.5523 13 12 12.5523 12 12C12 11.4477 11.5523 11 11 11V13ZM5.21913 6.3753L1.21913 11.3753L2.78087 12.6247L6.78087 7.6247L5.21913 6.3753ZM1.21913 12.6247L5.21913 17.6247L6.78087 16.3753L2.78087 11.3753L1.21913 12.6247ZM2 13H11V11H2V13Z" fill="#33363F"/>
                        </svg>
                    </button>
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
                <input type='text' placeholder="Search for Discussions or Topics" className="search-post"/>
                <div className="guest-buttons">
                    <button onClick={() => setIsOpen(true)}>Log In</button>
                    <button onClick={() => setIsSignUpOpen(true)}>Sign Up</button>
                    <SignUpModal isOpen={isSignUpOpen} setIsOpen={setIsSignUpOpen}/>
                    <LoginModal isOpen={isOpen} setIsOpen={setIsOpen}/>
                </div>
                
            </div>
        );
    }

    
}

export default Navbar;