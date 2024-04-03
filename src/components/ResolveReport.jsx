import { useRef } from "react";
import axiosClient from "../axios-client";

const ResolveReport = (props) => {
  const selectRef = useRef();

  const handleClose = () => {
    props.setResolveOpen(false);
    
  }

  const handleSubmit =  () => {
    axiosClient.post(`/resolve/${props.postId}`)
  }
  return props.resolveOpen ? (
    <div className="overlay">
      <div className="modal" id="report-modal">
        <div className='close'>
        <span style={{color: '#000', fontWeight: 'bold'}}>Resolve this post</span>
          <svg onClick={handleClose} xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none">
            <path d="M12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 10.8181 3.23279 9.64778 3.68508 8.55585C4.13738 7.46392 4.80031 6.47177 5.63604 5.63604C6.47177 4.80031 7.46392 4.13738 8.55585 3.68508C9.64778 3.23279 10.8181 3 12 3C13.1819 3 14.3522 3.23279 15.4442 3.68508C16.5361 4.13738 17.5282 4.80031 18.364 5.63604C19.1997 6.47177 19.8626 7.46392 20.3149 8.55585C20.7672 9.64778 21 10.8181 21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4441 20.3149C14.3522 20.7672 13.1819 21 12 21L12 21Z" stroke="#222222" strokeLinecap="round" />
            <path d="M9 9L15 15" stroke="#222222" strokeLinecap="round" />
            <path d="M15 9L9 15" stroke="#222222" strokeLinecap="round" />
          </svg>
        </div>
        Resolution:
        <select ref={selectRef} type="text" >
          <option value="Send a warning">Send a warning</option>
          <option value="Suspend user">Suspend user</option>
          <option value="Ignore report">Ignore report</option>
        </select>
        <button onClick={handleSubmit} className="purple-button">Submit</button>

      </div>
    </div>
  )
    :
    null
}

export default ResolveReport;