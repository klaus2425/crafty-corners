import { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const AdminVideos = () => {
    const [loading, setLoading] = useState(false);
    const [videos, setVideos] = useState([]);

    return (
        <div className="communities-container">
        <div className="top-section">
            <Link className="add-community-button" to={'/add-video'}><span><FontAwesomeIcon icon={faPlus} /></span> Add a Video</Link>
        </div>
        <div className='users-table'>
        
        {loading &&
            <div className="loading-admin">Loading...</div>

        }

        {!loading &&
            
             videos.map(u => (
                
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

export default AdminVideos;