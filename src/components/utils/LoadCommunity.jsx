
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useStateContext } from "../../context/ContextProvider";
import MembershipCheck from "./Membership";
import { useNavigate } from 'react-router-dom';

const LoadCommunity = (c) => {
  const [imageLoading, setImageLoading] = useState(true);
  const storageBaseUrl = import.meta.env.VITE_API_COMMUNITIES_URL;
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const uid = params.get('uid')
  const { user } = useStateContext();
  const openCommunity = (id) => {
    navigate(`/c/${id}?uid=${user.id}`)
  }

  return (
    <div className="list-card-item">
      <div onClick={() => openCommunity(c.c.id)} className="list-card-left">
        <div className="list-card-item-image">
          {imageLoading && <Skeleton className="loading-img" />}
          <img style={imageLoading ? { display: 'none' } : { display: 'inline' }} src={storageBaseUrl + c.c.community_photo} onLoad={() => setImageLoading(false)} />
        </div>
        <div className="list-card-item-text">
          <span>{c.c.name}</span>
          <p>{c.c.description}</p>
        </div>
      </div>

      <div className="list-card-item-time">
        <MembershipCheck members={c.c.members} community_id={c.c.id} user_id={uid} />
      </div>
    </div>
  )
}

export default LoadCommunity;