import axiosClient from "../axios-client";


const ConfirmDeleteModal = (props) => {



  return props.deleteOpen ? (
    <div className="overlay">
      <div className="modal" id="delete-modal">
        <span className="modal-text">Are you sure to delete this conversation?</span>
        <div className="delete-modal-buttons">
          <button onClick={deleteConversation}className="red-button">Yes</button>
          <button onClick={() => props.setDeleteOpen(!props.deleteOpen)} className="orange-button">No</button>
        </div>
      </div>
    </div>
  )

    :

    null;
}

export default ConfirmDeleteModal;