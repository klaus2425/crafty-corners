import { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom'
import axiosClient from '../axios-client';
import ReactPlayer from 'react-player';

const ViewVideo = () => {

  const {id} = useParams();
  const [video, setVideo] = useState([]);
  const getVideo = () => {
    axiosClient.get(`/videos/${id}`)
    .then(res => {
      setVideo(res.data.data)
    })
  }
  
  useEffect(() => {
    getVideo();
  },[])

  return(
      <div className="authenticated-container">
        <div className="feed">
          <div className='section-header-col'>
            <div className="section-header">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21ZM10.7828 7.99043L16.4265 11.1258C17.1123 11.5068 17.1123 12.4932 16.4265 12.8742L10.7828 16.0096C9.98293 16.4539 9 15.8756 9 14.9606V9.03942C9 8.12444 9.98293 7.54607 10.7828 7.99043Z" fill="#222222"/>
                </svg>
                <h3>Videos</h3> 
            </div>
          </div>
          <div className="card">
            <ReactPlayer url={video.video_url} controls />
          </div>
        </div>

        <div className="recommended">
        </div>
      </div>
    )
}

export default ViewVideo;