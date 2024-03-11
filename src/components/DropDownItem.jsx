import { Link, Navigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGears } from '@fortawesome/free-solid-svg-icons'
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { useState } from 'react';
import { useThemeContext } from '../context/ThemeProvider';


const DropDownItem = (props) => {
    const {theme} = useThemeContext();
    const [isDarkMode, setDarkMode] = useState(false);

    return (
        <div className="dropdown-menu">
            <img className='dropdown-picture' src={props.picture}></img>
            <h3>{`${props.userData.first_name} ${props.userData.last_name}`}</h3>
            <span>{props.type}</span>

            {props.type !== 'admin' && <div><FontAwesomeIcon icon={faGears} /><Link to={'/account-settings'}>Account Settings</Link></div>}
            <DarkModeSwitch />
            <button id='logout_button' onClick={props.logout}>Log Out</button>
        </div>
    );
}


export default DropDownItem;