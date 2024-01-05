import Swal from 'sweetalert2';
import { useState, useEffect } from 'react';
import axiosClient from '../../axios-client';
import { useStateContext } from '../../context/ContextProvider';
import { useNavigate, useParams } from 'react-router-dom';

const EditVideo = () => {
    let {id} = useParams();
    const [communities, setCommunities] = useState([]);
    const [video, setVideo] = useState({});
    const [selected, setSelected] = useState();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);


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

    const getVideo = () => {
        setLoading(true);
        axiosClient.get(`/videos/${id}`).then(({ data }) => {
            setVideo(data.data);
            console.log(data.data);
            setLoading(false);
        })

    }
    const handleChange = (ev) => {
        setVideo({...video, community: {id: ev.target.value}});
    }


    useEffect(() => {
        getCommunities();
        getVideo();
    }, [])

    

    const onSubmit = (ev) => {
        ev.preventDefault();
        const formData = new FormData();
        formData.append('_method', "PUT")
        for (const key in video) {
            formData.append(key, video[key]);
        }


        axiosClient.post(`/videos/${id}`, formData)
        .then(() => {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Article Updated",
                showConfirmButton: false,
                timer: 1500
              });
            getArticle();
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
            <h2>Edit Video</h2>
            {loading ? <div className="loading-admin">Loading...</div> : 
            <form onSubmit={onSubmit}>
                <div className="article-form">
                    <div className="article-input">
                        <label><strong>Video Title:</strong></label>
                        <input value={video.video_title} onChange={ev => setVideo({...video, video_title: ev.target.value})} type="text" />
                    </div>
                    <div className="article-input">
                        <label><strong>Video Creator:</strong></label>
                        <input value={video.creator} onChange={ev => setVideo({...video, creator: ev.target.value})} type="text" />
                    </div>
                    <div className="article-input">
                        <label><strong>Description:</strong></label>
                        <textarea value={video.video_description} onChange={ev => setVideo({...video, video_description: ev.target.value})} />
                    </div>
                    <div  className="article-input">
                        <label><strong>Link:</strong></label>
                        <input  value={video.video_url} onChange={ev => setVideo({...video, video_url: ev.target.value})} type="textarea" />
                    </div>
                    <div className="article-input">
                        <label><strong>Community:</strong></label>
                        <select name="communities" value={video.community?.id} onChange={handleChange}>
                            <option >Select a community</option>      
                            {communities.map((community) => (
                                <option key={community.id} value={community.id}>{community.name}</option>      
                            ))}
                        </select>
                    </div>
                    <button className='purple-button'>Submit</button>

                </div>
            </form>
            }
        </div>
    )
}

export default EditVideo;