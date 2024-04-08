import { useEffect, useState } from "react";
import axiosClient from "../../axios-client";
import Loading from "../../components/utils/Loading";
import { Link } from "react-router-dom";

const ReportedPosts = () => {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const getPosts = () => {
    setLoading(true)
    axiosClient.get('/show-all-reports')
      .then(res => {
        setLoading(false);
        setPosts(res.data.data);
        console.log(res.data.data);
      })
  }

  useEffect(() => {
    getPosts();
  }, []);
  return (
    <div className="communities-container">
      <div className="top-section">
        <h2>Posts for review</h2>
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
                <span><strong>Post ID: <br /> </strong>{u.post?.id} </span>

                  <span><strong>Post Title: <br /> </strong>{u.post?.title} </span>
                  <span><strong>Reason for reporting:  <br /></strong>{u.reason}</span>
                  <span className='desc'><strong>Description:  <br /></strong>{u.description}</span>
                  <span><strong>Status:  <br /></strong><span className={u.is_resolved ? 'green' : 'red'}>{u.is_resolved ? 'Resolved' : 'Unresolved'}</span></span>
                </div>
                <div className="buttons-community">
                  <Link to={'/view-reported-post/' + u.post.id+'/'+u.id} className="orange-button">View Post</Link>
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