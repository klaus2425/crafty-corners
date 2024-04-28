import { useRef, useState } from "react";
import axiosClient from "../axios-client";
import toast from "react-hot-toast";

const ReportConversationModal = (props) => {
  const selectRef = useRef();
  const [image, setImage] = useState();
  const [fileUpload, setFileUpload] = useState();
  const [file, setFile] = useState();
  const descriptionRef = useRef();

  const handleFileChange = (ev) => {
    const file = ev.target.files[0];
    setFileUpload(true);
    setFile(file)
    setImage(URL.createObjectURL(file));
    setPostType('image');
  }
  const handleClose = () => {
    props.setOpenReport(false)
  }

  const submit = () => {
    const formData = new FormData();
    formData.append('reason', selectRef.current.value);
    formData.append('description', descriptionRef.current.value);
    formData.append('proof', file)

    toast.promise(axiosClient.post(`/report/conversation/${props.id}`, formData), {
      loading: 'Submitting Report',
      success: () => {
        props.setOpenReport(false)
        return <b>Report Submitted</b>
      },
      error: (err) => {
        console.log(err);
        return `${err.response.data.message}`
      },
    },)
  }
  return (
    <div className="overlay">
      <div className="modal" id="delete-modal">
        <div className='close'>
          <div className='close-left'>
            <span className="modal-text"><h3>Report conversation</h3></span>
          </div>
          <svg onClick={handleClose} xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none">
            <path d="M12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 10.8181 3.23279 9.64778 3.68508 8.55585C4.13738 7.46392 4.80031 6.47177 5.63604 5.63604C6.47177 4.80031 7.46392 4.13738 8.55585 3.68508C9.64778 3.23279 10.8181 3 12 3C13.1819 3 14.3522 3.23279 15.4442 3.68508C16.5361 4.13738 17.5282 4.80031 18.364 5.63604C19.1997 6.47177 19.8626 7.46392 20.3149 8.55585C20.7672 9.64778 21 10.8181 21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4441 20.3149C14.3522 20.7672 13.1819 21 12 21L12 21Z" stroke="#222222" strokeLinecap="round" />
            <path d="M9 9L15 15" stroke="#222222" strokeLinecap="round" />
            <path d="M15 9L9 15" stroke="#222222" strokeLinecap="round" />
          </svg>
        </div>
        Reason:
        <select ref={selectRef} name="reason">
          <option value="Spam">Spam</option>
          <option value="Violence">Violence</option>
          <option value="Hate Speech">Hate Speech</option>
          <option value="False Information">False Information</option>
          <option value="Harassment">Harassment</option>
          <option value="Nudity">Nudity</option>
          <option value="Plagiarism">Plagiarism</option>
        </select>
        <textarea ref={descriptionRef} cols="15" rows="5" placeholder="Report description"></textarea>
        <span>Proof:</span>
        {
          !fileUpload ?
            <div className="media-upload-container">
              <input onChange={handleFileChange} id='upload-button' type="file" accept=".jpg, .png, .jpeg" />
              <label htmlFor="upload-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd" d="M7.17157 13H6C4.34315 13 3 11.6569 3 10C3 8.34315 4.34315 7 6 7C6.27954 7 6.41931 7 6.51699 6.98034C6.81502 6.92036 6.95652 6.82876 7.13328 6.58143C7.19121 6.50036 7.27282 6.31851 7.43606 5.95481C8.21776 4.21307 9.96722 3 12 3C14.0328 3 15.7822 4.21307 16.5639 5.95481C16.7272 6.31851 16.8088 6.50036 16.8667 6.58143C17.0435 6.82876 17.185 6.92036 17.483 6.98034C17.5807 7 17.7205 7 18 7C19.6569 7 21 8.34315 21 10C21 11.6569 19.6569 13 18 13H16.8284L13.4142 9.58579L12 8.17157L10.5858 9.58579L7.17157 13Z" fill="#222222" />
                  <path d="M12 12L11.2929 11.2929L12 10.5858L12.7071 11.2929L12 12ZM13 21C13 21.5523 12.5523 22 12 22C11.4477 22 11 21.5523 11 21L13 21ZM7.29289 15.2929L11.2929 11.2929L12.7071 12.7071L8.70711 16.7071L7.29289 15.2929ZM12.7071 11.2929L16.7071 15.2929L15.2929 16.7071L11.2929 12.7071L12.7071 11.2929ZM13 12L13 21L11 21L11 12L13 12Z" fill="#222222" />
                </svg>
                <p>Upload an Image/Video</p>
              </label>
            </div>
            :
            <div className="media-upload-container">
              <div className='uploaded-container'>
                <img className='post-uploaded-img' src={image} />
                <input id='upload-button' type="file" onChange={handleFileChange} accept=".mp4, .jpg, .png, .jpeg" />
                <label htmlFor='upload-button' className="change-picture">Change File</label>
              </div>
            </div>
        }
        <div className="delete-modal-buttons">
          <button onClick={submit} className="orange-button">Submit</button>
        </div>
      </div>
    </div>
  )
}

export default ReportConversationModal;