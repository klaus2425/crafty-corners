import { useEffect, useRef, useState } from "react";
import axiosClient from "../../axios-client";
import { useParams } from "react-router-dom";
import toast, {Toaster} from 'react-hot-toast';


const ViewMentorApplication = () => {
  const {id} = useParams();
  const [applicant, setApplicant] = useState({});
  const [community, setCommunity] = useState({});
  const dateTimeRef = useRef();
  const storageBaseUrl = import.meta.env.VITE_API_STORAGE_URL;
  const handleSubmit = () => {
    console.log(dateTimeRef.current.value);
    const formData = new FormData();
    formData.append('date_of_Assessment', dateTimeRef.current.value)
    formData.append('status', 'For Assessment')
    axiosClient.post(`/mentor/${id}/set-assessment_date`, formData)
    .then((res) => {
      console.log(res.data);
      toast('Asessment confirmed', {
        duration: 1500,
        position: "bottom-center",
        icon: "✅",
        style: {
            borderRadius: "100px",
            border: 0,
            boxShadow: "0 0px 20px rgb(0 0 0 / 0.1)",
        }

    });
    })
    .catch(err => toast(err.response.data.message, {
      duration: 1500,
      position: "bottom-center",
      icon: "❌",
      style: {
        borderRadius: "100px",
        border: 0,
        boxShadow: "0 0px 20px rgb(0 0 0 / 0.1)",
      }

    }))
  }

  const getApplicant = () => {
    axiosClient.get(`/mentorship-application/${id}`)
    .then((res) => {
      setApplicant(res.data.data)
    })
  }


  useEffect(() => {
    getApplicant();
  }, [])


  return (
    <div className="communities-container">
      <Toaster />
      <div className="top-section">
        <h2>Applicant's Information</h2>
      </div>
      <div className="applicant-image">
        <img src={`${storageBaseUrl + applicant.user?.profile_picture}`} alt="" />
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
          <input ref={dateTimeRef} onChange={ev => setApplicant({...applicant, date_of_Assessment: ev.target.value})} type="datetime-local" name="" id="" value={applicant?.date_of_Assessment} />
        </div> 
      </div>
      <div className="application-bottom">
        <button className="purple-button" onClick={handleSubmit}>
          Set Assessment
        </button>
        <button className="green-button">
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