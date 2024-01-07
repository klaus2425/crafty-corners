import { useEffect, useState } from "react";
import axiosClient from "../../axios-client";
import Swal from 'sweetalert2';

const MembershipCheck = (props) => {
  const [isMember, setIsMember] = useState(false);
  const [community, setCommunity] = useState([]);
  
  const getCommunity = () => {
    axiosClient.get(`/communities/${props.community_id}/users`)
    .then(({data}) => {
    console.log(data);
    setCommunity(data);
    const members = data.members;

    setIsMember(members.some(member => member.id === props.user_id));
  })
  }

  const joinCommunity = (id) => {
    const formData = new FormData();
    formData.append('community_id', id);
    formData.append('user_id', props.user_id);
    
    axiosClient.post('/join-community', formData)
    .then(() => {
      getCommunity();
    })
    .catch(err => {
      const response  = err.response;
      Swal.fire({
        title: "Error",
        text: `${Object.values(response.data)[0]}`,
        icon: "warning"
      });
    })
  }

  const leaveCommunity = (id) => {
    const formData = new FormData();
    formData.append('community_id', id);
    formData.append('user_id', props.user_id);
    

    Swal.fire({
      title: "Leave this community?",
      text: "You are still welcome to come back!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes"
    }).then((result) => {
      if (result.isConfirmed) {
        axiosClient.post('/leave-community', formData)
        .then(() => {
          getCommunity();
        })
        .catch(err => {
          const response  = err.response;
          Swal.fire({
            title: "Error",
            text: `${Object.values(response.data)[0]}`,
            icon: "warning"
          });
        })
      }
    });
    

  }

  useEffect(() => {
    getCommunity();
  }, [])

  if(isMember)
    return(
    <button className="white-button">
      <span onClick={() => leaveCommunity(props.community_id)} className="com-button-text">Joined</span>
    </button>
    )
    else
    return(
    <button className="purple-button">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 6L12 18" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>
          <path d="M18 12L6 12" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>
      </svg>
      <span onClick={() => joinCommunity(props.community_id)} className="com-button-text">Join</span>
    </button>
    )

}

export default MembershipCheck;