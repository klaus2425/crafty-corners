import { useQuery } from '@tanstack/react-query';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../axios-client";
import Article from "../components/Article";
import Loading from "../components/utils/Loading";
import { useStateContext } from "../context/ContextProvider";

const UserFeed = () => {
    const { user } = useStateContext();
    const [active, setActive] = useState("1");
    const [searchKey, setSearchKey] = useState();
    const navigate = useNavigate();

    const handleClick = (ev) => {
        ev.preventDefault();
        setActive(ev.target.id);
    }

    const handleAddArticle = () => {
        navigate(`/mentor/add-article/?uid=${user.id}`)
    }

    const allArticles = useQuery({
        queryKey: ['all-articles'],
        queryFn: () => axiosClient.get(`/articles`).then(({ data }) => (data.data))
    })


    const joinedArticles = useQuery({
        queryKey: ['joined-articles'],
        queryFn: () => axiosClient.get(`joined/articles`).then(({ data }) => (data.data))
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
                            <path fillRule="evenodd" clipRule="evenodd" d="M5.58579 4.58579C5 5.17157 5 6.11438 5 8V17C5 18.8856 5 19.8284 5.58579 20.4142C6.17157 21 7.11438 21 9 21H15C16.8856 21 17.8284 21 18.4142 20.4142C19 19.8284 19 18.8856 19 17V8C19 6.11438 19 5.17157 18.4142 4.58579C17.8284 4 16.8856 4 15 4H9C7.11438 4 6.17157 4 5.58579 4.58579ZM9 8C8.44772 8 8 8.44772 8 9C8 9.55228 8.44772 10 9 10H15C15.5523 10 16 9.55228 16 9C16 8.44772 15.5523 8 15 8H9ZM9 12C8.44772 12 8 12.4477 8 13C8 13.5523 8.44772 14 9 14H15C15.5523 14 16 13.5523 16 13C16 12.4477 15.5523 12 15 12H9ZM9 16C8.44772 16 8 16.4477 8 17C8 17.5523 8.44772 18 9 18H13C13.5523 18 14 17.5523 14 17C14 16.4477 13.5523 16 13 16H9Z" fill="#222222" />                        </svg>
                        <h3>Articles</h3>
                    </div>
                    <div className="round-card">
                        <div className="tabs">
                            <div className='tab-holder'>
                                <span id="1" className={active === "1" ? "active" : undefined} onClick={handleClick}>All</span>
                                <span id="2" className={active === "2" ? "active" : undefined} onClick={handleClick}>Your Communities</span>
                            </div>
                            <input onChange={handleSearch} className="learning-search" type="text" placeholder='Search for Communities or Articles' />
                        </div>
                        {
                            user?.type === 'mentor' && //Change to mentor later
                            <button onClick={handleAddArticle} className="purple-button round">Add Article</button>

                        }
                    </div>
                </div>
                <div className="card">

                    {
                        active === '1' ?
                            !allArticles.isLoading ?
                                searchKey ?
                                    allArticles.data.filter(a => a.community.name.toLowerCase().includes(searchKey.toLowerCase()) || a.title.toLowerCase().includes(searchKey.toLowerCase())).map(a => (
                                        <Article user={a.user.first_name + ' ' + a.user.last_name} key={a.id} author={a.author} title={a.title} description={a.description} link={a.link} community={a.community.name} />
                                    ))
                                    :
                                    allArticles.data.map(a => (
                                        <Article user={a.user.first_name + ' ' + a.user.last_name} key={a.id} author={a.author} title={a.title} description={a.description} link={a.link} community={a.community.name} />
                                    ))
                                :
                                <Loading />
                            :
                            null
                    }
                    {
                        active === '2' ?
                            !joinedArticles.isLoading ?
                                searchKey ?
                                    joinedArticles.data.filter(a => a.community.name.toLowerCase().includes(searchKey.toLowerCase()) || a.title.toLowerCase().includes(searchKey.toLowerCase())).map(a => (
                                        <Article user={a.user.first_name + ' ' + a.user.last_name} key={a.id} author={a.author} title={a.title} description={a.description} link={a.link} community={a.community.name} />
                                    ))
                                    :
                                    joinedArticles.data.map(a => (
                                        <Article user={a.user.first_name + ' ' + a.user.last_name} key={a.id} author={a.author} title={a.title} description={a.description} link={a.link} community={a.community.name} />
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