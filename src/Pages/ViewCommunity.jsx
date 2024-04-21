import ProgressBar from '@ramonak/react-progress-bar';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { Suspense, lazy, useEffect, useState, useCallback } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosClient from '../axios-client';
import Post from '../components/Post';
import Loading from '../components/utils/Loading';
import MembershipCheck from '../components/utils/Membership';


const ViewCommunity = () => {
  const PostModal = lazy(() => import('../components/PostModal'));
  const [isOpen, setIsOpen] = useState(false);
  const [topic, setTopic] = useState();
  const [topicActive, setTopicActive] = useState(false)
  const navigate = useNavigate();
  const id = useLocation().state?.id;
  const storageBaseUrl = import.meta.env.VITE_API_COMMUNITIES_URL;

  const getMentors = async () => {
    const fetchedData = await axiosClient.get(`show-mentors-of-community/${id}`);
    return fetchedData.data;
  }

  const useMentors = useQuery({
    queryKey: [`mentors-${id}`],
    queryFn: getMentors,
  })

  const useTopics = useQuery({
    queryKey: ['topics'],
    queryFn: () => axiosClient.get(`/community/${id}/subtopics`)
      .then(({ data }) => data.subtopics)
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
    const fetchedData = await axiosClient.get(`communities/${id}/posts?page=${pageParam}`);
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





  const getTopicPosts = async (pageParam, newTopic) => {
    const fetchedData = await axiosClient.get(`subtopic/${id}/posts?subtopic=${newTopic}`);
    return { ...fetchedData.data, prevPage: pageParam };
  }

  const useTopicPosts = useInfiniteQuery({
    queryKey: [`community-${id}-topic${topic}-posts`],
    queryFn: ({ pageParam }) => getTopicPosts(pageParam, topic),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      // if (lastPage.meta.current_page + 1 > lastPage.meta.last_page) {
      //   return null;
      // }
      // return lastPage.meta.current_page + 1
    },
    retry: false,
    enabled: !!topic,
  })


  const handleTopicClick = (newTopic) => {
    setTopic(newTopic);
    setTopicActive(true)
  };

  const fetchedTopicPosts = useTopicPosts.data?.pages.reduce((acc, page) => {
    return [...acc, page.data];
  }, [])



  useEffect(() => {
    if (id === undefined) {
      navigate(`/communities`)
    }
  }, [])

  return (
    <div className="authenticated-container">
      {
        isOpen &&
        <Suspense>
          <PostModal isOpen={isOpen} topics={useTopics.data} setIsOpen={setIsOpen} />
        </Suspense>
      }
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
                    <MembershipCheck isMember={useCommunity.data?.is_user_member} community_id={id} />
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="community-posts">
          <div className="section-header">
            <div className='left' onClick={() => setTopicActive(false)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M5 2C3.34315 2 2 3.34315 2 5V19C2 20.6569 3.34315 22 5 22H13V17L13 16.9384C12.9999 16.2843 12.9999 15.6965 13.0638 15.2208C13.1337 14.7015 13.2958 14.1687 13.7322 13.7322C14.1687 13.2958 14.7015 13.1337 15.2208 13.0638C15.6966 12.9999 16.2843 12.9999 16.9384 13L17 13H22V5C22 3.34315 20.6569 2 19 2H5ZM21.7305 15H17C16.2646 15 15.8137 15.0021 15.4873 15.046C15.2005 15.0846 15.1526 15.1394 15.1469 15.1459L15.1464 15.1464L15.1459 15.1469C15.1394 15.1526 15.0846 15.2005 15.046 15.4873C15.0021 15.8137 15 16.2646 15 17V21.7305C15.324 21.5831 15.6222 21.3778 15.8787 21.1213L21.1213 15.8787C21.3778 15.6222 21.5831 15.324 21.7305 15Z" fill="#222222" />
              </svg>
              <h3>Posts</h3>
            </div>
            <div className="right">
              {useCommunity.data?.is_user_member &&
                <span onClick={() => setIsOpen(true)} className='purple-button'>Create a Post</span>
              }
            </div>
          </div>
          {
            !topicActive ?
              usePosts.data ?
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
              :
              !useTopicPosts.error ?
                useTopicPosts.data ?
                  <InfiniteScroll
                    scrollableTarget='feed'
                    dataLength={fetchedTopicPosts ? fetchedTopicPosts.length : 0}
                    next={useTopicPosts.fetchNextPage}
                    hasMore={useTopicPosts.hasNextPage}
                    loader={<Loading />}
                    endMessage={
                      <div style={{ textAlign: 'center' }}>
                        <h2>End of Feed</h2>
                      </div>
                    }
                  >
                    {useCommunity.data && useTopicPosts.data && fetchedTopicPosts.map(posts => (
                      posts.map(p => (
                        <Post key={p.id} post={p} community={useCommunity.data} />
                      ))
                    )
                    )
                    }
                  </InfiniteScroll>
                  :
                  <Loading />

                :
                <h1>No posts for this topic yet</h1>


          }
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
            useMentors.data &&
              useMentors.data.length > 0 ?
              useMentors.data?.map((mentor, index) => (
                <div key={mentor.id} onClick={() => navigate(`/u/${mentor.user_id}`)} className='community-mentor-item'>
                  <div className="mentor-top">
                    <div>
                      <span className='mentor-name-top'>{index + 1}. {mentor.user.first_name} {mentor.user.last_name}</span>
                      <span className='mentor-specialization-bottom'> {mentor.specialization}</span>
                      <span className='mentor-specialization-bottom'>{mentor.like_counts}
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7.30725 4.21991C7.94932 2.61922 8.27036 1.81888 8.79193 1.70796C8.92908 1.67879 9.07083 1.67879 9.20797 1.70796C9.72955 1.81888 10.0506 2.61922 10.6927 4.21991C11.0578 5.13019 11.2404 5.58533 11.582 5.8949C11.6778 5.98173 11.7818 6.05906 11.8926 6.12581C12.2874 6.36378 12.7803 6.40793 13.7661 6.49621C15.4348 6.64566 16.2692 6.72039 16.524 7.19613C16.5768 7.29466 16.6127 7.40134 16.6302 7.51174C16.7146 8.04476 16.1012 8.60282 14.8744 9.71894L14.5338 10.0289C13.9602 10.5507 13.6735 10.8116 13.5076 11.1372C13.4081 11.3325 13.3414 11.5429 13.3101 11.7598C13.258 12.1215 13.342 12.5 13.5099 13.257L13.5699 13.5275C13.8711 14.885 14.0217 15.5637 13.8337 15.8974C13.6649 16.1971 13.3538 16.3889 13.0102 16.4053C12.6277 16.4236 12.0887 15.9844 11.0107 15.106C10.3005 14.5273 9.94542 14.2379 9.55121 14.1249C9.19097 14.0216 8.80894 14.0216 8.44869 14.1249C8.05448 14.2379 7.69938 14.5273 6.98917 15.106C5.91119 15.9844 5.37221 16.4236 4.98968 16.4053C4.64609 16.3889 4.33504 16.1971 4.16617 15.8974C3.97818 15.5637 4.12878 14.885 4.42997 13.5275L4.48998 13.257C4.65794 12.5 4.74191 12.1215 4.6898 11.7598C4.65854 11.5429 4.59182 11.3325 4.49232 11.1372C4.32645 10.8116 4.03968 10.5507 3.46613 10.0289L3.12546 9.71895C1.89867 8.60282 1.28527 8.04476 1.36975 7.51174C1.38724 7.40134 1.42312 7.29466 1.47589 7.19613C1.73069 6.72039 2.56507 6.64566 4.23384 6.49621C5.21962 6.40793 5.71251 6.36378 6.10735 6.12581C6.2181 6.05906 6.32211 5.98173 6.41793 5.8949C6.75954 5.58533 6.94211 5.13019 7.30725 4.21991Z" fill="#222222" stroke="#222222" strokeWidth="2" />
                        </svg>
                      </span>
                    </div>
                    <img className='mentor-list__picture' src={import.meta.env.VITE_API_STORAGE_URL + mentor.user.profile_picture} alt="" />
                  </div>
                  <div className="mentor-bottom">
                  </div>
                </div>
              ))
              :
              <span>No mentors for this community yet</span>
          }
        </div>
        <div className="card">
          <span className="card__header">
            Community Topics
          </span>
          <div className="community-topic-container">
            {
              useCommunity.data && useCommunity.data.subtopics.map(ctopic =>
              (
                <span className='community-topic-container__topics' onClick={() => handleTopicClick(ctopic)}>{ctopic}</span>
              )
              )
            }
          </div>
        </div>
      </div>
    </div>

  )
}

export default ViewCommunity;