import Swal from 'sweetalert2';
import { useState, useEffect } from 'react';
import axiosClient from '../../axios-client';
import { useStateContext } from '../../context/ContextProvider';
import { useNavigate, useParams } from 'react-router-dom';

const EditArticle = () => {
    let {id} = useParams();
    const [communities, setCommunities] = useState([]);
    const [article, setArticle] = useState({});
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

    const getArticle = () => {
        setLoading(true);
        axiosClient.get(`/articles/${id}`).then(({ data }) => {
            setArticle(data.data);
            console.log(data.data.link);
            setLoading(false);
        })

    }
    const handleChange = (ev) => {
        setSelected(ev.target.value);
    }


    useEffect(() => {
        getCommunities();
        getArticle();
    }, [])

    

    const onSubmit = (ev) => {
        ev.preventDefault();
        const formData = new FormData();
        formData.append('_method', "PUT")
        for (const key in article) {
            formData.append(key, article[key]);
        }


        axiosClient.post(`/articles/${id}`, formData)
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
            <h2>Edit Article</h2>
            {loading ? <div className="loading-admin">Loading...</div> : 
            <form onSubmit={onSubmit}>
                <div className="article-form">
                    <div className="article-input">
                        <label><strong>Article Title:</strong></label>
                        <input value={article.title} onChange={ev => setArticle({...article, title: ev.target.value})} type="text" />
                    </div>
                    <div className="article-input">
                        <label><strong>Article Author:</strong></label>
                        <input value={article.author} onChange={ev => setArticle({...article, author: ev.target.value})} type="text" />
                    </div>
                    <div className="article-input">
                        <label><strong>Description:</strong></label>
                        <input  value={article.description} onChange={ev => setArticle({...article, description: ev.target.value})} type="textarea" />
                    </div>
                    <div  className="article-input">
                        <label><strong>Link:</strong></label>
                        <input  value={article.link} onChange={ev => setArticle({...article, link: ev.target.value})} type="textarea" />
                    </div>
                    <div className="article-input">
                        <label><strong>Community:</strong></label>
                        <select name="communities" value={article.community?.id} onChange={handleChange}>
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

export default EditArticle;