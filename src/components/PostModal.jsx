import { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import axiosClient from '../axios-client';
import Swal from 'sweetalert2';
import { useStateContext } from '../context/ContextProvider';

const PostModal = (props) => {
  const { id } = useParams();
  const [fileUpload, setFileUpload] = useState(false);
  const [fileType, setFileType] = useState('');
  const [image, setImage] = useState();
  const [video, setVideo] = useState();
  const [postType, setPostType] = useState('text');
  const [file, setFile] = useState();
  const [count, setCount] = useState();
  const titleRef = useRef();
  const descriptionRef = useRef();
  const linkRef = useRef();
  const { user } = useStateContext();

  const handleCount = (ev) => {
    setCount(ev.target.value.length);
  }

  const handleSubmit = (ev) => {
    ev.preventDefault()
    if (postType === 'video') {
      const formData = new FormData();
      formData.append('user_id', user.id);
      formData.append('community_id', id);
      formData.append('title', titleRef.current.value);
      formData.append('video', file);
      formData.append('post_type', 'video');

      axiosClient.post('/posts', formData)
        .then(res => {
          handleClose();
        })
        .catch(err => {
          const response = err.response;
          console.log(err);
          if (response && response.status === 422) {
            Swal.fire({
              title: "Error",
              text: `${Object.values(response.data.errors)[0]}`,
              icon: "warning"
            });
          }
        });
    }
    else if (postType === 'image') {
      const formData = new FormData();
      formData.append('user_id', user.id);
      formData.append('community_id', id);
      formData.append('title', titleRef.current.value);
      formData.append('image', file);
      formData.append('post_type', 'image');
      axiosClient.post('/posts', formData)
        .then(res => {
          console.log(res.data);
          handleClose();

        })
        .catch(err => {
          const response = err.response;
          console.log(err);
          if (response && response.status === 422) {
            Swal.fire({
              title: "Error",
              text: `${Object.values(response.data.errors)[0]}`,
              icon: "warning"
            });
          }
        })
    }
    else if (postType === 'text') {
      const formData = new FormData();
      formData.append('user_id', user.id);
      formData.append('community_id', id);
      formData.append('title', titleRef.current.value);
      formData.append('content', descriptionRef.current.value);
      formData.append('post_type', 'text');
      axiosClient.post('/posts', formData)
        .then(res => {
          handleClose();

        })
        .catch(err => {
          const response = err.response;
          console.log(err);
          if (response && response.status === 422) {
            Swal.fire({
              title: "Error",
              text: `${Object.values(response.data.errors)[0]}`,
              icon: "warning"
            });
          }
        })
    }
    else if (postType === 'url') {
      const formData = new FormData();
      formData.append('user_id', user.id);
      formData.append('community_id', id);
      formData.append('title', titleRef.current.value);
      formData.append('link', linkRef.current.value);
      formData.append('content', descriptionRef.current.value);
      formData.append('post_type', 'link');
      axiosClient.post('/posts', formData)
        .then(res => {
          handleClose();
        })
        .catch(err => {
          const response = err.response;
          console.log(err);
          if (response && response.status === 422) {
            Swal.fire({
              title: "Error",
              text: `${Object.values(response.data.errors)[0]}`,
              icon: "warning"
            });
          }
        })
    }

  }

  const handleTabChange = (index) => {
    index !== 1 &&
      setImage(null);
    setVideo(null);
    setPostType(null);
    setFileType(null);
    setFileUpload(false);
    index === 0 && setPostType('text');
    index === 2 && setPostType('url');
    setCount(0);
  }

  const handleFileChange = (ev) => {
    const file = ev.target.files[0];
    setFile(file);
    setFileUpload(true);
    if (file.type === 'video/mp4') {
      setPostType('video');
      setVideo(URL.createObjectURL(file));
    }
    else {
      setImage(URL.createObjectURL(file));
      setPostType('image');
    }

    setFileType(file.type);
  }

  const handleClose = () => {
    props.setIsOpen(false);
    setFileUpload(false);
  }

  return props.isOpen ?
    (
      <div className="overlay">
        <div className="post-modal">
          <div className='close'>
            <span className="header-span">Create a post</span>
            <svg onClick={handleClose} xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none">
              <path d="M12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 10.8181 3.23279 9.64778 3.68508 8.55585C4.13738 7.46392 4.80031 6.47177 5.63604 5.63604C6.47177 4.80031 7.46392 4.13738 8.55585 3.68508C9.64778 3.23279 10.8181 3 12 3C13.1819 3 14.3522 3.23279 15.4442 3.68508C16.5361 4.13738 17.5282 4.80031 18.364 5.63604C19.1997 6.47177 19.8626 7.46392 20.3149 8.55585C20.7672 9.64778 21 10.8181 21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4441 20.3149C14.3522 20.7672 13.1819 21 12 21L12 21Z" stroke="#222222" strokeLinecap="round" />
              <path d="M9 9L15 15" stroke="#222222" strokeLinecap="round" />
              <path d="M15 9L9 15" stroke="#222222" strokeLinecap="round" />
            </svg>
          </div>
          <form>
            <Tabs onSelect={(index) => handleTabChange(index)}>
              <TabList>
                <Tab >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.58579 4.58579C5 5.17157 5 6.11438 5 8V17C5 18.8856 5 19.8284 5.58579 20.4142C6.17157 21 7.11438 21 9 21H15C16.8856 21 17.8284 21 18.4142 20.4142C19 19.8284 19 18.8856 19 17V8C19 6.11438 19 5.17157 18.4142 4.58579C17.8284 4 16.8856 4 15 4H9C7.11438 4 6.17157 4 5.58579 4.58579ZM9 8C8.44772 8 8 8.44772 8 9C8 9.55228 8.44772 10 9 10H15C15.5523 10 16 9.55228 16 9C16 8.44772 15.5523 8 15 8H9ZM9 12C8.44772 12 8 12.4477 8 13C8 13.5523 8.44772 14 9 14H15C15.5523 14 16 13.5523 16 13C16 12.4477 15.5523 12 15 12H9ZM9 16C8.44772 16 8 16.4477 8 17C8 17.5523 8.44772 18 9 18H13C13.5523 18 14 17.5523 14 17C14 16.4477 13.5523 16 13 16H9Z" fill="#222222" />
                  </svg>
                  Text
                </Tab>
                <Tab>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.17157 3.17157C2 4.34314 2 6.22876 2 9.99999V14C2 17.7712 2 19.6568 3.17157 20.8284C4.34315 22 6.22876 22 10 22H14C17.7712 22 19.6569 22 20.8284 20.8284C22 19.6569 22 17.7712 22 14V14V9.99999C22 7.16065 22 5.39017 21.5 4.18855V17C20.5396 17 19.6185 16.6185 18.9393 15.9393L18.1877 15.1877C17.4664 14.4664 17.1057 14.1057 16.6968 13.9537C16.2473 13.7867 15.7527 13.7867 15.3032 13.9537C14.8943 14.1057 14.5336 14.4664 13.8123 15.1877L13.6992 15.3008C13.1138 15.8862 12.8212 16.1788 12.5102 16.2334C12.2685 16.2758 12.0197 16.2279 11.811 16.0988C11.5425 15.9326 11.3795 15.5522 11.0534 14.7913L11 14.6667C10.2504 12.9175 9.87554 12.0429 9.22167 11.7151C8.89249 11.5501 8.52413 11.4792 8.1572 11.5101C7.42836 11.5716 6.75554 12.2445 5.40989 13.5901L3.5 15.5V2.88739C3.3844 2.97349 3.27519 3.06795 3.17157 3.17157Z" fill="#222222" />
                    <path d="M3 10C3 8.08611 3.00212 6.75129 3.13753 5.74416C3.26907 4.76579 3.50966 4.2477 3.87868 3.87868C4.2477 3.50966 4.76579 3.26907 5.74416 3.13753C6.75129 3.00212 8.08611 3 10 3H14C15.9139 3 17.2487 3.00212 18.2558 3.13753C19.2342 3.26907 19.7523 3.50966 20.1213 3.87868C20.4903 4.2477 20.7309 4.76579 20.8625 5.74416C20.9979 6.75129 21 8.08611 21 10V14C21 15.9139 20.9979 17.2487 20.8625 18.2558C20.7309 19.2342 20.4903 19.7523 20.1213 20.1213C19.7523 20.4903 19.2342 20.7309 18.2558 20.8625C17.2487 20.9979 15.9139 21 14 21H10C8.08611 21 6.75129 20.9979 5.74416 20.8625C4.76579 20.7309 4.2477 20.4903 3.87868 20.1213C3.50966 19.7523 3.26907 19.2342 3.13753 18.2558C3.00212 17.2487 3 15.9139 3 14V10Z" stroke="#222222" stroke-width="2" />
                    <circle cx="15" cy="9" r="2" fill="#222222" />
                  </svg>
                  Images & Video
                </Tab>
                <Tab>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M14 10L10 14" stroke="#33363F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M16 13L18 11C19.3807 9.61929 19.3807 7.38071 18 6V6C16.6193 4.61929 14.3807 4.61929 13 6L11 8M8 11L6 13C4.61929 14.3807 4.61929 16.6193 6 18V18C7.38071 19.3807 9.61929 19.3807 11 18L13 16" stroke="#33363F" stroke-width="2" stroke-linecap="round" />
                  </svg>
                  Link
                </Tab>
              </TabList>
              <TabPanel>
                <div className="post-input">
                  <div className="post-container">
                    <input required ref={titleRef} type="text" name="title" id="title" placeholder='Title' />
                    <div className="textarea-container">
                      <textarea maxLength={1000} onChange={ev => handleCount(ev)} ref={descriptionRef} placeholder='Description' cols="30" rows="10" />
                      <span style={count >= 1000 ? { color: '#F44336' } : { color: '#677186' }} className='text-counter'>{count}/1000</span>
                    </div>
                  </div>
                </div>

              </TabPanel>
              <TabPanel>
                <div className="post-input">
                  <div className="post-container">
                    <input ref={titleRef} type="text" name="title" id="title" placeholder='Title' />
                    <div className="media-upload-container">
                      {
                        !fileUpload ?
                          <>
                            <input id='upload-button' type="file" onChange={handleFileChange} accept=".mp4, .jpg, .png, .jpeg" />
                            <label htmlFor="upload-button">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.17157 13H6C4.34315 13 3 11.6569 3 10C3 8.34315 4.34315 7 6 7C6.27954 7 6.41931 7 6.51699 6.98034C6.81502 6.92036 6.95652 6.82876 7.13328 6.58143C7.19121 6.50036 7.27282 6.31851 7.43606 5.95481C8.21776 4.21307 9.96722 3 12 3C14.0328 3 15.7822 4.21307 16.5639 5.95481C16.7272 6.31851 16.8088 6.50036 16.8667 6.58143C17.0435 6.82876 17.185 6.92036 17.483 6.98034C17.5807 7 17.7205 7 18 7C19.6569 7 21 8.34315 21 10C21 11.6569 19.6569 13 18 13H16.8284L13.4142 9.58579L12 8.17157L10.5858 9.58579L7.17157 13Z" fill="#222222" />
                                <path d="M12 12L11.2929 11.2929L12 10.5858L12.7071 11.2929L12 12ZM13 21C13 21.5523 12.5523 22 12 22C11.4477 22 11 21.5523 11 21L13 21ZM7.29289 15.2929L11.2929 11.2929L12.7071 12.7071L8.70711 16.7071L7.29289 15.2929ZM12.7071 11.2929L16.7071 15.2929L15.2929 16.7071L11.2929 12.7071L12.7071 11.2929ZM13 12L13 21L11 21L11 12L13 12Z" fill="#222222" />
                              </svg>
                              <p>Upload an Image/Video</p>
                            </label>
                          </>
                          :
                          (
                            fileType !== 'video/mp4' ?
                              <div className='uploaded-container'>
                                <img className='post-uploaded-img' src={image} />
                                <input id='upload-button' type="file" onChange={handleFileChange} accept=".mp4, .jpg, .png, .jpeg" />
                                <label htmlFor='upload-button' className="change-picture">Change File</label>
                              </div>
                              :
                              <div className='uploaded-container'>
                                <video controls src={video}></video>
                                <input id='upload-button' type="file" onChange={handleFileChange} accept=".mp4, .jpg, .png, .jpeg" />
                                <label htmlFor='upload-button' className="change-picture">Change File</label>
                              </div>
                          )
                      }
                    </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel>
                <div className="post-input">
                  <div className="post-container">
                    <input ref={titleRef} type="text" name="title" id="title" placeholder='Title' />
                    <input ref={linkRef} type="text" name="link" id="title" placeholder='Url' />
                    <div className="textarea-container" >
                      <textarea maxLength={140} onChange={ev => handleCount(ev)} ref={descriptionRef} placeholder='Description' cols="30" rows="10" />
                      <span style={count >= 140 ? { color: '#F44336' } : { color: '#677186' }} className='text-counter'>{count}/140</span>
                    </div>
                  </div>
                </div>
              </TabPanel>
            </Tabs>
            <button type='submit' onClick={handleSubmit} className='purple-button'>Post</button>
          </form>
        </div>
      </div>
    )
    :
    null


}


export default PostModal;