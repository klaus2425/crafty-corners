import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../../axios-client";
import Loading from "../../components/utils/Loading";

const ViewReportedPost = () => {
  const { postId, reportId } = useParams();
  const [report, setReport] = useState();
  const [post, setPost] = useState();
  const [loading, setLoading] = useState();
  const getReport = () => {
    setLoading(true);
    axiosClient.get(`/show-report/${postId}/${reportId}`)
      .then(res => {
        setReport(res.data);
        console.log(res.data);
      })
    axiosClient.get(`/posts/${postId}`)
      .then(res => {
        setPost(res.data.data);
        console.log(res.data.data);
        setLoading(false);
      })
  }

  const suspendClick = () => {
    
  }
  const removePostClick = () => {

  }

  const removeReportClick = () => {

  }

  useEffect(() => {
    getReport();
  }, []);

  if (loading) {
    return <Loading />
  }
  if (post?.post_type === 'text') {
    return (
      <div className="communities-container">
        <div className="top-section">
          <h2>Report Details</h2>
        </div>
        <div className='report-post-details'>
          <div className="top-report">
            <div className="left">
              <div className="report-details">
                <strong>Post Title: </strong>
                {post?.title}
              </div>
              <div className="report-details">
                <strong>Posted by: </strong>
                {post?.user.first_name} {post?.user.middle_name} {post?.user.last_name}
              </div>
              <div className="report-details">
                <strong>Program: </strong>
                {post?.user.program}
              </div>
              <div className="report-details">
                <strong>Student ID: </strong>
                {post?.user.student_id}
              </div>

              <div className="report-details">
                <strong>Reported by: </strong>
                {report.user.first_name} {report.user.middle_name} {report.user.last_name}
              </div>
            </div>
            <div className="right">
              <div style={{ marginBottom: '2rem' }} className="report-details">
                <strong>Content: <br /></strong>
                {post?.content}
              </div>
            </div>
          </div>
          <div className="bottom-report">
            <button onClick={suspendClick} className="red-button">Suspend User</button>
            <button onClick={removePostClick} className="green-button">Remove Post</button>
            <button onClick={removeReportClick} className="orange-button">Remove Report</button>

          </div>
        </div>
      </div>
    )
  }


}

export default ViewReportedPost;