import { useState } from "react";
import axiosClient from "../../axios-client";

const MembershipCheck = (props) => {
  const [isMember, setIsMember] = useState(false);
  const [community, setCommunity] = useState([]);
  axiosClient.get(`/communities/${props.community_id}/users`)
  .then(({data}) => {
    console.log(data);
    setCommunity(data)
  })

  if(isMember)
    return(
    <button className="white-button">
      <span onClick={() => joinCommunity(c.id)} className="com-button-text">Joined</span>
    </button>
    )
    else
    return(
    <button className="purple-button">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 6L12 18" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>
          <path d="M18 12L6 12" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>
      </svg>
      <span onClick={() => joinCommunity(c.id)} className="com-button-text">Join</span>
    </button>
    )

}

export default MembershipCheck;