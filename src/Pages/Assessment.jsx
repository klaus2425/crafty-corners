import { useQuery, useQueryClient } from "@tanstack/react-query";
import axiosClient from "../axios-client";
import Loading from "../components/utils/Loading";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import MembershipCheck from "../components/utils/Membership";

const Assessment = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const params = new URLSearchParams( window.location.search);
  const uid = params.get('uid')
  const storageBaseUrl = import.meta.env.VITE_API_COMMUNITIES_URL
  const getCommunites = async () => {
    const fetchedData = await axiosClient.get('/communities');
    return fetchedData.data;
  }

  const { data } = useQuery({
    queryKey: ['communities'],
    queryFn: getCommunites,
  })


  const handleProceed = () => {
    axiosClient.post('/done-assessment')
    .then(() => {
      queryClient.refetchQueries('communities').then(() => {
        navigate('/')
        toast('Assessment success', {
          duration: 1500,
          position: "bottom-center",
          icon: "✅",
          style: {
            borderRadius: "100px",
            border: 0,
            boxShadow: "0 0px 20px rgb(0 0 0 / 0.1)",
          }
        })
      })
    })
  }


  return (
    <div className="pre-assessment-container">
      <Toaster />
      <h2>Here are some communities that might interest you...</h2>
      <div className="card" id="assessment-card">
        {
          data &&
            data.map((community) => (
              <div className="community-assmnt-card">
                <img src={storageBaseUrl + community.community_photo} alt="" />
                <span className="community-name">/{community.name}</span>
                <span className="community-description">{community.description}</span>
                <span className="member-count"><strong>{community.members_count}</strong> Members</span>
                <MembershipCheck isMember={community.is_user_member} community_id={community.id} user_id={uid}/>
              </div>
            ))
        }
      </div>
      <div className="button-container">
        <div onClick={handleProceed} className="purple-button"><strong>Proceed to Home</strong></div>
      </div>
    </div>
  )
}


export default Assessment;