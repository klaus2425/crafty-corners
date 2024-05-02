import { useQuery } from "@tanstack/react-query"
import Loading from "../../components/utils/Loading"
import axiosClient from "../../axios-client"
import { Link } from "react-router-dom"
import { useState } from "react"
import ReactSelect from "react-select"

const ReportedComments = () => {
  const [reasonFilterKey, setReasonFilterKey] = useState({ value: null, label: 'Select Reason' });
  const [statusFilterKey, setStatusFilterKey] = useState({ value: null, label: 'Select Status' });
  const options = [
    { value: "Spam", label: "Spam" },
    { value: "Violence", label: "Violence" },
    { value: "Hate Speech", label: "Hate Speech" },
    { value: "False Information", label: "False Information" },
    { value: "Harassment", label: "Harassment" },
    { value: "Foul Words", label: "Foul Words"},
    { value: "Irrelevant Topic", label: "Irrelevant Topic" },
    { value: "Plagiarism", label: "Plagiarism" }
  ];
  const statusOptions = [
    { value: true, label: "Resolved" },
    { value: false, label: "Unresolved" }
  ]
  const handleSelectChangeReason = (value) => {
    setReasonFilterKey(value)
  }
  const handleSelectChangeStatus = (value) => {
    setStatusFilterKey(value)
  }
  const handleClear = () => {
    setReasonFilterKey({ value: null, label: 'Select Reason' });
    setStatusFilterKey({ value: null, label: 'Select Status' })
  }

  const useReports = useQuery({
    queryKey: ['reported-comment'],
    queryFn: () => axiosClient.get('/report/comments')
      .then(({ data }) => data.data)
  })



  return (
    <div className="communities-container">
      <div className="top-section">
        <h2>Comments for review</h2>
      </div>
      <div className="filters">
        <span><strong>Filters:</strong></span>
        <ReactSelect
          value={reasonFilterKey}
          placeholder="Report reason"
          className="react-select-container"
          classNamePrefix="react-select"
          options={options}
          onChange={handleSelectChangeReason}
        />
        <ReactSelect
          value={statusFilterKey}
          placeholder="Report reason"
          className="react-select-container"
          classNamePrefix="react-select"
          options={statusOptions}
          onChange={handleSelectChangeStatus}
        />
        <button onClick={handleClear} className="btn btn--purple">Clear</button>
      </div>
      <div className='users-table'>
        {!useReports.isLoading ?
          useReports.data.filter(post => {
            if (reasonFilterKey.value !== null && statusFilterKey.value !== null) {
              return post.reason === reasonFilterKey.value && post.is_resolved === statusFilterKey.value;
            } else if (reasonFilterKey.value !== null) {
              return post.reason === reasonFilterKey.value;
            } else if (statusFilterKey.value !== null) {
              return post.is_resolved === statusFilterKey.value;
            } else {
              return true;
            }
          }).map(u => (
            <div key={u.id} className="community-item">
              <div className="community-item-details" >
                <div className="community-details-top">
                  <span><strong>Report ID: <br /> </strong>{u.id} </span>
                  <span><strong>Reason for reporting:  <br /></strong>{u.reason}</span>
                  <span className='desc'><strong>Description:  <br /></strong>{u.description}</span>
                  <span><strong>Status:  <br /></strong><span className={u.is_resolved ? 'green' : 'red'}>{u.is_resolved ? 'Resolved' : 'Unresolved'}</span></span>
                </div>
                <div className="buttons-community">
                  <Link to={`/view-reported-comment/${u.id}/${u.comment.id}`} className="orange-button">View Post</Link>
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