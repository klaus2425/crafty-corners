import { useEffect, useRef, useState } from "react";
import axiosClient from "../../axios-client";
import { useParams } from "react-router-dom";

const ViewMentorApplication = () => {
  const {id} = useParams();
  const [applicant, setApplicant] = useState({});
  const [community, setCommunity] = useState({});
  const dateTimeRef = useRef();
  const storageBaseUrl = import.meta.env.VITE_API_STORAGE_URL;
  const handleSubmit = () => {
    console.log(dateTimeRef.current.value);
    const formData = new FormData();
    formData.append('date_of_assessment', dateTimeRef.current.value)
    axiosClient.post(`/mentor/${id}/set-assessment_date`, formData)
    .then((res) => {
      console.log(res.data);
    })
    .catch(err => console.log(err.response))
  }

  const getApplicant = () => {
    axiosClient.get(`/mentorship-application/${id}`)
    .then((res) => {
      console.log(res.data.data);
      setApplicant(res.data.data)
    })
  }


  useEffect(() => {
    getApplicant();
  }, [])


  return (
    <div className="communities-container">
      <div className="top-section">
        <h2>Applicant's Information</h2>
      </div>
      <div className="applicant-image">
        <img src={`${storageBaseUrl}`} alt="" />
      </div>
      <div className="applicant-info-container">
        <div className="left">
          <div>First Name</div>
          <input type="text" name="" id="" readOnly value={applicant.user?.first_name}/>
          <div>Middle Name</div>
          <input type="text" name="" id="" readOnly value={applicant.user?.middle_name} />
          <div>Last Name</div>
          <input type="text" name="" id="" readOnly value={applicant.user?.last_name}/>
          <div>Student ID</div>
          <input type="text" name="" id="" readOnly value={applicant.student_id}/>
        </div>
        <div className="right">
          <div>Program</div>
          <input type="text" name="" id="" readOnly value={applicant.program}/>
          <div>Community Applying For</div>
          <input type="text" name="" id="" readOnly value={applicant.community?.name}/>
          <div>Specialization</div>
          <input type="text" name="" id="" readOnly value={applicant.specialization} />
          <div>Select Date for Assessment</div>
          <input ref={dateTimeRef} type="datetime-local" name="" id="" value={applicant?.date_of_assessment} />
        </div> 
      </div>
      <div className="application-bottom">
        <button className="purple-button" onClick={handleSubmit}>
          Confirm Application
        </button>
        <button className="red-button">
          Reject Application
        </button>
      </div>

    </div>
  )

}

export default ViewMentorApplication;