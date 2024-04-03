import { useNavigate, useParams } from 'react-router-dom'
import MembershipCheck from '../components/utils/Membership';
import axiosClient from '../axios-client';
import { useEffect, useState } from 'react';
import { useStateContext } from "../context/ContextProvider";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import PostModal from '../components/PostModal';
import Post from '../components/Post';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loading from '../components/utils/Loading';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import ProgressBar from '@ramonak/react-progress-bar';


const ViewCommunity = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { id } = useParams();
  const params = new URLSearchParams(window.location.search);
  const uid = params.get('uid')
  const navigate = useNavigate();
  const storageBaseUrl = import.meta.env.VITE_API_COMMUNITIES_URL;

  const getMentors = async () => {
    const fetchedData = await axiosClient.get(`show-mentors-of-community/${id}`);
    return fetchedData.data.data;
  }

  const useMentors = useQuery({
    queryKey: ['mentors'],
    queryFn: getMentors,
  })

  const getCommunityData = async () => {
    const fetchedData = await axiosClient.get(`/communities/${id}`)
    return fetchedData.data.data;
  }
  const useCommunity = useQuery({
    queryKey: [`community-${id}`],
    queryFn: getCommunityData,
  })

  const getPosts = async (pageParam) => {
    const fetchedData = await axiosClient.get(`communities/${id}/posts?page${pageParam}`);
    return { ...fetchedData.data, prevPage: pageParam };
  }

  const usePosts = useInfiniteQuery({
    queryKey: [`community-posts-${id}`],
    queryFn: ({ pageParam }) => getPosts(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.meta.current_page + 1 > lastPage.meta.last_page) {
        return null;
      }
      return lastPage.meta.current_page + 1
    }
  })


  const fetchedPosts = usePosts.data?.pages.reduce((acc, page) => {
    return [...acc, page.data];
  }, [])

  return (
    <div className="authenticated-container">
      <div className="feed" id='feed'>
        <div className='section-header'>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="9" r="4" fill="#33363F" />
            <circle cx="17" cy="9" r="3" fill="#33363F" />
            <circle cx="7" cy="9" r="3" fill="#33363F" />
            <path fillRule="evenodd" clipRule="evenodd" d="M17.5685 18H19.895C20.4867 18 20.9403 17.4901 20.7966 16.9162C20.4284 15.4458 19.448 13 17 13C16.114 13 15.4201 13.3205 14.8781 13.7991C16.3858 14.7773 17.1654 16.4902 17.5685 18Z" fill="#33363F" />
            <path fillRule="evenodd" clipRule="evenodd" d="M9.12197 13.7991C8.57989 13.3205 7.88609 13 7 13C4.55208 13 3.57166 15.4458 3.20343 16.9162C3.05971 17.4901 3.51335 18 4.10498 18H6.43155C6.83464 16.4902 7.61422 14.7773 9.12197 13.7991Z" fill="#33363F" />
            <path d="M12 14C15.7087 14 16.6665 17.301 16.9139 19.0061C16.9932 19.5526 16.5523 20 16 20H8C7.44772 20 7.00684 19.5526 7.08614 19.0061C7.33351 17.301 8.29134 14 12 14Z" fill="#33363F" />
          </svg>
          <h3>Community</h3>
        </div>
        <div className="card">
          <div className="banner">
            <img className='banner-img' src="/banner.png" />
            <div className='community-details'>
              {!useCommunity.data && <Skeleton className='community-img' circle={true} />}
              <img style={!useCommunity.data ? { display: 'none' } : { display: 'inline' }} className='community-img' src={storageBaseUrl + useCommunity.data?.community_photo} />
              <div className="com-name-join">
                <div className="community-text">
                  <span className='community-name'>{useCommunity.data?.name || <Skeleton containerClassName='community-name' />}</span>
                  <span className='com-desc'>{useCommunity.data?.description || <Skeleton />}</span>
                  <span className='community-count'> {useCommunity.data?.members_count >= 0 ? <span><strong>{useCommunity.data?.members_count}</strong> {useCommunity.data?.members_count === 1 ? 'Member' : 'Members'}</span> : <Skeleton />}</span>
                </div>
                <div className='community-join'>
                  {useCommunity.data &&
                    <MembershipCheck isMember={useCommunity.data?.is_user_member} community_id={id} user_id={uid} />
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="community-posts">
          <div className="section-header">
            <div className='left'>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M5 2C3.34315 2 2 3.34315 2 5V19C2 20.6569 3.34315 22 5 22H13V17L13 16.9384C12.9999 16.2843 12.9999 15.6965 13.0638 15.2208C13.1337 14.7015 13.2958 14.1687 13.7322 13.7322C14.1687 13.2958 14.7015 13.1337 15.2208 13.0638C15.6966 12.9999 16.2843 12.9999 16.9384 13L17 13H22V5C22 3.34315 20.6569 2 19 2H5ZM21.7305 15H17C16.2646 15 15.8137 15.0021 15.4873 15.046C15.2005 15.0846 15.1526 15.1394 15.1469 15.1459L15.1464 15.1464L15.1459 15.1469C15.1394 15.1526 15.0846 15.2005 15.046 15.4873C15.0021 15.8137 15 16.2646 15 17V21.7305C15.324 21.5831 15.6222 21.3778 15.8787 21.1213L21.1213 15.8787C21.3778 15.6222 21.5831 15.324 21.7305 15Z" fill="#222222" />
              </svg>

              <h3>Posts</h3>
            </div>
            <div className="right">
              {!useCommunity.isLoading &&
                <span onClick={() => setIsOpen(true)} className='purple-button'>Create a Post</span>
              }
            </div>
          </div>
          {usePosts.data ?
            <InfiniteScroll
              scrollableTarget='feed'
              dataLength={fetchedPosts ? fetchedPosts.length : 0}
              next={usePosts.fetchNextPage}
              hasMore={usePosts.hasNextPage}
              loader={<Loading />}
              endMessage={
                <div style={{ textAlign: 'center' }}>
                  <h2>End of Feed</h2>
                </div>
              }
            >
              {useCommunity.data && usePosts.data && fetchedPosts.map(posts => (
                posts.map(p => (
                  <Post key={p.id} post={p} community={useCommunity.data} />
                ))
              )
              )
              }
            </InfiniteScroll>
            :
            <Loading />
          }
          <PostModal isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      </div>
      <div className="recommended">
        {
          useCommunity.data?.is_user_member ?
            <div className="card" id='community-level-card'>
              <h3>Community Progress</h3>
              <img id='badge' src={`/${useCommunity.data?.badge}`} alt='badge' />
              <ProgressBar completedClassName="barCompleted" className='levelProgressBar' barContainerClassName='barContainer' height='1.5rem' width={150} completed={`${useCommunity.data?.user_experience_points}` || 0} maxCompleted={useCommunity.data?.next_level_experience || 0} />
              <span className='points-needed'>{useCommunity.data?.next_level_experience - useCommunity.data?.user_experience_points} more points to go</span>
              <span className='user-level'>Level {useCommunity.data?.user_level}</span>
            </div>
            :
            <div className="card" id='community-level-card-blurred'>
              <h3>Community Progress</h3>
              <img id='badge' src={`/Beginner.svg`} alt='badge' />
              <ProgressBar height='1.5rem' width={150} completed={0} maxCompleted={1000} />
              <span className='points-needed'>1000 more points to go</span>
              <span className='user-level'>Level 1</span>
              <div className='blur'>
                Join this community to make progress
              </div>
            </div>
        }

        <div className="card">
          <h3>Community Mentors</h3>
          {
            useMentors ? useMentors.data?.map((mentor, index) => (
              <div key={mentor.id} onClick={() => navigate(`/u/${mentor.user_id}`)} className='community-mentor-item'>
                <span className='mentor-name-top'>{index + 1}. {mentor.user.first_name} {mentor.user.last_name}</span>
                <span className='mentor-specialization-bottom'> {mentor.specialization}</span>
              </div>
            ))
              :
              <span>No mentors for this Community yet</span>
          }
        </div>
      </div>
    </div>

  )
}

export default ViewCommunity;