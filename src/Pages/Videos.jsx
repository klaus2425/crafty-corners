import { useQuery } from '@tanstack/react-query';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../axios-client";
import Video from "../components/Video";
import Loading from "../components/utils/Loading";
import { useStateContext } from "../context/ContextProvider";

const UserFeed = () => {

    const { user } = useStateContext();
    const [active, setActive] = useState("1");
    const [searchKey, setSearchKey] = useState();
    const navigate = useNavigate();

    const handleAddVideo = () => {
        navigate(`/mentor/add-video/?uid=${user.id}`)
    };

    const handleClick = (ev) => {
        ev.preventDefault();
        setActive(ev.target.id);
    }

    const joinedVideos = useQuery({
        queryKey: ['joined-videos'],
        queryFn: () => axiosClient.get(`joined/videos`).then(({ data }) => (data.data))
    })


    const allVideos = useQuery({
        queryKey: ['all-videos'],
        queryFn: () => axiosClient.get(`/videos`).then(({ data }) => (data.data))
    })

    const handleSearch = (ev) => {
        setSearchKey(ev.target.value)
    }
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
                    <div className="round-card">
                        <div className="tabs">
                            <div className="tab-holder">
                                <span id="1" className={active === "1" ? "active" : undefined} onClick={handleClick}>All</span>
                                <span id="2" className={active === "2" ? "active" : undefined} onClick={handleClick}>Your Communities</span>
                            </div>
                            <input onChange={handleSearch} className="learning-search" type="text" placeholder='Search for Communities or Articles' />
                        </div>
                        {
                            user?.type === 'mentor' && //Change to mentor later
                            <button onClick={handleAddVideo} className="purple-button round">Add Video</button>
                        }
                    </div>
                </div>
                <div className="card">
                    {active === '1' ?
                        !allVideos.isLoading ?
                            searchKey ?
                                allVideos.data.filter(v => v.community.name.toLowerCase().includes(searchKey.toLowerCase()) || v.video_title.toLowerCase().includes(searchKey.toLowerCase())).map(v => (
                                    <Video user={v.user.first_name + ' ' + v.user.last_name} key={v.id} link={v.video_url} title={v.video_title}
                                        description={v.video_description} creator={v.creator} community={v.community.name} id={v.id} />
                                ))
                                :
                                allVideos.data.map(v => (
                                    <Video user={v.user.first_name + ' ' + v.user.last_name} key={v.id} link={v.video_url} title={v.video_title}
                                        description={v.video_description} creator={v.creator} community={v.community.name} id={v.id} />
                                ))
                            :
                            <Loading />
                        :
                        null
                    }
                    {active === '2' ?
                        !joinedVideos.isLoading ?
                            searchKey ?
                                joinedVideos.data.filter(a => a.community.name.toLowerCase().includes(searchKey.toLowerCase()) || a.video_title.toLowerCase().includes(searchKey.toLowerCase())).map(v => (
                                    <Video user={v.user.first_name + ' ' + v.user.last_name} key={v.id} link={v.video_url} title={v.video_title}
                                        description={v.video_description} creator={v.creator} community={v.community.name} id={v.id} />
                                ))
                                :
                                joinedVideos.data.map(v => (
                                    <Video user={v.user.first_name + ' ' + v.user.last_name} key={v.id} link={v.video_url} title={v.video_title}
                                        description={v.video_description} creator={v.creator} community={v.community.name} id={v.id} />
                                ))
                            :
                            <Loading />
                        :
                        null
                    }
                </div>
            </div>
            <div className="recommended">
            </div>
        </div>
    )
}

export default UserFeed;