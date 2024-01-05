import { useEffect, useState } from "react";
import Video from "../components/Video";
import Loading from "../components/utils/Loading";
import axiosClient from "../axios-client";
import Swal from 'sweetalert2';


const UserFeed =  () => {

    const [active, setActive] = useState("1");
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleClick = (ev) => {
        ev.preventDefault();
        setActive(ev.target.id);        
    }

    const getVideos = () => {
        axiosClient.get('/videos')
        .then(res => {
            setVideos(res.data.data)
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

    useEffect(() => {
        getVideos();
    }, [])

    return (
        <div className="authenticated-container">
            <div className="feed">
            <div className='section-header-col'>
                    <div className="section-header">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21ZM10.7828 7.99043L16.4265 11.1258C17.1123 11.5068 17.1123 12.4932 16.4265 12.8742L10.7828 16.0096C9.98293 16.4539 9 15.8756 9 14.9606V9.03942C9 8.12444 9.98293 7.54607 10.7828 7.99043Z" fill="#222222"/>
                        </svg>
                        <h3>Videos</h3> 
                    </div>
                        <div className="rounded-card">
                            <span id="1" className={active === "1" ? "active" : undefined} onClick={handleClick}>All</span>
                            <span id="2" className={active === "2" ? "active" : undefined} onClick={handleClick}>Your Communities</span>
                        </div>
                    </div>
                    <div className="card">
                        {loading ? <Loading /> :
                            videos.map(v => (
                                <Video key={v.id} link={v.video_url} title={v.video_title} 
                                description={v.video_description} creator={v.creator} community={v.community.name} id={v.id}/>
                            ))
                        }
                    </div>
            </div>
            <div className="recommended">
            </div>
        </div>
    )
}

export default UserFeed;