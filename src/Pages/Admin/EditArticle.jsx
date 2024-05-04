import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';
import axiosClient from '../../axios-client';
import { useParams } from 'react-router-dom';
import Loading from '../../components/utils/Loading';

const EditArticle = () => {
    let { id } = useParams();
    const [communities, setCommunities] = useState([]);
    const [article, setArticle] = useState({});
    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState(0);


    const getCommunities = () => {
        axiosClient.get('/communities').then(({ data }) => {
            setCommunities(data);
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
            setLoading(false);
        })

    }
    const handleChange = (ev) => {
        setArticle({ ...article, community: { id: ev.target.value } });

    }
    const handleTextChange = (ev) => {
        setArticle({ ...article, description: ev.target.value });
        setCount(ev.target.value.length);
    }

    useEffect(() => {
        getCommunities();
        getArticle();
    }, [])



    const onSubmit = (ev) => {
        ev.preventDefault();
        const formData = new FormData();
        formData.append('_method', "PUT")
        formData.append('author', article.author);
        formData.append('title', article.title);
        formData.append('link', article.link);
        formData.append('description', article.description);
        formData.append('community_id', article.community.id);


        axiosClient.post(`/articles/${id}`, formData)
            .then((res) => {
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
            <h2>Edit Article</h2>
            {loading ? <Loading /> :
                <form onSubmit={onSubmit}>
                    <div className="article-form">
                        <div className="article-input">
                            <label><strong>Article Title:</strong></label>
                            <input value={article.title} onChange={ev => setArticle({ ...article, title: ev.target.value })} type="text" />
                        </div>
                        <div className="article-input">
                            <label><strong>Article Author:</strong></label>
                            <input value={article.author} onChange={ev => setArticle({ ...article, author: ev.target.value })} type="text" />
                        </div>
                        <div className="article-input">
                            <label><strong>Description:</strong></label>
                            <div className="textarea-container">
                                <textarea maxLength={255} value={article.description} onChange={ev => handleTextChange(ev)} />
                                <span style={count >= 255 ? { color: '#F44336' } : { color: '#677186' }} className='text-counter'>{count}/255</span>
                            </div>

                        </div>
                        <div className="article-input">
                            <label><strong>Link:</strong></label>
                            <input value={article.link} onChange={ev => setArticle({ ...article, link: ev.target.value })} />
                        </div>
                        <div className="article-input">
                            <label><strong>Community:</strong></label>
                            <select name="communities" value={article.community?.id} onChange={handleChange}>
                                <option >Select a community</option>
                                {communities?.map((community) => (
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