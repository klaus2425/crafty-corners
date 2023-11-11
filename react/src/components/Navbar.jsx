import { Link } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";

const Navbar = () => {
    const {isOpen, setIsOpen} = useStateContext();
    const {isSignUpOpen, setIsSignUpOpen} = useStateContext();

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
                    <h3>Hi, Jaycie</h3>
                    <img src="/Jaycie.png" alt="Profile Picture" />
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