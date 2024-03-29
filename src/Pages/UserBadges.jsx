import { useQuery } from "@tanstack/react-query";
import axiosClient from "../axios-client";
import Loading from "../components/utils/Loading";
import ProgressBar from "@ramonak/react-progress-bar";


const UserBadges = () => {

  const { data } = useQuery({
    queryKey: ['badges'],
    queryFn: () => axiosClient.get('/user-levels').then(({ data }) => (data.user_level)),
  })

  console.log('levels', data);
  return (
    <div className="authenticated-container">
      <div className="feed">
        <div className="section-header">
          <h3>Your Badges</h3>
        </div>
        <div className="card" id="badges-card">
          {
            data ?
              data.length > 0 ? data.map(level => (
                <div className="level-container">
                  <span><strong>/{level.community_name}</strong></span>
                  <img src={`/${level.badge}`} alt="" />
                  <ProgressBar height='1.5rem' width={120} completed={`${level.experience_points}` || 0} maxCompleted={level.next_level_experience || 0} />
                  {level.experience_points + '/' + level.next_level_experience}
                  <span>Level {level.level}</span>
                </div>
              ))
                :
                (<div className="no-badges-text">No badges</div>)
              :
              <Loading />
          }
        </div>
      </div>
      <div className="recommended"></div>
    </div>
  )
}

export default UserBadges;