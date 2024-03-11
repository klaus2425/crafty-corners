import { useEffect, useState } from 'react'
import Post from '../components/Post'
import RecommendedCommunities from '../components/RecommendedCommunities'
import axiosClient from '../axios-client';
import InfiniteScroll from 'react-infinite-scroll-component'
import Loading from '../components/utils/Loading';

const UserFeed = () => {

    const [posts, setPosts] = useState([]);
    const [pageIndex, setPageIndex] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const getPosts = () => {
        axiosClient.get('/homepage-post?page=1')
            .then(res => {
                console.log(res.data);
                setPosts(res.data.data);
                if (res.data.data.length === 0) {
                    setHasMore(false);
                }
            })
    }

    useEffect(() => {
        getPosts();
    }, [])

    const fetchNext = () => {
        axiosClient.get(`/homepage-post?page=${pageIndex + 1}`)
            .then((res) => {
                setPosts(posts.concat(res.data.data))
                console.log(res.data.data);
                if (posts.length === res.data.meta.total) {
                    setHasMore(false);
                }
            })

        setPageIndex(pageIndex + 1)
    }

    return (
        <div className="authenticated-container">
            <div id="feed" className="feed">
                <div className='section-header'>
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M5.27446 10.1262C5 10.7229 5 11.4018 5 12.7595V16.9999C5 18.8856 5 19.8284 5.58579 20.4142C6.11733 20.9457 6.94285 20.9949 8.5 20.9995V16C8.5 14.8954 9.39543 14 10.5 14H13.5C14.6046 14 15.5 14.8954 15.5 16V20.9995C17.0572 20.9949 17.8827 20.9457 18.4142 20.4142C19 19.8284 19 18.8856 19 16.9999V12.7595C19 11.4018 19 10.7229 18.7255 10.1262C18.4511 9.52943 17.9356 9.08763 16.9047 8.20401L15.9047 7.34687C14.0414 5.74974 13.1098 4.95117 12 4.95117C10.8902 4.95117 9.95857 5.74974 8.09525 7.34687L7.09525 8.20401C6.06437 9.08763 5.54892 9.52943 5.27446 10.1262ZM13.5 20.9999V16H10.5V20.9999H13.5Z" fill="#222222" />
                    </svg>

                    <h3>Home</h3>
                </div>
                <div id='scroll' className='scroll'>
                    <InfiniteScroll scrollableTarget='scroll' dataLength={posts.length} next={fetchNext} hasMore={hasMore} loader={<Loading />}
                        endMessage={
                            <div style={{ textAlign: 'center' }}>
                                <h2>End of Feed</h2>
                            </div>

                        }>
                        {posts.map(p => (
                            <Post key={p.id} post={p} community={p.community} />
                        ))
                        }
                    </InfiniteScroll>
                </div>

            </div>
            <div className="recommended">

                <div className="card">
                    <h3>Recommended Communities</h3>
                    <RecommendedCommunities communityName='Gaming' communityMemberCount='140' communityId='1' communityIcon='/gamepad-solid.svg' rank='1' />
                    <RecommendedCommunities communityName='Singing' communityMemberCount='40' communityId='2' communityIcon='/music-solid.svg' rank='2' />
                    <RecommendedCommunities communityName='Painting' communityMemberCount='340' communityId='3' communityIcon='/paintbrush-solid.svg' rank='3' />
                    <RecommendedCommunities communityName='Knitting' communityMemberCount='60' communityId='4' communityIcon='/mitten-solid.svg' rank='4' />
                    <RecommendedCommunities communityName='Dancing' communityMemberCount='180' communityId='5' communityIcon='/dance.png' rank='5' />

                </div>


            </div>
        </div>
    )
}

export default UserFeed;