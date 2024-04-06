import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../../axios-client";
import Loading from "../../components/utils/Loading";
import ResolveReport from "../../components/ResolveReport";

const ViewReportedPost = () => {
  const { postId, reportId } = useParams();
  const [report, setReport] = useState();
  const [loading, setLoading] = useState();
  const [resolveOpen, setResolveOpen] = useState(false);
  const storageUrl = import.meta.env.VITE_API_POSTS_URL;
  const getReport = () => {
    setLoading(true);
    axiosClient.get(`/show-report/${postId}/${reportId}`)
      .then(res => {
        setReport(res.data.data);
        setLoading(false);
        console.log(res.data.data);
      })
  }

  const handleResolve = () => {
    setResolveOpen(!resolveOpen);
  }


  useEffect(() => {
    getReport();
  }, []);

  if (loading) {
    return <Loading />
  }
  if (report?.post_type === 'text') {
    return (
      <div className="communities-container">
        <ResolveReport resolveOpen={resolveOpen} setResolveOpen={setResolveOpen} postId={postId} />
        <div className="top-section">
          <h2>Report Details</h2>
        </div>
        <div className='report-post-details'>
          <div className="top-report">
            <div className="left">
              <div className="report-details">
                <strong>Post Title: </strong>
                {report?.title}
              </div>
              <div className="report-details">
                <strong>Posted by: </strong>
                {report?.user.first_name} {report?.user.middle_name} {report?.user.last_name}
              </div>
              <div className="report-details">
                <strong>Program: </strong>
                {report?.user.program}
              </div>
              <div className="report-details">
                <strong>Student ID: </strong>
                {report?.user.student_id}
              </div>

              <div className="report-details">
                <strong>Reported by: </strong>
                {report?.user.first_name} {report?.user.middle_name} {report?.user.last_name}
              </div>
            </div>
            <div className="right">
              <div style={{ marginBottom: '2rem' }} className="report-details">
                <strong>Content: <br /></strong>
                {report?.content}
              </div>
            </div>
          </div>
          <div className="bottom-report">
            <button onClick={handleResolve} className="purple-button">Resolve Post</button>
          </div>
        </div>
      </div>
    )
  }
  if (report?.post_type === 'video') {
    return (
      <div className="communities-container">
        <ResolveReport resolveOpen={resolveOpen} setResolveOpen={setResolveOpen} postId={postId} />
        <div className="top-section">
          <h2>Report Details</h2>
        </div>
        <div className='report-post-details'>
          <div className="top-report">
            <div className="left">
              <div className="report-details">
                <strong>Post Title: </strong>
                {report?.title}
              </div>
              <div className="report-details">
                <strong>Posted by: </strong>
                {report?.user.first_name} {report?.user.middle_name} {report?.user.last_name}
              </div>
              <div className="report-details">
                <strong>Program: </strong>
                {report?.user.program}
              </div>
              <div className="report-details">
                <strong>Student ID: </strong>
                {report?.user.student_id}
              </div>

              <div className="report-details">
                <strong>Reported by: </strong>
                {report?.user.first_name} {report?.user.middle_name} {report?.user.last_name}
              </div>
            </div>
            <div className="right">
              <div style={{ marginBottom: '2rem' }} className="report-details">
                <strong>Content: <br /></strong>
                <video className='report-video' controls src={storageUrl+report?.video} type="video/mp4"/>
              </div>
              <span><strong>Reason for reporting:</strong><br />{report.reason}</span>
              <div><strong>Description:</strong></div>
              <span>{report.description}</span>
            </div>
          </div>
          <div className="bottom-report">
            <button onClick={handleResolve} className="purple-button">Resolve Post</button>
          </div>
        </div>
      </div>
    )
  }

}

export default ViewReportedPost;