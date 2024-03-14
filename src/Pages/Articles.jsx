import { useEffect, useState } from "react";
import Article from "../components/Article";
import axiosClient from "../axios-client";
import Loading from "../components/utils/Loading";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";

const UserFeed = () => {
    const {user} = useStateContext();
    const [active, setActive] = useState("1");
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleClick = (ev) => {
        ev.preventDefault();
        setActive(ev.target.id);
    }

    const handleAddArticle = () => {
        navigate(`/mentor/add-article/?uid=${user.id}`)
    }

    const getArticles = () => {
        setLoading(true);
        axiosClient.get('/articles')
            .then(res => {
                setArticles(res.data.data)
                setLoading(false);
                console.log(res);
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
        getArticles();
    }, [])

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
                        <div>
                            <span id="1" className={active === "1" ? "active" : undefined} onClick={handleClick}>All</span>
                            <span id="2" className={active === "2" ? "active" : undefined} onClick={handleClick}>Your Communities</span>
                        </div>
                        <button onClick={handleAddArticle} className="purple-button round">Add Article</button>
                    </div>
                </div>
                <div className="card">
                    {loading ? <Loading /> :
                        articles.map(a => (
                            <Article author={a.author} title={a.title} description={a.description} link={a.link} community={a.community.name} />
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