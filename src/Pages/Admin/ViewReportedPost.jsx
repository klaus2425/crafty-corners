import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../../axios-client";
import Loading from "../../components/utils/Loading";
import ResolveReport from "../../components/ResolveReport";
import { useQuery } from '@tanstack/react-query';

const ViewReportedPost = () => {
  const { postId, reportId } = useParams();
  const [resolveOpen, setResolveOpen] = useState(false);
  const storageUrl = import.meta.env.VITE_API_POSTS_URL;


  const handleResolve = () => {
    setResolveOpen(!resolveOpen);
  }



  const useReport = useQuery({
    queryKey: [`report-${reportId}`],
    queryFn: () => axiosClient.get(`/show-report/${postId}/${reportId}`).then(({data}) => data.data)
  })

  console.log(useReport?.data);

  if (useReport.isLoading) {
    return <Loading />
  }
  if (useReport?.data.post_type === 'text') {
    return (
      <div className="communities-container">
        <ResolveReport resolveOpen={resolveOpen} setResolveOpen={setResolveOpen} postId={postId} reportId={reportId} />
        <div className="top-section">
          <h2>Report Details</h2>
        </div>
        <div className='report-post-details'>
          <div className="top-report">
            <div className="left">
              <div className="report-details">
                <strong>Post Title: </strong>
                {useReport?.data.title}
              </div>
              <div className="report-details">
                <strong>Posted by: </strong>
                {useReport?.data.reported_user.first_name} {useReport?.data.reported_user.middle_name} {useReport?.data.reported_user.last_name}
              </div>
              <div className="report-details">
                <strong>Program: </strong>
                {useReport?.data.reported_user.program}
              </div>
              <div className="report-details">
                <strong>Student ID: </strong>
                {useReport?.data.reported_user.student_id}
              </div>
              <br />
              <div className="report-details">
                <strong>Reported by: </strong>
                {useReport?.data.reported_by.first_name} {useReport?.data.reported_by.middle_name} {useReport?.data.reported_by.last_name}
              </div>
              <div className="report-details">
                <strong>Reporter Student ID: </strong>
                {useReport?.data.reported_by.student_id}
              </div>
            </div>
            <div className="right">
              <div style={{ marginBottom: '2rem' }} className="report-details">
                <strong>Content: <br /></strong>
                {useReport?.data.content}
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
  if (useReport?.data.post_type === 'link') {
    return (
      <div className="communities-container">
        <ResolveReport resolveOpen={resolveOpen} setResolveOpen={setResolveOpen} postId={postId} reportId={reportId} />
        <div className="top-section">
          <h2>Report Details</h2>
        </div>
        <div className='report-post-details'>
          <div className="top-report">
            <div className="left">
              <div className="report-details">
                <strong>Post Title: </strong>
                {useReport?.data.title}
              </div>
              <div className="report-details">
                <strong>Posted by: </strong>
                {useReport?.data.reported_user.first_name} {useReport?.data.reported_user.middle_name} {useReport?.data.reported_user.last_name}
              </div>
              <div className="report-details">
                <strong>Program: </strong>
                {useReport?.data.reported_user.program}
              </div>
              <div className="report-details">
                <strong>Student ID: </strong>
                {useReport?.data.reported_user.student_id}
              </div>
              <br />
              <div className="report-details">
                <strong>Reported by: </strong>
                {useReport?.data.reported_by.first_name} {useReport?.data.reported_by.middle_name} {useReport?.data.reported_by.last_name}
              </div>
              <div className="report-details">
                <strong>Reporter Student ID: </strong>
                {useReport?.data.reported_by.student_id}
              </div>
            </div>
            <div className="right">
              <div style={{ marginBottom: '2rem' }} className="report-details">
                <strong>Content: <br /></strong>
                {useReport?.data.link}
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
  if (useReport?.data.post_type === 'video') {
    return (
      <div className="communities-container">
        <ResolveReport resolveOpen={resolveOpen} setResolveOpen={setResolveOpen} postId={postId}  reportId={reportId}  />
        <div className="top-section">
          <h2>Report Details</h2>
        </div>
        <div className='report-post-details'>
          <div className="top-report">
            <div className="left">
              <div className="report-details">
                <strong>Post Title: </strong>
                {useReport?.data.title}
              </div>
              <div className="report-details">
                <strong>Posted by: </strong>
                {useReport?.data.reported_user.first_name} {useReport?.data.reported_user.middle_name} {useReport?.data.reported_user.last_name}
              </div>
              <div className="report-details">
                <strong>Program: </strong>
                {useReport?.data.reported_user.program}
              </div>
              <div className="report-details">
                <strong>Student ID: </strong>
                {useReport?.data.reported_user.student_id}
              </div>

              <div className="report-details">
                <strong>Reported by: </strong>
                {useReport?.data.reported_by.first_name} {useReport?.data.reported_by.middle_name} {useReport?.data.reported_by.last_name}
              </div>
            </div>
            <div className="right">
              <div style={{ marginBottom: '2rem' }} className="report-details">
                <strong>Content: <br /></strong>
                <video className='report-video' controls src={storageUrl+useReport?.data.video} type="video/mp4"/>
              </div>
              <span><strong>Reason for reporting:</strong><br />{useReport?.data.reason}</span>
              <div><strong>Description:</strong></div>
              <span>{useReport?.data.description}</span>
            </div>
          </div>
          <div className="bottom-report">
            <button onClick={handleResolve} className="purple-button">Resolve Post</button>
          </div>
        </div>
      </div>
    )
  }
  if (useReport?.data.post_type === 'image') {
    return (
      <div className="communities-container">
        <ResolveReport resolveOpen={resolveOpen} setResolveOpen={setResolveOpen} postId={postId}  reportId={reportId}  />
        <div className="top-section">
          <h2>Report Details</h2>
        </div>
        <div className='report-post-details'>
          <div className="top-report">
            <div className="left">
              <div className="report-details">
                <strong>Post Title: </strong>
                {useReport?.data.title}
              </div>
              <div className="report-details">
                <strong>Posted by: </strong>
                {useReport?.data.reported_user.first_name} {useReport?.data.reported_user.middle_name} {useReport?.data.reported_user.last_name}
              </div>
              <div className="report-details">
                <strong>Program: </strong>
                {useReport?.data.reported_user.program}
              </div>
              <div className="report-details">
                <strong>Student ID: </strong>
                {useReport?.data.reported_user.student_id}
              </div>

              <div className="report-details">
                <strong>Reported by: </strong>
                {useReport?.data.reported_by.first_name} {useReport?.data.reported_by.middle_name} {useReport?.data.reported_by.last_name}
              </div>
            </div>
            <div className="right">
              <div style={{ marginBottom: '2rem' }} className="report-details">
                <strong>Content: <br /></strong>
                <img className='report-details__image' src={storageUrl+useReport?.data.image} alt='post image' />
              </div>
              <span><strong>Reason for reporting:</strong><br />{useReport?.data.reason}</span>
              <div><strong>Description:</strong></div>
              <span>{useReport?.data.description}</span>
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