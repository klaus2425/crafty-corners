import axiosClient from "../axios-client";
import toast from "react-hot-toast";

const ConfirmDeleteMessageModal = (props) => {

  const deleteMessage = () => {
    axiosClient.delete(`/conversation/delete-message/${props.id}`)
    .then(() => {
      props.getMessages(props.receiver_id)
      toast('Message deleted', {
        duration: 1500,
        position: "bottom-center",
        icon: "✅",
        style: {
          borderRadius: "100px",
          border: 0,
          boxShadow: "0 0px 20px rgb(0 0 0 / 0.1)",
        }
      })
    })
    props.setDeleteMessageOpen(false)
  }

  return props.deleteMessageOpen ? (
    <div className="overlay">
      <div className="modal" id="delete-modal">
        <span className="modal-text">Are you sure to delete this conversation?</span>
        <div className="delete-modal-buttons">
          <button onClick={deleteMessage}className="red-button">Yes</button>
          <button onClick={() => props.setDeleteMessageOpen(false)} className="orange-button">No</button>
        </div>
      </div>
    </div>
  )

    :

    null;
}

export default ConfirmDeleteMessageModal;