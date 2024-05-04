import { useEffect, useRef, useState } from "react";
import axiosClient from "../../axios-client";
import { useNavigate, useParams } from "react-router-dom";
import toast from 'react-hot-toast';
import Swal from "sweetalert2";
import Loading from "../../components/utils/Loading";
import { useQueryClient } from "@tanstack/react-query";

const ViewMentorApplication = () => {
  const { id } = useParams();
  const [applicant, setApplicant] = useState({});
  const dateTimeRef = useRef();
  const storageBaseUrl = import.meta.env.VITE_API_STORAGE_URL;
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('date_of_Assessment', dateTimeRef.current.value)
    formData.append('status', 'For Assessment')
    axiosClient.post(`/mentor/${id}/set-assessment_date`, formData)
      .then(() => {
        toast.success('Asessment date set!');
      })
      .catch(err => toast.error(err.response.data.message))
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

        toast.promise(axiosClient.post(`/accept-mentorship-application/${applicant.id}`), {
          loading: 'Accepting application',
          success: () => {
            queryClient.invalidateQueries({queryKey: ['mentor-applicants']});
            return <b>Application accepted</b>
          },
          error: (err) => {
            return `${err.response.data.message}`
          },
        },
        )
      }
    });
  }

  const handleRevokeMentor = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Pressing yes will remove this user's mentor role",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then((result) => {
      if (result.isConfirmed) {
        toast.promise(axiosClient.post(`/mentor/${applicant.id}/revoke-mentorship`), {
          loading: 'Revoking mentorship',
          success: () => {
            queryClient.invalidateQueries({queryKey: ['mentor-applicants']});
            return <b>Mentorship revoked</b>
          },
          error: (err) => {
            return `${err.response.data.message}`
          },
        },
        )

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
        toast.promise(axiosClient.post(`/reject-mentorship-application/${applicant.id}`), {
          loading: 'Declining application',
          success: () => {
            navigate('/mentor-applicants');
            queryClient.invalidateQueries({queryKey: ['mentor-applicants']});
            return <b>Application declined</b>
          },
          error: (err) => {
            return `${err.response.data.message}`
          },
        },
        )
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
    applicant.user ?
      <div className="communities-container">
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

        {
          applicant?.status === 'approved' ?
            <div className="application-bottom">
              <button onClick={handleRevokeMentor} className="red-button">
                Revoke Mentorship
              </button>
            </div>
            :

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
        }
      </div>
      :
      <Loading />
  )

}

export default ViewMentorApplication;