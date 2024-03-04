import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../../axios-client";

const ViewReportedPost = () => {
  const { postId, reportId } = useParams();
  const [report, setReport] = useState();
  const [post, setPost] = useState();

  const getReport = () => {
    axiosClient.get(`/show-report/${postId}/${reportId}`)
      .then(res => {
        setReport(res.data);
        console.log(res.data);
      })
    axiosClient.get(`/posts/${postId}`)
    .then(res => {
      setPost(res.data.data);
    })
  }

  useEffect(() => {
    getReport();
  }, []);

  return (
    <div className="communities-container">
      <div className="top-section">
        <h2>Reported Post</h2>
      </div>
      <div className='report-post-details'>
        <div className="report-details">
        <strong>Post Title: </strong>
        {post.title}
        </div>
        <span></span>
      </div>

    </div>
  )
}

export default ViewReportedPost;