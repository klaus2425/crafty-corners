import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import InfiniteScroll from 'react-infinite-scroll-component';
import axiosClient from '../axios-client';
import UserNotifications from '../components/UserNotifications';
import Loading from '../components/utils/Loading';
import { useStateContext } from '../context/ContextProvider';
import RecommendedCard from '../components/RecommendedCard';


const UserFeed = () => {

    const storageUrl = import.meta.env.VITE_API_STORAGE_URL;
    const queryClient = useQueryClient();
    const { user } = useStateContext();


    const getNotifications = async (pageParam) => {
        const fetchedData = await axiosClient.get(`/notifications?page=${pageParam}`)
        return { ...fetchedData.data, prevPage: pageParam };
    }

    const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery({
        queryKey: ['notifications'],
        queryFn: ({ pageParam }) => getNotifications(pageParam),
        getNextPageParam: (lastPage) => {
            if (lastPage.meta.current_page + 1 > lastPage.meta.last_page) {
                return null;
            }
            return lastPage.meta.current_page + 1
        }
    })

    const fetchedNotifications = data?.pages.reduce((acc, page) => {
        return [...acc, page.data];
    }, []);

    return (

        <div className="authenticated-container">
            <div className="feed" id='feed'>
                <div className='section-header'>
                    <div className="flex flex--justify-space-between w-100 gap-1">
                        <div className='flex align-center'>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.50248 6.97519C6.78492 4.15083 9.16156 2 12 2C14.8384 2 17.2151 4.15083 17.4975 6.97519L17.7841 9.84133C17.8016 10.0156 17.8103 10.1028 17.8207 10.1885C17.9649 11.3717 18.3717 12.5077 19.0113 13.5135C19.0576 13.5865 19.1062 13.6593 19.2034 13.8051L20.0645 15.0968C20.8508 16.2763 21.244 16.866 21.0715 17.3412C21.0388 17.4311 20.9935 17.5158 20.9368 17.5928C20.6371 18 19.9283 18 18.5108 18H5.48923C4.07168 18 3.36291 18 3.06318 17.5928C3.00651 17.5158 2.96117 17.4311 2.92854 17.3412C2.75601 16.866 3.14916 16.2763 3.93548 15.0968L4.79661 13.8051C4.89378 13.6593 4.94236 13.5865 4.98873 13.5135C5.62832 12.5077 6.03508 11.3717 6.17927 10.1885C6.18972 10.1028 6.19844 10.0156 6.21587 9.84133L6.50248 6.97519Z" fill="#222222" />
                                <path d="M10.0681 20.6294C10.1821 20.7357 10.4332 20.8297 10.7825 20.8967C11.1318 20.9637 11.5597 21 12 21C12.4403 21 12.8682 20.9637 13.2175 20.8967C13.5668 20.8297 13.8179 20.7357 13.9319 20.6294" stroke="#222222" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                            <h3>Notifications</h3>
                        </div>
                        <span onClick={() => axiosClient.post('/notifications/mark-all-as-read')
                            .then(() => queryClient.invalidateQueries('notifications'))
                        } className='mark-all-span'>Mark All As Read</span>
                    </div>

                </div>
                {
                    !isLoading
                        ?
                        <InfiniteScroll
                            scrollableTarget='feed'
                            dataLength={fetchedNotifications ? fetchedNotifications.length : 0}
                            next={fetchNextPage}
                            hasMore={hasNextPage}
                            loader={<Loading />}
                            style={{ width: '100%' }}
                            endMessage={
                                <div style={{ textAlign: 'center' }}>
                                    <h2>End of Notifications</h2>
                                </div>
                            }>
                            {
                                fetchedNotifications &&
                                fetchedNotifications.map((notifications) => (
                                    notifications.map(notification => (
                                        <UserNotifications uid={user.id} created_at={notification.created_at} post_id={notification.data.post_id} type={notification.type}
                                            notifier={notification.data.first_name + ' ' + notification.data.last_name} id={notification.id}
                                            notifierImage={storageUrl + notification.data.profile_picture} community={notification.data.community_name} read={notification.read_at ? true : false}
                                            message={notification.data.message}
                                        />
                                    ))
                                ))
                            }
                        </InfiniteScroll>
                        :
                        <Loading />
                }
            </div>
            <div className="recommended">
            </div>
        </div>
    )
}

export default UserFeed;

