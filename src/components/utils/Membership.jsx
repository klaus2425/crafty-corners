import { useEffect, useState } from "react";
import axiosClient from "../../axios-client";
import Swal from 'sweetalert2';
import Skeleton from "react-loading-skeleton";
import { useQueryClient } from "@tanstack/react-query";

const MembershipCheck = (props) => {
  const [isMember, setIsMember] = useState(false);
  const queryClient = useQueryClient();

  const getCommunity = () => {
    axiosClient.get(`/communities/${props.community_id}/users`)
      .then(() => {
        queryClient.invalidateQueries({queryKey: ['communities']});
      })
  }


  const joinCommunity = (id) => {
    axiosClient.post(`/join-community/${id}`)
      .then((res) => {
        getCommunity();
        setIsMember(true);
      })
      .catch(err => {
        setIsMember(false);
        const response = err.response;
        Swal.fire({
          title: "Error",
          text: `${Object.values(response.data)[0]}`,
          icon: "warning"
        });
      })
  }

  const leaveCommunity = (id) => {
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
        setIsMember(false);
        axiosClient.post(`/leave-community/${id}`)
          .then(() => {
            getCommunity();
          })
          .catch(err => {
            setIsMember(true);
            const response = err.response;
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
    setIsMember(props.isMember);

  }, [])

  if (isMember)
    return (
      <button className="white-button">
        <span onClick={() => leaveCommunity(props.community_id)} className="com-button-text">Joined</span>
      </button>
    )

  return (
    <button className="purple-button">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 6L12 18" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
        <path d="M18 12L6 12" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
      </svg>
      <span onClick={() => joinCommunity(props.community_id)} className="com-button-text">Join</span>
    </button>
  )

}







export const IsAMember = (props) => {
  const [isMember, setIsMember] = useState(false);

  const getCommunity = () => {
    axiosClient.get(`/communities/${props.community_id}/users`)
      .then(({ data }) => {
        const members = data.members;
        setIsMember(members.some(member => member.id === props.user_id));
      })


  }

  useEffect(() => {
    getCommunity();
  }, [])

  return isMember;

}

export default MembershipCheck;
