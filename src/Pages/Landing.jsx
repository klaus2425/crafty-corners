import SignUpModal from '../components/SignUpModal';
import { useStateContext } from "../context/ContextProvider";


const Landing = () => {
    const { isOpen, setIsOpen, isSignUpOpen, setIsSignUpOpen, setUser, setToken, user, token } = useStateContext();
    return (
        <div className='landing-bg'>
            <div className="landing-container">
                <div>
                    <span className='landing-title'>Crafty <br /> Corners</span>
                    <br />
                    <span className='landing-sub'>Cultivate you hobbies <br /> with a wide community</span>
                </div>
                <button className='sign-up' onClick={() => setIsSignUpOpen(true)}>Join Now</button>
                <SignUpModal isOpen={isSignUpOpen} setIsOpen={setIsSignUpOpen} />
            </div>
        </div>

    )
}

export default Landing;