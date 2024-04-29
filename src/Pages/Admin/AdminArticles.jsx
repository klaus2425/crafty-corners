import { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import axiosClient from "../../axios-client";
import Swal from 'sweetalert2'
import Loading from '../../components/utils/Loading';

const AdminArticles = () => {
    const [loading, setLoading] = useState(false);
    const [articles, setArticles] = useState([]);
    const [searchKey, setSearchKey] = useState('')

    const onDeleteClick = article => {
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
                axiosClient.delete(`/articles/${article.id}`)
                    .then(() => {
                        getArticles();
                    })
                Swal.fire({
                    title: "Deleted!",
                    text: "Article has been deleted",
                    icon: "success"
                });
            }
        });


    }
    const getArticles = () => {
        setLoading(true);
        axiosClient.get('/articles')
            .then((res) => {
                setLoading(false);
                setArticles(res.data.data)
            })
    }


    useEffect(() => {
        getArticles();
    }, [])
    return (
        <div className="communities-container">
            <div className="top-section">
                <Link className="add-community-button" to={'/add-article'}><span><FontAwesomeIcon icon={faPlus} /></span> Add an Article</Link>
            </div>
            <div className="filters">
                <span><strong>Filters:</strong></span>
                <input onChange={(ev) => setSearchKey(ev.target.value)} className='student-id-search' type="text" placeholder='Search by Title' />
            </div>
            <div className='users-table'>

                {loading &&
                    <Loading />
                }

                {!loading &&
                    articles.filter(u => {
                        if (u.title.toLowerCase().includes(searchKey.toLowerCase())) {
                            return u
                        }
                        else if (searchKey === '') {
                            return u
                        }
                    }).map(u => (
                        <div key={u.id} className="community-item">

                            <div className="community-item-details" >
                                <div className="community-details-top">
                                    <span><strong>Title: <br /> </strong>{u.title} </span>
                                    <span><strong>Author:  <br /></strong>{u.author}</span>
                                    <span><strong>Uploaded by:  <br /></strong>{u.user.first_name} {u.user.middle_name} {u.user.last_name}</span>
                                    <span className='desc'><strong>Description:  <br /></strong>{u.description}</span>
                                </div>
                                <div className="buttons-community">
                                    <Link to={'/edit-article/' + u.id} className="orange-button">View Article</Link>
                                    <button className="red-button" onClick={ev => onDeleteClick(u)}>Delete Article</button>
                                </div>


                            </div>
                        </div>
                    ))


                }

            </div>
        </div>
    )
}

export default AdminArticles;