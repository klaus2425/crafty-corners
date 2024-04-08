import { useQuery } from '@tanstack/react-query';
import axiosClient from '../../axios-client';
import { Link } from 'react-router-dom';

const ReportsArchived = () => {

  const getPosts = async () => {
    const fetchedData = await axiosClient.get('/deleted/posts');
    return fetchedData.data.data;
  }
  const useReportedPosts = useQuery({
    queryKey: ['posts'],
    queryFn:  getPosts
  })

  console.log(useReportedPosts.data);

  return (
    <div className="communities-container">
      <div className="top-section">
        <h2>Archived Posts</h2>
      </div>
      <div className="users-table">
        {
          useReportedPosts.data ? 
          useReportedPosts.data.map(u => (
            <div key={u.id} className="community-item">
              <div className="community-item-details" >
                <div className="community-details-top">
                <span><strong>Post ID: <br /> </strong>{u.id} </span>

                  <span><strong>Post Title: <br /> </strong>{u.title} </span>
                  <span><strong>Community: <br /> </strong>{u.community_name} </span>

                  <span><strong>Posted by: <br /> </strong>{u?.user.first_name} {u?.user.middle_name} {u?.user.last_name} </span>
                </div>
                <div className="buttons-community">
                  <Link to={'/archived-post/'+u.id} className="orange-button">View Post</Link>
                </div>
              </div>
            </div>
          ))
          :
          null
        }
      </div>
    </div>
  )

}

export default ReportsArchived;