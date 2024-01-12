
const Mentor = (mentor) => {

  return (
    <div className="mentor-item-card">
      <img src={mentor.img} />
      <span className="mentor-name">{mentor.name}</span>
      <span className="mentor-community">{mentor.community} Mentor</span>
    </div>
  )
}

export default Mentor;