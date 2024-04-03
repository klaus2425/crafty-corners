import { useEffect, useRef, useState } from "react";
import axiosClient from "../../axios-client";
import { useParams } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import Swal from "sweetalert2";

const ViewMentorApplication = () => {
  const { id } = useParams();
  const [applicant, setApplicant] = useState({});
  const dateTimeRef = useRef();
  const storageBaseUrl = import.meta.env.VITE_API_STORAGE_URL;

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('date_of_Assessment', dateTimeRef.current.value)
    formData.append('status', 'For Assessment')
    axiosClient.post(`/mentor/${id}/set-assessment_date`, formData)
      .then((res) => {
        toast('Asessment date set!', {
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

  const handleConfirmMentor = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Pressing yes will promote this user to mentor.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then((result) => {
      if (result.isConfirmed) {
        axiosClient.post(`/accept-mentorship-application/${applicant.id}`)
        .then(() => {
          Swal.fire({
            title: "Success!",
            text: "User promoted to Mentor.",
            icon: "success"
          });
        })
      }
    });
  }

  const handleRejectMentor = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Pressing yes will remove this user's application.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then((result) => {
      if (result.isConfirmed) {
        axiosClient.post(`/accept-mentorship-application/${applicant.id}`)
          .then(() => {
            Swal.fire({
              title: "Success!",
              text: "User Application Rejected",
              icon: "success"
            });
          })

      }
    });
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
          <input type="text" name="" id="" readOnly value={applicant.user?.first_name} />
          <div>Middle Name</div>
          <input type="text" name="" id="" readOnly value={applicant.user?.middle_name} />
          <div>Last Name</div>
          <input type="text" name="" id="" readOnly value={applicant.user?.last_name} />
          <div>Student ID</div>
          <input type="text" name="" id="" readOnly value={applicant.student_id} />
        </div>
        <div className="right">
          <div>Program</div>
          <input type="text" name="" id="" readOnly value={applicant.program} />
          <div>Community Applying For</div>
          <input type="text" name="" id="" readOnly value={applicant.community?.name} />
          <div>Specialization</div>
          <input type="text" name="" id="" readOnly value={applicant.specialization} />
          <div>Select Date for Assessment</div>
          <input ref={dateTimeRef} onChange={ev => setApplicant({ ...applicant, date_of_Assessment: ev.target.value })} type="datetime-local" name="" id="" value={applicant?.date_of_Assessment} />
        </div>
      </div>
      <div className="application-bottom">
        <button className="purple-button" onClick={handleSubmit}>
          Set Assessment
        </button>
        <button onClick={handleConfirmMentor} className="green-button">
          Confirm Application
        </button>
        <button onClick={handleRejectMentor} className="red-button">
          Reject Application
        </button>
      </div>

    </div>
  )

}

export default ViewMentorApplication;