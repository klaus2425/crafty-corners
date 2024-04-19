import { useQuery } from "@tanstack/react-query";
import axiosClient from "../axios-client";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { useStateContext } from "../context/ContextProvider";
import toast from "react-hot-toast";

const MentorAddVideo = () => {

  const { user } = useStateContext();
  const [selected, setSelected] = useState();
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const getCommunities = async () => {
    const fetchedData = await axiosClient.get('/mentor-communities')

    return fetchedData.data;
  }

  const { data, isLoading } = useQuery(
    {
      queryKey: ['community-mentor-list'],
      queryFn: getCommunities,
    }
  )

  const handleChange = (ev) => {
    setSelected(ev.target.value);
  }

  const handleSubmit = (ev) => {
    ev.preventDefault()
    const formData = new FormData();
    formData.append('video_title', titleRef.current.value);
    formData.append('creator', authorRef.current.value);
    formData.append('video_description', descriptionRef.current.value);
    formData.append('community_id', selected);
    formData.append('user_id', user.id);
    formData.append('video_url', linkRef.current.value);
    axiosClient.post('/videos', formData).then(({ data }) => {
      setIsButtonDisabled(false);

      navigate(`/videos`)
    }).catch((err) => {
      toast.error(`${Object.values(err.response.data.errors)[0]}`)
      setIsButtonDisabled(false);

    })


  }
  const titleRef = useRef();
  const authorRef = useRef();
  const descriptionRef = useRef();
  const linkRef = useRef();

  return (
    <div className="authenticated-container">
      <div className="feed">
        <div className='section-header-col'>
          <div className="section-header">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M5.58579 4.58579C5 5.17157 5 6.11438 5 8V17C5 18.8856 5 19.8284 5.58579 20.4142C6.17157 21 7.11438 21 9 21H15C16.8856 21 17.8284 21 18.4142 20.4142C19 19.8284 19 18.8856 19 17V8C19 6.11438 19 5.17157 18.4142 4.58579C17.8284 4 16.8856 4 15 4H9C7.11438 4 6.17157 4 5.58579 4.58579ZM9 8C8.44772 8 8 8.44772 8 9C8 9.55228 8.44772 10 9 10H15C15.5523 10 16 9.55228 16 9C16 8.44772 15.5523 8 15 8H9ZM9 12C8.44772 12 8 12.4477 8 13C8 13.5523 8.44772 14 9 14H15C15.5523 14 16 13.5523 16 13C16 12.4477 15.5523 12 15 12H9ZM9 16C8.44772 16 8 16.4477 8 17C8 17.5523 8.44772 18 9 18H13C13.5523 18 14 17.5523 14 17C14 16.4477 13.5523 16 13 16H9Z" fill="#222222" />                        </svg>
            <h3>Articles</h3>
          </div>
          <div className="round-card">
            <div>
              Add new video
            </div>
          </div>
        </div>
        <div className="card">
          <div className="mentor-article-form">
            <form>
              <div className="article-input">
                <label><strong>Video Title:</strong></label>
                <input ref={titleRef} type="text" />
              </div>
              <div className="article-input">
                <label><strong>Video Creator:</strong></label>
                <input ref={authorRef} type="text" />
              </div>
              <div className="article-input">
                <label><strong>Description:</strong></label>
                <div className="textarea-container">
                  <textarea ref={descriptionRef} onChange={ev => setCount(ev.target.value.length)} />
                  <span style={count >= 255 ? { color: '#F44336' } : { color: '#677186' }} className='text-counter'>{count}/255</span>
                </div>
              </div>
              <div className="article-input">
                <label><strong>Video Link:</strong></label>
                <input ref={linkRef} type="textarea" />
              </div>
              <div className="article-input">
                <label><strong>Community:</strong></label>
                <select name="communities" onChange={handleChange}>
                  <option >Select a community</option>
                  {data && data.map((community) => (
                    <option key={community.id} value={community.id}>{community.name}</option>
                  ))}
                </select>
              </div>
              <button onClick={handleSubmit} className='purple-button' disabled={isButtonDisabled}>Submit</button>
            </form>
          </div>
        </div>
      </div>
      <div className="recommended">
      </div>
    </div>
  )
}

export default MentorAddVideo;

