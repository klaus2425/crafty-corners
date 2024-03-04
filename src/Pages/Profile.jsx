import { useStateContext } from '../context/ContextProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { UserPost } from '../components/Post';
import { useNavigate } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { JoinedCommunityCount } from '../components/utils/Membership';
import axiosClient from '../axios-client';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loading from '../components/utils/Loading';

const UserFeed = () => {

    const { user } = useStateContext();
    const storageBaseUrl = import.meta.env.VITE_API_STORAGE_URL;
    const [imageLoading, setImageLoading] = useState(true);
    const navigate = useNavigate();
    const [userPosts, setUserPosts] = useState([]);
    const [currentUser, setCurrentUser] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [pageIndex, setPageIndex] = useState(1);


    const fetchNext = () => {
        axiosClient.get(`/user/${user.id}/posts?page=${pageIndex + 1}`)
            .then((res) => {
                setUserPosts(userPosts.concat(res.data.data))
                if (posts.length === res.data.meta.total) {
                    setHasMore(false);
                }
            })

        setPageIndex(pageIndex + 1)
    }

    const getPosts = async () => {
        await axiosClient.get(`/users/${user.id}`)
            .then(res => {
                console.log(res.data.data);
                setCurrentUser(res.data.data);
            })
        axiosClient.get(`/user/${user.id}/posts`)
            .then((res) => {
                setUserPosts(res.data.data);
                console.log(res.data.data);
                if(res.data.data.length === 0) {
                    setHasMore(false);
                }
            })
    }

    useEffect(() => {
        getPosts();
        console.log(`${storageBaseUrl}${user.profile_picture}`);
    }, [user])


    const handleEdit = () => {
        navigate('/edit-profile')
    }


    return (
        <div className="authenticated-container">
            <div className="feed">
                <div className='section-header'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M19.6515 19.4054C20.2043 19.2902 20.5336 18.7117 20.2589 18.2183C19.6533 17.1307 18.6993 16.1749 17.4788 15.4465C15.907 14.5085 13.9812 14 12 14C10.0188 14 8.09292 14.5085 6.52112 15.4465C5.30069 16.1749 4.34666 17.1307 3.74108 18.2183C3.46638 18.7117 3.79562 19.2902 4.34843 19.4054C9.39524 20.4572 14.6047 20.4572 19.6515 19.4054Z" fill="#222222" />
                        <circle cx="12" cy="8" r="5" fill="#222222" />
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
                                    <img style={imageLoading ? { display: 'none' } : { display: 'inline' }} onLoad={() => setImageLoading(false)} className='profile-picture' src={`${storageBaseUrl}${user.profile_picture}`} alt='Profile Picture' />
                                    <div className='display-name'>
                                        <h2>{user.first_name || <Skeleton />}</h2>
                                        {user.user_name ? `@${user.user_name}` : <Skeleton />}
                                        {user.id ? <JoinedCommunityCount id={user?.id} /> : <Skeleton className='skeleton' />}

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
                        <div className="scroll" id="scroll">
                            <InfiniteScroll
                                dataLength={userPosts.length}
                                next={fetchNext}
                                hasMore={hasMore}
                                loader={<Loading />}
                            >
                                {userPosts &&
                                    userPosts.map(p => (
                                        <UserPost key={p.id} post={p} user={currentUser} />
                                    ))
                                }
                            </InfiniteScroll>

                        </div>

                    </div>
                </div>
            </div>
            <div className="recommended">
            </div>
        </div>
    )
}

export default UserFeed;