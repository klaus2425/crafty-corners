import { Link, Navigate } from 'react-router-dom'
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axios-client";


const DropDownItem = (props) => {


    return(
        <div className="dropdown-menu">
            <img className='dropdown-picture'src={props.picture}></img>
            <h3>{`${props.userData.first_name} ${props.userData.last_name}`}</h3>
            <Link>Account Settings</Link>
            <button id='logout_button'onClick={props.logout}>Log Out</button>
        </div>
    );
}


export default DropDownItem;