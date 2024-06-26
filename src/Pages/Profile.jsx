import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useInfiniteQuery, useQuery, } from '@tanstack/react-query';
import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../axios-client';
import { UserPost } from '../components/Post';
import Loading from '../components/utils/Loading';
import { useStateContext } from '../context/ContextProvider';

const UserFeed = () => {
    const { user } = useStateContext();
    const storageBaseUrl = import.meta.env.VITE_API_STORAGE_URL;
    const [imageLoading, setImageLoading] = useState(true);
    const navigate = useNavigate();

    const getPosts = async (page) => {
        const fetchedData = await axiosClient.get(`/user/${user.id}/posts?page=${page}`)
        .catch(() => navigate('/home', {state: {id: user.id}})); 
        return { ...fetchedData.data, prevPage: page }
    }
    const { data, fetchNextPage, hasNextPage, } = useInfiniteQuery({
        queryKey: ['user-posts'],
        queryFn: ({ pageParam }) => getPosts(pageParam,  user.id),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            if (lastPage.meta.current_page + 1 > lastPage.meta.last_page) {
                return null;
            }
            return lastPage.meta.current_page + 1
        }
    });

    const userData = useQuery({
        queryKey: ['user-profile'], queryFn: () => axiosClient.get(`/users/${user.id}`)
            .then((res) => res)
    })

    const posts = data?.pages.reduce((acc, page) => {
        return [...acc, page.data];
    }, [])

    const handleEdit = () => {
        navigate('/edit-profile')
    }


    return (
        <div className="authenticated-container">
            <div className='feed' id='feed'>
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
                                    <img style={imageLoading ? { display: 'none' } : { display: 'inline' }} onLoad={() => setImageLoading(false)} className='profile-picture' src={`${storageBaseUrl}/${user.profile_picture}`} alt='Profile Picture' />
                                    <div className='display-name'>
                                        {
                                            user.first_name ? <h2>{user.first_name + ' ' + user.last_name}</h2> : <Skeleton />
                                        }
                                        <span>{user.sex ? user.sex : <Skeleton />}</span>
                                        <span>{!userData.isLoading ? `@${userData?.data?.data?.data?.user_name}` : <Skeleton />}</span>
                                        <span><strong>{!userData.isLoading ? `${userData.data.data.data.communities.length} Communities` : <Skeleton />}</strong></span>
                                    </div>
                                </div>
                                <div className='lower-details'>
                                </div>
                            </div>
                            <div onClick={() => navigate(`/user-badges/?uid=${user.id}`)} className='right'>
                                <svg width="113" height="113" viewBox="0 0 113 113" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="56.75" cy="56.75" r="42.1875" fill="#EFBD0B" stroke="#222222" strokeWidth="4.6875" />
                                    <circle cx="56.6512" cy="56.6513" r="24.1776" fill="#6339DC" stroke="#222222" strokeWidth="6.0444" />
                                    <path d="M56.75 14.5625V31.8816M84.875 84.875L75.4013 75.4013M84.875 28.625L75.4013 38.0987M14.5625 56.75H30.4013" stroke="#222222" strokeWidth="4.6875" strokeLinecap="round" />
                                    <path d="M55.2565 43.6752C55.9559 42.589 57.5441 42.589 58.2435 43.6752L61.8846 49.33C62.1397 49.7261 62.5418 50.0047 63.0023 50.1044L69.6887 51.5518C71.0343 51.843 71.5514 53.488 70.6145 54.4967L66.2433 59.2032C65.8993 59.5735 65.7294 60.0729 65.7761 60.5762L66.3629 66.8958C66.4854 68.2152 65.1723 69.1994 63.9403 68.7116L57.404 66.1235C56.9839 65.9571 56.5162 65.9571 56.0961 66.1235L49.5598 68.7116C48.3277 69.1994 47.0146 68.2152 47.1371 66.8958L47.7239 60.5762C47.7707 60.0729 47.6008 59.5735 47.2568 59.2032L42.8856 54.4967C41.9487 53.488 42.4658 51.843 43.8113 51.5518L50.4977 50.1044C50.9583 50.0047 51.3603 49.7261 51.6154 49.33L55.2565 43.6752Z" fill="#EFBD0B" />
                                </svg>

                                <div id='display-level'>
                                    <h3>Your Badges</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="user-posts">
                    <div className="section-header">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M2 10C2 6.22876 2 4.34315 3.17157 3.17157C4.34315 2 6.22876 2 10 2H14C17.7712 2 19.6569 2 20.8284 3.17157C22 4.34315 22 6.22876 22 10V14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V10ZM7.73867 16.4465C8.96118 15.5085 10.4591 15 12 15C13.5409 15 15.0388 15.5085 16.2613 16.4465C17.4838 17.3846 18.3627 18.6998 18.7615 20.1883C18.9044 20.7217 18.5878 21.2701 18.0544 21.413C17.5209 21.556 16.9726 21.2394 16.8296 20.7059C16.5448 19.6427 15.917 18.7033 15.0438 18.0332C14.1706 17.3632 13.1007 17 12 17C10.8993 17 9.82942 17.3632 8.95619 18.0332C8.08297 18.7033 7.45525 19.6427 7.17037 20.7059C7.02743 21.2394 6.47909 21.556 5.94563 21.413C5.41216 21.2701 5.09558 20.7217 5.23852 20.1883C5.63734 18.6998 6.51616 17.3846 7.73867 16.4465ZM10 9C10 7.89543 10.8954 7 12 7C13.1046 7 14 7.89543 14 9C14 10.1046 13.1046 11 12 11C10.8954 11 10 10.1046 10 9ZM12 5C9.79086 5 8 6.79086 8 9C8 11.2091 9.79086 13 12 13C14.2091 13 16 11.2091 16 9C16 6.79086 14.2091 5 12 5Z" fill="#222222" />
                            <rect x="2.5" y="2.5" width="19" height="19" rx="3.5" stroke="#222222" />
                        </svg>
                        <h3>Posts</h3>
                    </div>
                        {
                            posts ?
                                <InfiniteScroll
                                    scrollableTarget='feed'
                                    dataLength={posts ? posts.length : 0}
                                    next={fetchNextPage}
                                    hasMore={hasNextPage}
                                    loader={<Loading />}
                                    endMessage={
                                        <div style={{ textAlign: 'center' }}>
                                            <h2>End of Feed</h2>
                                        </div>
                                    }>
                                    {
                                        posts &&
                                        posts.map((post) => (
                                            post.map(p => (
                                                <UserPost key={p.id} post={p} user={user} />
                                            ))
                                        ))
                                    }
                                </InfiniteScroll>
                                :
                                <Loading />
                        }
                </div>
            </div>
            <div className="recommended">
            </div>
        </div>
    )
}

export default UserFeed;