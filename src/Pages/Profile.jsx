import { useStateContext } from '../context/ContextProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Post from '../components/Post';
import { useNavigate } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { JoinedCommunityCount } from '../components/utils/Membership';

const UserFeed = () => {

    const { user } = useStateContext();
    const storageBaseUrl = import.meta.env.VITE_API_STORAGE_URL;
    const [imageLoading, setImageLoading] = useState(true);
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate('/edit-profile')
    }


    return (
        <div className="authenticated-container">
            <div className="feed">
                <div className='section-header'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none">
                        <path d="M28.7693 29.8187C28.1046 27.9581 26.6399 26.3141 24.6024 25.1415C22.5649 23.9689 20.0684 23.3333 17.5002 23.3333C14.9319 23.3333 12.4355 23.9689 10.3979 25.1415C8.36043 26.3141 6.89574 27.9581 6.23103 29.8187" stroke="#677186" strokeWidth="2.91667" strokeLinecap="round" />
                        <circle cx="17.4998" cy="11.6667" r="5.83333" stroke="#677186" strokeWidth="2.91667" strokeLinecap="round" />
                    </svg>
                    <h3>Profile</h3>
                </div>
                <div className="card">
                    <div className='profile-card'>
                        <div className='edit-profile-button'>
                            <span onClick={handleEdit} className='purple-button'><FontAwesomeIcon icon={faPenToSquare} size="lg" /> <span className="button-text">Edit Profile</span></span>
                        </div>
                        <div className='profile-details'>
                            <div className='left'>
                                <div className='upper-details'>
                                    {imageLoading && <Skeleton className='profile-picture' circle={true} />}
                                    <img style={imageLoading ? { display: 'none' } : { display: 'inline' }} onLoad={() => setImageLoading(false)} class='profile-picture' src={`${storageBaseUrl}/${user.profile_picture}`} alt='Profile Picture' />
                                    <div class='display-name'>
                                        <h2>{user.first_name || <Skeleton />}</h2>
                                        {user.user_name ? `@${user.user_name}` : <Skeleton />}
                                        {user.id ? <JoinedCommunityCount id={user.id} /> : <Skeleton className='skeleton' />}

                                    </div>
                                </div>
                                <div className='lower-details'>
                                </div>
                            </div>
                            <div className='right'>
                                <img src='/level_sample.png' alt='Level'></img>
                                <div id='display-level'>
                                    <h2>Level 1</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="user-posts">
                    <div className="section-header">
                        <img src='/address-card-solid.svg' />
                        <h3>Posts</h3>
                    </div>
                    <div className='posts-col'>
                    </div>

                </div>
            </div>
            <div className="recommended">
            </div>
        </div>
    )
}

export default UserFeed;