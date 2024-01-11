
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useStateContext } from "../../context/ContextProvider";
import Membership from "./Membership";

const LoadCommunity = (c) => {
  const [imageLoading, setImageLoading] = useState(true);
  const storageBaseUrl= import.meta.env.VITE_API_COMMUNITIES_URL;
  const {user} = useStateContext();

  return (
    <div className="list-card-item">
                            <div onClick={() => openCommunity(c.c.id)} className="list-card-left">
                              <div className="list-card-item-image">
                                { imageLoading && <Skeleton className="loading-img"/> }
                                <img style={imageLoading ? {display: 'none'} : {display: 'inline'}} src={storageBaseUrl+c.c.community_photo} onLoad={() => setImageLoading(false)} />
                            </div>
                            <div className="list-card-item-text">
                              <text>{c.c.name}</text>
                              <p>{c.c.description}</p>
                            </div>
                            </div>
                      
                           <div className="list-card-item-time">
                              <Membership community_id={c.c.id} user_id={user.id}/>
                           </div>
                         </div>
  )
}

export default LoadCommunity;