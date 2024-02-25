import { useParams } from 'react-router-dom'
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


const ViewCommunity = () => {
  const [memberCount, setMemberCount] = useState(-1);
  const [community, setCommunity] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState(null);
  const { user } = useStateContext();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [hasMore, setHasMore] = useState(true);


  const getMembers = () => {
    axiosClient.get(`/communities/${id}/users`)
      .then(({ data }) => {
        setMemberCount(data.members.length);
      })
  }


  const getCommunity = () => {
    axiosClient.get(`/communities/${id}`)
      .then(res => {
        setLoading(false);
        setCommunity(res.data.data);
        setImage(import.meta.env.VITE_API_COMMUNITIES_URL + res.data.data.community_photo);
        console.log(res.data.data);
      })
    axiosClient.get(`communities/${id}/posts`)
      .then(res => {
        setPosts(res.data.data)
        console.log(res.data.data);
      })
  }

  const fetchNext = () => {
    axiosClient.get(`/communities/${id}/posts/?page=${pageIndex + 1}`)
      .then((res) => {
        setPosts(posts.concat(res.data.data))
        console.log(posts.concat(res.data.data));
        if (posts.length === res.data.meta.total) {
          setHasMore(false);
        }
      })

    setPageIndex(pageIndex + 1)
  }

  useEffect(() => {
    getMembers();
    getCommunity();
  }, [])

  return (
    <div className="authenticated-container">
      <div className="feed">
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
              {imageLoading && <Skeleton className='community-img' circle={true} />}
              <img style={imageLoading ? { display: 'none' } : { display: 'inline' }} onLoad={() => setImageLoading(false)} className='community-img' src={image} />
              <div className="com-name-join">
                <div className="community-text">
                  <span className='community-name'>{community.name || <Skeleton containerClassName='community-name' />}</span>
                  <span className='com-desc'>{community.description || <Skeleton />}</span>
                  <span className='community-count'> {memberCount >= 0 ? <span><strong>{memberCount}</strong> {memberCount === 1 ? 'Member' : 'Members'}</span> : <Skeleton />}</span>
                </div>
                <div className='community-join'>
                  {!loading &&
                    <MembershipCheck community_id={community.id} user_id={user.id} />
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="community-posts">
          <div className="section-header">
            <div className='left'>
              <img src='/address-card-solid.svg' />
              <h3>Posts</h3>
            </div>
            <div className="right">
              {!loading &&
                <span onClick={() => setIsOpen(true)} className='purple-button'>Create a Post</span>
              }
            </div>
          </div>
          <div id='scroll' className='scroll'>
            <InfiniteScroll dataLength={posts.length} next={fetchNext} hasMore={hasMore} loader={<Loading />}
              endMessage={
                <div style={{ textAlign: 'center' }}>
                  <h2>End of Feed</h2>
                </div>
              }
            >
              {posts.map(p => (
                <Post key={p.id} post={p} community={community} />
              )
              )
              }
            </InfiniteScroll>

          </div>
          <PostModal getCommunity={getCommunity} isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      </div>
      <div className="recommended">

      </div>
    </div>

  )
}

export default ViewCommunity;