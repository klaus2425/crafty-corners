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
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

const UserFeed = () => {

    const { user } = useStateContext();
    const storageBaseUrl = import.meta.env.VITE_API_STORAGE_URL;
    const [imageLoading, setImageLoading] = useState(true);
    const navigate = useNavigate();
    const [userPosts, setUserPosts] = useState([]);
    const [currentUser, setCurrentUser] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [pageIndex, setPageIndex] = useState(1);



    const getPosts = async ({ pageParam }) => {
        const fetchedData  = await axiosClient.get(`/user/${user.id}/posts?page=${pageParam}`)
            .then((res) => res)
            console.log(fetchedData);
        return ({...fetchedData, prevPage: pageParam})
    }


    const {data, fetchNextPage, hasNextpage } = useInfiniteQuery({
        queryKey: ['posts'],
        queryFn: getPosts,
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages, lastPageParam) => {
            console.log(lastPage.data.meta);
            if (lastPage.data.meta.current_page + 1 > lastPage.data.meta.last_page) {
                return false
            }

            return lastPage.data.meta.current_page + 1
          
        }
    })

    const posts = data?.pages.reduce((acc, page) => {
        console.log(acc);
        console.log(page.data.data);
        return [...acc, page.data.data];
    }, [])
    console.log('GetPost', posts);


    // const fetchNext = () => {
    //     console.log('fetching next');
    //     axiosClient.get(`/user/${user.id}/posts?page=${pageIndex + 1}`)
    //         .then((res) => {
    //             console.log('fetchnext');
    //             setUserPosts(userPosts.concat(res.data.data))
    //             if (posts.length === res.data.meta.total) {
    //                 setHasMore(false);
    //             }
    //         })
    //     setPageIndex(pageIndex + 1)
    // }



    const getUser = () => {
        axiosClient.get(`/users/${user.id}`)
            .then(res => {
                console.log('Current User', res.data.data.id);
                setCurrentUser(res.data.data);
            })
    }

    const handleEdit = () => {
        navigate('/edit-profile')
    }

    useEffect(() => {
        getPosts();
        getUser();
    }, [])






    return (
        <div className="authenticated-container">
            <div className="feed" id='feed'>
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
                                        <h2>{user.first_name || <Skeleton />}</h2>
                                        {user.user_name ? `@${user.user_name}` : <Skeleton />} <br />
                                        {/* {!usePosts.isLoading ? `${currentUser?.communities?.length} Communities` : '0 Communities'} */}
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
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M2 10C2 6.22876 2 4.34315 3.17157 3.17157C4.34315 2 6.22876 2 10 2H14C17.7712 2 19.6569 2 20.8284 3.17157C22 4.34315 22 6.22876 22 10V14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V10ZM7.73867 16.4465C8.96118 15.5085 10.4591 15 12 15C13.5409 15 15.0388 15.5085 16.2613 16.4465C17.4838 17.3846 18.3627 18.6998 18.7615 20.1883C18.9044 20.7217 18.5878 21.2701 18.0544 21.413C17.5209 21.556 16.9726 21.2394 16.8296 20.7059C16.5448 19.6427 15.917 18.7033 15.0438 18.0332C14.1706 17.3632 13.1007 17 12 17C10.8993 17 9.82942 17.3632 8.95619 18.0332C8.08297 18.7033 7.45525 19.6427 7.17037 20.7059C7.02743 21.2394 6.47909 21.556 5.94563 21.413C5.41216 21.2701 5.09558 20.7217 5.23852 20.1883C5.63734 18.6998 6.51616 17.3846 7.73867 16.4465ZM10 9C10 7.89543 10.8954 7 12 7C13.1046 7 14 7.89543 14 9C14 10.1046 13.1046 11 12 11C10.8954 11 10 10.1046 10 9ZM12 5C9.79086 5 8 6.79086 8 9C8 11.2091 9.79086 13 12 13C14.2091 13 16 11.2091 16 9C16 6.79086 14.2091 5 12 5Z" fill="#222222" />
                            <rect x="2.5" y="2.5" width="19" height="19" rx="3.5" stroke="#222222" />
                        </svg>
                        <h3>Posts</h3>
                    </div>
                    <div className='posts-col' >
                        <InfiniteScroll scrollableTarget='feed' dataLength={userPosts.length} next={fetchNextPage} hasMore={hasNextpage} loader={<Loading />}
                            endMessage={
                                <div style={{ textAlign: 'center' }}>
                                    <h2>End of Feed</h2>
                                </div>

                            }>
                            {userPosts &&
                                userPosts.map(p => (
                                    <UserPost key={p.id} post={p} user={currentUser} />
                                ))
                            }
                        </InfiniteScroll>
                    </div>
                </div>
            </div>
            <div className="recommended">
            </div>
        </div>
    )
}

export default UserFeed;