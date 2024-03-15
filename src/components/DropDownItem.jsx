import { Link, Navigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGears } from '@fortawesome/free-solid-svg-icons'
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { useEffect, useRef, useState } from 'react';
import { useThemeContext } from '../context/ThemeProvider';


const DropDownItem = (props) => {
    const { theme, toggleTheme, isDarkMode } = useThemeContext();
    const menuRef = useRef();


    useEffect(() => {
        const listener = (ev) => {
            if (!menuRef?.current?.contains(ev.target)) {
                props.setOpenDropDown(false)
            }
        }

        document.addEventListener("mousedown", listener)
        return () => document.removeEventListener("mousedown", listener)
    }, [])

    return (
        <div ref={menuRef} className="dropdown-menu">
            <img className='dropdown-picture' src={props.picture}></img>
            <h3>{`${props.userData.first_name} ${props.userData.last_name}`}</h3>
            <span>{props.type}</span>

            {props.type !== 'admin' && <div><FontAwesomeIcon icon={faGears} /><Link to={'/account-settings'}>Account Settings</Link></div>}
            <DarkModeSwitch
                checked={isDarkMode}
                onChange={toggleTheme}
                size={50}
            />
            <button id='logout_button' onClick={props.logout}>Log Out</button>
        </div>
    );
}


export default DropDownItem;