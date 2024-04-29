import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import axiosClient from "../../axios-client";
import { lazy, useState, Suspense } from "react";
import Loading from "../../components/utils/Loading";

const ViewReportedComment = () => {
  const { reportId, commentId } = useParams();
  const [resolveOpen, setResolveOpen] = useState(false);
  const ResolveReport = lazy(() => import('../../components/ResolveReport'));
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
          <ResolveReport type={'comment'} resolveOpen={resolveOpen} setResolveOpen={setResolveOpen} reportableId={commentId} reportId={reportId} />
        </Suspense>}
      <div className="top-section">
        <h2>Report Details</h2>
      </div>
      <div className="report-post-details">
        <div className="top-report">
          <div className="left">
            <div className="report-details">
              <strong>Reported User:</strong> {data.reported_user.first_name} {data.reported_user.middle_name} {data.reported_user.last_name}
            </div>
            <div className="report-details">
              <strong>Program:</strong> {data.reported_user.program}
            </div>
            <div className="report-details">
              <strong>Student ID:</strong> {data.reported_user.student_id}
            </div>
            <div className="report-details">
              <strong>Created at:</strong> {new Date(data.reportable.created_at).toLocaleDateString()}
            </div>
            <div className="report-details">
              <strong>Reason for reporting: </strong> {data.reason}
            </div>
            <div className="report-details">
              <strong>Report Description: </strong> {data.description}
            </div>
          </div>
          <div className="right">
            <strong>Comment:</strong>
            <span>{data.reportable.content}</span>
          </div>
        </div>
        <div className="bottom-report">
          <strong>Reported by:</strong> {data.reported_by.first_name} {data.reported_by.middle_name} {data.reported_by.last_name}
        </div>
        <div className="bottom-report">
          <strong>Student ID:</strong> {data.reported_by.student_id}
        </div>
        <div className="bottom-report">
          <button onClick={handleResolve} className="purple-button">Resolve Post</button>
        </div>
      </div>
    </div>
  ) :
    <Loading />
}

export default ViewReportedComment;