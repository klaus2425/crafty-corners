
const ViewMentorApplication = () => {

  return (
    <div className="communities-container">
      <div className="top-section">
        <h2>Applicant's Information</h2>
      </div>
      <div className="applicant-image">
        <img src="/kafka.jpg" alt="" />
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
          <div>Date of Assessment</div>
          <input type="date" name="" id="" readOnly />
        </div>
      </div>
      <div className="application-bottom">
        <button className="purple-button">
          Confirm Application
        </button>
      </div>

    </div>
  )

}

export default ViewMentorApplication;