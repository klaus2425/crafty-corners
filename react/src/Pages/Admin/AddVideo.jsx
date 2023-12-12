import Swal from 'sweetalert2';
import { useState, useEffect, useRef } from 'react'
import axiosClient from '../../axios-client';
import { useStateContext } from '../../context/ContextProvider'
import {useNavigate} from 'react-router-dom'


const AddVideo = () => {
    const [communities, setCommunities] = useState([]);
    const {user} = useStateContext();
    const [selected, setSelected] = useState();

    const getCommunities = () => {
        axiosClient.get('/communities').then(({ data }) => {
            setCommunities(data.data);
        }).catch(err => {
            const response = err.response;
            if (response && response.status === 422) {
                Swal.fire({
                    title: "Error",
                    text: `${Object.values(response.data.errors)[0]}`,
                    icon: "warning"
                });
            }
        })
    }

    useEffect(() => {
        getCommunities();
    }, [])

    const handleChange = (ev) => {
        setSelected(ev.target.value);
    }
    
    const titleRef = useRef();
    const creatorRef = useRef();
    const descriptionRef = useRef();
    const linkRef = useRef();

    const onSubmit = (ev) => {
        ev.preventDefault();
        const formData = new FormData();
        formData.append('title', titleRef.current.value);
        formData.append('creator', creatorRef.current.value);
        formData.append('description', descriptionRef.current.value);
        formData.append('community_id', selected);
        formData.append('user_id', user.id);

        
        axiosClient.post('/videos', formData)
        .then(() => navigate('/admin-videos'))
        .catch(err => {
            const response = err.response;
            if (response && response.status === 422) {
                Swal.fire({
                    title: "Error",
                    text: `${Object.values(response.data.errors)[0]}`,
                    icon: "warning"
                });
            }
        })
    }

    return(
        
        <div className="add-article-container">
            <h2>Add a Video</h2>
            <form onSubmit={onSubmit}>
                <div className="article-form">
                    <div className="article-input">
                        <label>Video Title:</label>
                        <input ref={titleRef} type="text" />
                    </div>
                    <div className="article-input">
                        <label>Video Creator:</label>
                        <input ref={creatorRef} type="text" />
                    </div>
                    <div className="article-input">
                        <label>Description:</label>
                        <input ref={descriptionRef} type="textarea" />
                    </div>
                    <div className="article-input">
                        <label>Link:</label>
                        <input ref={linkRef} type="textarea" />
                    </div>
                    <div className="article-input">
                        <label>Community:</label>
                        <select onChange={handleChange} name="communities">
                            <option >Select a community</option>      
                            {communities.map((community) => (
                                <option value={community.id}>{community.name}</option>      
                            ))}
                        </select>
                    </div>
                    <button className='purple-button'>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default AddVideo;