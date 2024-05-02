import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import axiosClient from "../../axios-client";
import { lazy, useState, Suspense } from "react";
import Loading from "../../components/utils/Loading";

const ViewReportedConversation = () => {
  const { reportId, conversationId } = useParams();
  const [resolveOpen, setResolveOpen] = useState(false);
  const ResolveReport = lazy(() => import('../../components/ResolveReport'));
  const storageUrl = import.meta.env.VITE_API_REPORT_STORAGE_URL;
  const { data, isLoading } = useQuery({
    queryKey: [`report-${reportId}`],
    queryFn: () => axiosClient.get(`/report/${reportId}`)
      .then(({ data }) => data.data)
  })
  const handleResolve = () => {
    setResolveOpen(!resolveOpen);
  }



  return !isLoading ? (
    <div className="communities-container">
      {resolveOpen &&
        <Suspense>
          <ResolveReport type={'conversation'} resolveOpen={resolveOpen} setResolveOpen={setResolveOpen} reportableId={conversationId} reportId={reportId} />
        </Suspense>}
      <div className="top-section">
        <h2>Report Details</h2>
      </div>
      <div className='report-post-details'>
        <div className="top-report">
          <div className="left">
            <div className="report-details">
              <strong>Reported User: </strong>
              {data.reported_user.first_name} {data.reported_user.middle_name} {data.reported_user.last_name}
            </div>
            <div className="report-details">
              <strong>Program: </strong>
              {data.reported_user.program}
            </div>
            <div className="report-details">
              <strong>Student ID: </strong>
              {data.reported_user.student_id}
            </div>
            <br />
            <div className="report-details">
              <strong>Reported by: </strong>
              {data.reported_by.first_name} {data.reported_by.middle_name} {data.reported_by.last_name}
            </div>
            <div className="report-details">
              <strong>Reporter Student ID: </strong>
              {data.reported_by.student_id}
            </div>
          </div>
          <div className="right">
            <div style={{ marginBottom: '2rem' }} className="report-details">
              <strong>Proof:</strong>
              <img className="report-details__image" src={`${storageUrl}${data.proof}`} alt="" />
            </div>
            <span><strong>Reason for reporting:</strong><br />{data.reason}</span>
            <div style={{ marginBottom: '2rem' }}> <strong>Description:</strong><br />{data.description}</div>
            {
              data.is_resolved &&
              <div className=""><strong>Resolution:</strong><br />
                • {data.resolution_option.toUpperCase()} <br />
                • {data.resolution_description}
              </div>
            }
          </div>
        </div>
        {
          !data.is_resolved &&
          <div className="bottom-report">
            <button onClick={handleResolve} className="purple-button">Resolve Post</button>
          </div>
        }
      </div>
    </div>
  )
    :
    <Loading />
}

export default ViewReportedConversation;