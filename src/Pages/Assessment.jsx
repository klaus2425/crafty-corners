import { useQuery, useQueryClient } from "@tanstack/react-query";
import axiosClient from "../axios-client";
import { useNavigate } from "react-router-dom";
import MembershipCheck from "../components/utils/Membership";
import '../styles/index.scss'

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
      })
    })
  }


  return (
    <div className="pre-assessment-container">
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