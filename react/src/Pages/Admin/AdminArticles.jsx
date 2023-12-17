import { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2'
const AdminArticles = () => {
    const [loading, setLoading] = useState(false);
    const [articles, setArticles] = useState([]);

    return (
        <div className="communities-container">
        <div className="top-section">
            <Link className="add-community-button" to={'/add-article'}><span><FontAwesomeIcon icon={faPlus} /></span> Add an Article</Link>
        </div>
        <div className='users-table'>
        
        {loading &&
            <div className="loading-admin">Loading...</div>

        }

        {!loading &&
            
             articles.map(u => (
                
                <div key={u.id} className="community-item">
                    <div className="community-item-details" >
                        <div className="community-details-top">
                            <span><strong>Community Name: <br/> </strong></span>
                            <span><strong>Description: <br/></strong></span>
                            <span><strong>Members: <br/></strong></span>
                        </div>
                        <div className="buttons-community">
                            <Link to={'/edit-community/' + u.id} className="orange-button">View Community</Link>
                            <button className="red-button" onClick={ev => onDeleteClick(u)}>Delete Community</button>
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