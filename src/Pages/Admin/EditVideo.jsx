import Swal from 'sweetalert2';
import { useState, useEffect } from 'react';
import axiosClient from '../../axios-client';
import { useStateContext } from '../../context/ContextProvider';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../../components/utils/Loading';

const EditVideo = () => {
    let { id } = useParams();
    const [communities, setCommunities] = useState([]);
    const [video, setVideo] = useState({});
    const [selected, setSelected] = useState();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
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

    const handleTextChange = (ev) => {
        setVideo({ ...video, video_description: ev.target.value });
        setCount(ev.target.value.length);
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
        setVideo({ ...video, community: { id: ev.target.value } });
    }


    useEffect(() => {
        getCommunities();
        getVideo();
    }, [])



    const onSubmit = (ev) => {
        ev.preventDefault();
        const formData = new FormData();
        formData.append('_method', "PUT")
        formData.append('creator', video.creator);
        formData.append('community_id', video.community.id);
        formData.append('video_title', video.video_title);
        formData.append('video_url', video.video_url)
        formData.append('video_description', video.video_description);
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

    return (

        <div className="add-article-container">
            <h2>Edit Video</h2>
            {loading ? <Loading /> :
                <form onSubmit={onSubmit}>
                    <div className="article-form">
                        <div className="article-input">
                            <label><strong>Video Title:</strong></label>
                            <input value={video.video_title} onChange={ev => setVideo({ ...video, video_title: ev.target.value })} type="text" />
                        </div>
                        <div className="article-input">
                            <label><strong>Video Creator:</strong></label>
                            <input value={video.creator} onChange={ev => setVideo({ ...video, creator: ev.target.value })} type="text" />
                        </div>
                        <div className="article-input">
                            <label><strong>Description:</strong></label>
                            <div className="textarea-container">
                                <textarea maxLength={255} value={video.video_description} onChange={ev => handleTextChange(ev)} />
                                <span style={count >= 255 ? { color: '#F44336' } : { color: '#677186' }} className='text-counter'>{count}/255</span>
                            </div>

                        </div>
                        <div className="article-input">
                            <label><strong>Link:</strong></label>
                            <input value={video.video_url} onChange={ev => setVideo({ ...video, video_url: ev.target.value })} />
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