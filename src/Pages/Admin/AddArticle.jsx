import Swal from 'sweetalert2';
import { useState, useEffect, useRef } from 'react';
import axiosClient from '../../axios-client';
import { useStateContext } from '../../context/ContextProvider';
import {useNavigate} from 'react-router-dom';

const AddArticle = () => {
    const [communities, setCommunities] = useState([]);
    const {user} = useStateContext();
    const [selected, setSelected] = useState();
    const navigate = useNavigate();
    const [count, setCount] = useState(0);
    
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
        formData.append('link', linkRef.current.value);
        axiosClient.post('/articles', formData)
        .then(() => {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Article Added",
                showConfirmButton: false,
                timer: 1500
              });
            navigate('/admin-articles')
        })
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
                    <div className="article-input">
                        <label><strong>Article Title:</strong></label>
                        <input ref={titleRef} type="text" />
                    </div>
                    <div className="article-input">
                        <label><strong>Article Author:</strong></label>
                        <input ref={authorRef} type="text" />
                    </div>
                    <div className="article-input">
                        <label><strong>Description:</strong></label>
                        <div className="textarea-container">
                            <textarea ref={descriptionRef} onChange={ev => setCount(ev.target.value.length)} />
                            <span style={count >= 255 ? {color: '#F44336'} : {color: '#677186'}} className='text-counter'>{count}/255</span>
                        </div>
                    </div>
                    <div  className="article-input">
                        <label><strong>Link:</strong></label>
                        <input ref={linkRef} type="textarea" />
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