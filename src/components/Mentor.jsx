import { useNavigate } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";

const Mentor = (mentor) => {
  const { user } = useStateContext();
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/u/${mentor.id}/?uid=${user.id}`)
  }

  return (
    <div className="mentor-item-card" onClick={handleClick}>
      <img src={mentor.img} />
      <span className="mentor-name">{mentor.name}</span>
      <span>{mentor.specialization}</span>
      <span className="mentor-community"><strong>/{mentor.community}</strong></span>
    </div>
  )
}

export default Mentor;