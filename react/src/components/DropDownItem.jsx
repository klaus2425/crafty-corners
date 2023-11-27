import { Link, Navigate } from 'react-router-dom'



const DropDownItem = (props) => {


    return(
        <div className="dropdown-menu">
            <img className='dropdown-picture'src={props.picture}></img>
            <h3>{`${props.userData.first_name} ${props.userData.last_name}`}</h3>
            <span>{props.type}</span>
            <Link>Account Settings</Link>
            <button id='logout_button'onClick={props.logout}>Log Out</button>
        </div>
    );
}


export default DropDownItem;