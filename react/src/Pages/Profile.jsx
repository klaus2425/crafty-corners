import { PropsWithChildren } from 'react';
import { Link, useOutletContext } from 'react-router-dom'


const UserFeed =  () => {
    return (
        <div className="authenticated-container">
            <div className="feed">
                <div className='section-header'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none">
                        <path d="M28.7693 29.8187C28.1046 27.9581 26.6399 26.3141 24.6024 25.1415C22.5649 23.9689 20.0684 23.3333 17.5002 23.3333C14.9319 23.3333 12.4355 23.9689 10.3979 25.1415C8.36043 26.3141 6.89574 27.9581 6.23103 29.8187" stroke="#677186" stroke-width="2.91667" stroke-linecap="round"/>
                        <circle cx="17.4998" cy="11.6667" r="5.83333" stroke="#677186" stroke-width="2.91667" stroke-linecap="round"/>
                    </svg>
                    <h3>Profile</h3>
                </div>
                <div className='profile-card'>
                    <div id='edit-profile-button'>
                        <button className=''>Edit Profile</button>
                    </div>
                    <div className='profile-details'>
                        <img src='/Jaycie.png' alt='Profile Picture'></img>
                    </div>

                </div>
            </div>
            <div className="recommended">
                recommended section
            </div>
        </div>
    )
}

export default UserFeed;