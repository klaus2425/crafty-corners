import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import axiosClient from '../../axios-client';
import Loading from '../../components/utils/Loading'


const ViewArchivedPost = () => {
  const storageUrl = import.meta.env.VITE_API_POSTS_URL;
  const { id } = useParams();

  const useReport = useQuery({
    queryKey: [`post-${id}`],
    queryFn: () => axiosClient.get(`/deleted/post/${id}`)
      .then(({ data }) => data.data)
  })
  console.log(useReport.data);
  if (useReport.isLoading) {
    return <Loading />
  }

  if (useReport.data.post_type === 'text') {
    return (
      <div className="communities-container">
        <div className="top-section">
        </div>
        <div className="report-post-details">
          <div className="top-report">
            <div className="left">
              <div className="report-details">
                <strong>Post ID: </strong>
                {useReport.data.id}
              </div>
              <div className="report-details">
                <strong>Post Title: </strong>
                {useReport.data.title}

              </div>
              <div className="report-details">
                <strong>Post Description: </strong>
                {useReport.data.description}

              </div>
              <div className="report-details">
                <strong>Posted by: </strong>
                {useReport.data.user.first_name} {useReport.data.user.middle_name} {useReport.data.user.last_name}
              </div>
              <div className="report-details">
                <strong>Program: </strong>
                {useReport.data.user.program}
              </div>
              <div className="report-details">
                <strong>Student ID: </strong>
                {useReport.data.user.student_id}
              </div>
              <br />
            </div>
            <div className="right">
              <div style={{ marginBottom: '2rem' }} className="report-details">
                <strong>Content: <br /></strong>
                {useReport.data.content}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  if (useReport.data.post_type === 'link') {
    return (
      <div className="communities-container">
        <div className="top-section">
        </div>
        <div className="report-post-details">
          <div className="top-report">
            <div className="left">
              <div className="report-details">
                <strong>Post ID: </strong>
                {useReport.data.id}
              </div>
              <div className="report-details">
                <strong>Post Title: </strong>
                {useReport.data.title}

              </div>
              <div className="report-details">
                <strong>Post Description: </strong>
                {useReport.data.description}

              </div>
              <div className="report-details">
                <strong>Posted by: </strong>
                {useReport.data.user.first_name} {useReport.data.user.middle_name} {useReport.data.user.last_name}
              </div>
              <div className="report-details">
                <strong>Program: </strong>
                {useReport.data.user.program}
              </div>
              <div className="report-details">
                <strong>Student ID: </strong>
                {useReport.data.user.student_id}
              </div>
              <br />
            </div>
            <div className="right">
              <div style={{ marginBottom: '2rem' }} className="report-details">
                <strong>Content: <br /></strong>
                {useReport.data.link}

              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (useReport.data.post_type === 'image') {
    return (
      <div className="communities-container">
        <div className="top-section">
        </div>
        <div className="report-post-details">
          <div className="top-report">
            <div className="left">
              <div className="report-details">
                <strong>Post ID: </strong>
                {useReport.data.id}
              </div>
              <div className="report-details">
                <strong>Post Title: </strong>
                {useReport.data.title}

              </div>
              <div className="report-details">
                <strong>Post Description: </strong>
                {useReport.data.description}

              </div>
              <div className="report-details">
                <strong>Posted by: </strong>
                {useReport.data.user.first_name} {useReport.data.user.middle_name} {useReport.data.user.last_name}
              </div>
              <div className="report-details">
                <strong>Program: </strong>
                {useReport.data.user.program}
              </div>
              <div className="report-details">
                <strong>Student ID: </strong>
                {useReport.data.user.student_id}
              </div>
              <br />
            </div>
            <div className="right">
              <div style={{ marginBottom: '2rem' }} className="report-details">
                <strong>Content: <br /></strong>
                <img className='report-details__image' src={storageUrl + useReport.data.image} alt="post image" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (useReport.data.post_type === 'video') {
    return (
      <div className="communities-container">
        <div className="top-section">
        </div>
        <div className="report-post-details">
          <div className="top-report">
            <div className="left">
              <div className="report-details">
                <strong>Post ID: </strong>
                {useReport.data.id}
              </div>
              <div className="report-details">
                <strong>Post Title: </strong>
                {useReport.data.title}

              </div>
              <div className="report-details">
                <strong>Post Description: </strong>
                {useReport.data.description}

              </div>
              <div className="report-details">
                <strong>Posted by: </strong>
                {useReport.data.user.first_name} {useReport.data.user.middle_name} {useReport.data.user.last_name}
              </div>
              <div className="report-details">
                <strong>Program: </strong>
                {useReport.data.user.program}
              </div>
              <div className="report-details">
                <strong>Student ID: </strong>
                {useReport.data.user.student_id}
              </div>
              <br />
            </div>
            <div className="right">
              <div style={{ marginBottom: '2rem' }} className="report-details">
                <strong>Content: <br /></strong>
                <video className='report-video' controls src={storageUrl+useReport?.data.video} type="video/mp4"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }



}

export default ViewArchivedPost;