import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import axiosClient from '../../axios-client';
const ViewArchivedPost = () => {

  const { id } = useParams();

  const useReport = useQuery({
    queryKey: [`post-${id}`],
    queryFn: () => axiosClient.get(`/deleted/post/${id}`).then(({data}) => data)
  })

  console.log(useReport.data);
  console.error(useReport.error);
  return (
    <div className="communities-container">
      <div className="top-section">

      </div>
      <div className="report-post-details">
        <div className="top-report">
          <div className="left">
            <div className="report-details">
              <strong>Post ID: </strong>
            </div>
            <div className="report-details">
              <strong>Post Title: </strong>
            </div>
            <div className="report-details">
              <strong>Post Description: </strong>
            </div>
            <div className="report-details">
              <strong>Posted by: </strong>
            </div>
            <div className="report-details">
              <strong>Program: </strong>
            </div>
            <div className="report-details">
              <strong>Student ID: </strong>
            </div>
            <br />
          </div>
          <div className="right">
            <div style={{ marginBottom: '2rem' }} className="report-details">
              <strong>Content: <br /></strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

}

export default ViewArchivedPost;