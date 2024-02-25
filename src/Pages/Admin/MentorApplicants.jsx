import { Link } from "react-router-dom";
import Swal from 'sweetalert2';


const MentorApplicants = () => {

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



  return (
    <div className="communities-container">
      <div className="top-section">
        <div className='user-count'>5 <br />Pending Mentor Applicants</div>
      </div>
      <div className='users-table'>
        <div  className="community-item">
          <div className="community-item-details" >
            <div className="community-details-top">
              <span id='user-img-span'><img src={""} alt="" /></span>
              <span><strong>Full Name: <br /> </strong> </span>
              <span><strong>  <br /></strong></span>
              <span><strong>Email:  <br /></strong></span>
              <span><strong>Date Created:  <br /></strong></span>
            </div>
            <div className="buttons-community">
              <Link to={`/mentor-applicants/${1}`} className="orange-button">View Details</Link>
              <button className="red-button" onClick={ev => onDeleteClick(1)}>Delete Application</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default MentorApplicants;