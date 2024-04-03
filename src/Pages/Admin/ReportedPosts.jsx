import { useEffect, useState } from "react";
import axiosClient from "../../axios-client";
import Loading from "../../components/utils/Loading";
import { Link } from "react-router-dom";

const ReportedPosts = () => {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const getPosts = () => {
    axiosClient.get('/show-all-reports')
      .then(res => {
        setPosts(res.data);
      })
  }

  useEffect(() => {
    getPosts();
  }, []);
  return (
    <div className="communities-container">
      <div className="top-section">
        <h2>Posts for review</h2>
        <div className='report-count'>5 <br />Reported posts</div>
      </div>
      <div className='users-table'>

        {loading &&
          <Loading />
        }

        {!loading &&

          posts.map(u => (
            <div key={u.id} className="community-item">
              <div className="community-item-details" >
                <div className="community-details-top">
                  <span><strong>Post Title: <br /> </strong>{u.post?.title} </span>
                  <span><strong>Reason for reporting:  <br /></strong>{u.reason}</span>
                  <span className='desc'><strong>Description:  <br /></strong>{u.description}</span>
                  <span><strong>Status:  <br /></strong><span className={u.is_resolved === 0 ? 'red' : 'green'}>{u.is_resolved=== 0 ? 'Unresolved' : 'Resolved'}</span></span>
                </div>
                <div className="buttons-community">
                  <Link to={'/view-reported-post/' + u.post_id+'/'+u.id} className="orange-button">View Post</Link>
                </div>


              </div>
            </div>
          ))


        }

      </div>
    </div>
  )
}

export default ReportedPosts;