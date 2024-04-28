import { useQuery } from "@tanstack/react-query"
import Loading from "../../components/utils/Loading"
import axiosClient from "../../axios-client"
import { Link } from "react-router-dom"

const ReportedComments = () => {

  const useReports = useQuery({
    queryKey: ['reported-comment'],
    queryFn: () => axiosClient.get('/report/comments')
    .then(({data}) => data.data)
  })



  console.log(useReports.data);
  return (
    <div className="communities-container">
    <div className="top-section">
      <h2>Comments for review</h2>
    </div>
    <div className='users-table'>
      {useReports.data ?
        useReports.data?.map(u => (
          <div key={u.id} className="community-item">
            <div className="community-item-details" >
              <div className="community-details-top">
                <span><strong>Report ID: <br /> </strong>{u.id} </span>
                <span><strong>Reason for reporting:  <br /></strong>{u.reason}</span>
                <span className='desc'><strong>Description:  <br /></strong>{u.description}</span>
                <span><strong>Status:  <br /></strong><span className={u.is_resolved ? 'green' : 'red'}>{u.is_resolved ? 'Resolved' : 'Unresolved'}</span></span>
              </div>
              <div className="buttons-community">
                <Link to={`/view-reported-comment/${u.id}/${u.comment.id}` } className="orange-button">View Post</Link>
              </div>
            </div>
          </div>
        ))
        :

        <Loading />

      }

    </div>
  </div>
  )
}

export default ReportedComments