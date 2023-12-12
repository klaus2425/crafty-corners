import Swal from 'sweetalert2';
import { useState, useEffect, useRef } from 'react'
import axiosClient from '../../axios-client';
import { useStateContext } from '../../context/ContextProvider'
import {useNavigate} from 'react-router-dom'

const AddArticle = () => {
    const [communities, setCommunities] = useState([]);
    const {user} = useStateContext();
    const [selected, setSelected] = useState();
    const navigate = useNavigate();
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
    const handleChange = (ev) => {
        setSelected(ev.target.value);
    }

    const titleRef = useRef();
    const authorRef = useRef();
    const descriptionRef = useRef();
    const linkRef = useRef();

    useEffect(() => {
        getCommunities();
    }, [])

    const onSubmit = (ev) => {
        ev.preventDefault();

        const formData = new FormData();
        formData.append('title', titleRef.current.value);
        formData.append('author', authorRef.current.value);
        formData.append('description', descriptionRef.current.value);
        formData.append('community_id', selected);
        formData.append('user_id', user.id);

        axiosClient.post('/articles', formData)
        .then(() => navigate('/admin-articles'))
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
            <h2>Add an Article</h2>
            <form onSubmit={onSubmit}>
                <div className="article-form">
                    <div ref={titleRef} className="article-input">
                        <label><strong>Article Title:</strong></label>
                        <input type="text" />
                    </div>
                    <div ref={authorRef} className="article-input">
                        <label><strong>Article Author:</strong></label>
                        <input type="text" />
                    </div>
                    <div ref={descriptionRef} className="article-input">
                        <label><strong>Description:</strong></label>
                        <input type="textarea" />
                    </div>
                    <div ref={linkRef} className="article-input">
                        <label><strong>Link:</strong></label>
                        <input type="textarea" />
                    </div>
                    <div className="article-input">
                        <label><strong>Community:</strong></label>
                        <select name="communities" onChange={handleChange}>
                            <option >Select a community</option>      
                            {communities.map((community) => (
                                <option key={community.id} value={community.id}>{community.name}</option>      
                            ))}
                        </select>
                    </div>
                    <button className='purple-button'>Submit</button>

                </div>
            </form>
        </div>
    )
}

export default AddArticle;