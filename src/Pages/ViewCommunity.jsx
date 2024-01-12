import {useParams} from 'react-router-dom'
import MembershipCheck from '../components/utils/Membership';
import axiosClient from '../axios-client';
import { useEffect, useState } from 'react';
import { useStateContext } from "../context/ContextProvider";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


const ViewCommunity = () => {
  const [community, setCommunity] = useState([]);
  const [image, setImage] = useState(null);
  const {user} = useStateContext();
  const {id} = useParams();
  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(true);

  const getCommunity = () => {
    
    axiosClient.get(`/communities/${id}`)
    .then(res => {
      setLoading(false);
      console.log(import.meta.env.VITE_API_COMMUNITIES_URL+res.data.data.community_photo);
      setCommunity(res.data.data);
      setImage(import.meta.env.VITE_API_COMMUNITIES_URL+res.data.data.community_photo);
    })
  }

  useEffect(() => {
    getCommunity();
  },[])

  return (
    <div className="authenticated-container">
      <div className="feed">
        <div className='section-header'>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="9" r="4" fill="#33363F"/>
              <circle cx="17" cy="9" r="3" fill="#33363F"/>
              <circle cx="7" cy="9" r="3" fill="#33363F"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M17.5685 18H19.895C20.4867 18 20.9403 17.4901 20.7966 16.9162C20.4284 15.4458 19.448 13 17 13C16.114 13 15.4201 13.3205 14.8781 13.7991C16.3858 14.7773 17.1654 16.4902 17.5685 18Z" fill="#33363F"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M9.12197 13.7991C8.57989 13.3205 7.88609 13 7 13C4.55208 13 3.57166 15.4458 3.20343 16.9162C3.05971 17.4901 3.51335 18 4.10498 18H6.43155C6.83464 16.4902 7.61422 14.7773 9.12197 13.7991Z" fill="#33363F"/>
              <path d="M12 14C15.7087 14 16.6665 17.301 16.9139 19.0061C16.9932 19.5526 16.5523 20 16 20H8C7.44772 20 7.00684 19.5526 7.08614 19.0061C7.33351 17.301 8.29134 14 12 14Z" fill="#33363F"/>
          </svg>
          <h3>Community</h3>
        </div>
        <div className="card">
          
                      <div className="banner">
                      <img className='banner-img' src="/banner.png" />
                      <div className='community-details'>
                        {imageLoading && <Skeleton className='community-img' circle={true}/>}
                        <img style={imageLoading ? {display: 'none'} : {display: 'inline'}} onLoad={() => setImageLoading(false)} className='community-img' src={image} />
                        
                        <div className="com-name-join">
                          <span className='community-name'>{community.name || <Skeleton containerClassName='community-name'/>}</span>
                          <div className='community-join'>
                          {!loading && 
                            <MembershipCheck community_id={community.id} user_id={user.id} />
                          }
                          </div>
                        </div>
                      </div>
                      <div className="community-details-bottom">
                        <span className='c-member-count'><strong>154</strong> Members</span>
                      </div>
                    </div>

        </div>
      </div>
      <div className="recommended">

      </div>
    </div>

  )
}

export default ViewCommunity;