import { useEffect, useState } from "react";
import axiosClient from "../../axios-client";
import { useParams } from "react-router-dom";

const ViewMentorApplication = () => {
  const {id} = useParams();
  const [applicant, setApplicant] = useState({});
  const storageBaseUrl = import.meta.env.VITE_API_STORAGE_URL;
  const getApplicant = () => {
    axiosClient.get(`/mentorship-applications/${id}`)
    .then((res) => {
      console.log(res.data.data);
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
          <input type="text" name="" id="" readOnly />
          <div>Middle Name</div>
          <input type="text" name="" id="" readOnly />
          <div>Last Name</div>
          <input type="text" name="" id="" readOnly />
          <div>Student ID</div>
          <input type="text" name="" id="" readOnly />
        </div>
        <div className="right">
          <div>Program</div>
          <input type="text" name="" id="" readOnly />
          <div>Community Applying For</div>
          <input type="text" name="" id="" readOnly />
          <div>Specialization</div>
          <input type="text" name="" id="" readOnly />
          <div>Select Date for Assessment</div>
          <input type="date" name="" id="" />
        </div>
      </div>
      <div className="application-bottom">
        <button className="purple-button">
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