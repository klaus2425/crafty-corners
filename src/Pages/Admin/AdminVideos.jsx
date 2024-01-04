import { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import axiosClient from "../../axios-client";
import Swal from 'sweetalert2'
import Loading from '../../components/utils/Loading';

const AdminVideos = () => {
    const [loading, setLoading] = useState(false);
    const [videos, setVideos] = useState([]);

    const getVideos = () => {
        setLoading(true);   
        axiosClient.get('/videos')
        .then((res) => {
            setLoading(false);
            setVideos(res.data.data)
        })
    }

    useEffect(() => {
        getVideos();
    }, [])

    return (
        <div className="communities-container">
            <div className="top-section">
                <Link className="add-community-button" to={'/add-video'}><span><FontAwesomeIcon icon={faPlus} /></span> Add a Video</Link>
            </div>
            <div className='users-table'>
            
            {loading ? <Loading /> :
                
                videos.map(u => (
                    <div key={u.id} className="community-item">
                        <div className="community-item-details" >
                            <div className="community-details-top">
                                <span><strong>Video Title: <br/></strong>{u.video_title}</span>
                                <span><strong>Description: <br/></strong> {u.video_description}</span>
                                <span><strong>Community: <br/></strong> {u.community.name}</span>
                            </div>
                            <div className="buttons-community">
                                <Link to={'/edit-community/' + u.id} className="orange-button">View Video</Link>
                                <button className="red-button" onClick={ev => onDeleteClick(u)}>Delete Video</button>
                            </div>
                            

                        </div>
                    </div>
                ))
            }
            
            </div>
    </div>
    )
}

export default AdminVideos;