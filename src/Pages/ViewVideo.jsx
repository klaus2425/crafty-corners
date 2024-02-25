import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import axiosClient from '../axios-client';
import ReactPlayer from 'react-player';
import Loading from '../components/utils/Loading';

const ViewVideo = () => {

  const { id } = useParams();
  const [video, setVideo] = useState([]);
  const [loading, setLoading] = useState(false);

  const getVideo = () => {
    setLoading(true)
    axiosClient.get(`/videos/${id}`)
      .then(res => {
        setVideo(res.data.data)
        setLoading(false)
      })
  }

  useEffect(() => {
    getVideo();
  }, [])

  return (

    <div className="authenticated-container">
      <div className="feed">
        <div className='section-header-col'>
          <div className="section-header">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21ZM10.7828 7.99043L16.4265 11.1258C17.1123 11.5068 17.1123 12.4932 16.4265 12.8742L10.7828 16.0096C9.98293 16.4539 9 15.8756 9 14.9606V9.03942C9 8.12444 9.98293 7.54607 10.7828 7.99043Z" fill="#222222" />
            </svg>
            <h3>Videos</h3>
          </div>
        </div>
        <div className="video-card">
          {loading ? <Loading /> :
            (
              <>
                <div className="player-wrapper">
                  <ReactPlayer className='react-player' width="100%"
                    height="100%" url={video.video_url} controls />
                </div>
                <div className='video-sub-text'>
                  <span className='video-title'>{video.video_title}</span>
                  <span className="video-community-header">/{video.community?.name}</span>
                </div>
                <div className="video-btm-text">
                  <div className='title-likes'>
                    <span className='creator-name'>{video.creator}</span>
                    <div className='v-likes'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M8.85 19H6C5.44772 19 5 18.5523 5 18V12C5 11.4477 5.44772 11 6 11H8.85C8.93284 11 9 11.0672 9 11.15V18.85C9 18.9328 8.93284 19 8.85 19Z" stroke="#33363F" strokeWidth="2" strokeLinecap="round" />
                        <path d="M9 11L10.8321 8.25192C10.9416 8.08766 11 7.89465 11 7.69722V5C11 4.44772 11.4477 4 12 4H13C14.1046 4 15 4.89543 15 6V11" stroke="#33363F" strokeWidth="2" strokeLinecap="round" />
                        <path d="M13 11H17.7655C18.9575 11 19.8849 12.0361 19.7532 13.2209L19.1977 18.2209C19.0851 19.2337 18.229 20 17.2099 20H13.4142C13.149 20 12.8946 19.8946 12.7071 19.7071L12.2929 19.2929C12.1054 19.1054 11.851 19 11.5858 19H9" stroke="#33363F" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                      <span>240</span>
                    </div>
                  </div>
                  <span className='video-description'>{video.video_description}</span>
                </div>
              </>
            )
          }

        </div>

      </div>

      <div className="recommended">
      </div>
    </div>
  )
}

export default ViewVideo;