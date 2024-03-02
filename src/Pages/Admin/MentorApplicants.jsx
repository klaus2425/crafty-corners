import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import axiosClient from "../../axios-client";
import toast, { Toaster } from "react-hot-toast";
import Loading from "../../components/utils/Loading";


const MentorApplicants = () => {
  const [applicants, setApplicants] = useState();
  const [loading, setLoading] = useState(true);
  const storageBaseUrl = import.meta.env.VITE_API_STORAGE_URL;
  const onDeleteClick = user => {
    console.log(user);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {

    });
  }

  const getApplicants = () => {
    setLoading(true);
    axiosClient.get('/mentorship-applications')
      .then((res => {
        console.log(res.data.data);
        setLoading(false);
        setApplicants(res.data.data)
      }))
      .catch(err => {
        toast(err.response.data.message, {
          duration: 1500,
          position: "bottom-center",
          icon: "❌",
          style: {
            borderRadius: "100px",
            border: 0,
            boxShadow: "0 0px 20px rgb(0 0 0 / 0.1)",
          }

        })
        setLoading(false)
      }


      )
  }

  useEffect(() => {
    getApplicants();
  }, [])


  return (
    <div className="communities-container">
      <Toaster />
      <div className="top-section">
        <div className='user-count'>{applicants?.length} <br />Pending Mentor Applicants</div>
      </div>
      <div className='users-table'>
        {loading ? <Loading /> :
          applicants.map(a => (
            <div key={a.id} className="community-item">
              <div className="community-item-details" >
                <div className="community-details-top">
                  <span id='user-img-span'><img src={`${storageBaseUrl + a.user?.profile_picture}`} alt="" /></span>
                  <span><strong>Full Name:  <br /> </strong> {a.user.first_name} {a.user.middle_name} {a.user.last_name}</span>
                  <span><strong>Status:  <br/></strong> {a.status}</span>
                  <span><strong>Date of Application:  <br /></strong>{a.date_of_Assessment}</span>
                </div>
                <div className="buttons-community">
                  <Link to={`/mentor-applicants/${a.id}`} className="orange-button">View Details</Link> 
                  <button className="red-button" onClick={ev => onDeleteClick(1)}>Delete Application</button>
                </div>
              </div>
            </div>
          ))
        }
      </div>

    </div>
  )
}

export default MentorApplicants;