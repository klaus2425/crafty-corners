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
    const [searchKey, setSearchKey] = useState('')

    const getVideos = () => {
        setLoading(true);
        axiosClient.get('/videos')
            .then((res) => {
                setLoading(false);
                setVideos(res.data.data);
            })
    }

    const onDeleteClick = video => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosClient.delete(`/videos/${video.id}`)
                    .then((res) => {
                        getVideos();
                        Swal.fire({
                            title: "Deleted!",
                            text: "Video has been deleted",
                            icon: "success"
                        });
                    })

            }
        });
    }

    useEffect(() => {
        getVideos();
    }, [])

    return (
        <div className="communities-container">
            <div className="top-section">
                <Link className="add-community-button" to={'/add-video'}><span><FontAwesomeIcon icon={faPlus} /></span> Add a Video</Link>
            </div>
            <div className="filters">
                <span><strong>Filters:</strong></span>
                <input onChange={(ev) => setSearchKey(ev.target.value)} className='student-id-search' type="text" placeholder='Search by Student ID' />
            </div>
            <div className='users-table'>

                {loading ? <Loading /> :

                    videos.filter(u => {
                        console.log(u.video_title.toLowerCase().includes(searchKey.toLowerCase()));
                        if (u.video_title.toLowerCase().includes(searchKey.toLowerCase())) {
                            return u
                        }
                        else if (searchKey === '') {
                            return u
                        }
                    }).map(u => (
                        <div key={u.id} className="community-item">
                            <div className="community-item-details" >
                                <div className="community-details-top">
                                    <span><strong>Video Title: <br /></strong>{u.video_title}</span>
                                    <span className='desc'><strong>Description: <br /></strong> {u.video_description}</span>
                                    <span><strong>Community: <br /></strong> {u.community.name}</span>
                                    <span><strong>Uploaded by:  <br /></strong>{u.user.first_name} {u.user.middle_name} {u.user.last_name}</span>
                                </div>
                                <div className="buttons-community">
                                    <Link to={`/edit-video/${u.id}`} className="orange-button">View Video</Link>
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