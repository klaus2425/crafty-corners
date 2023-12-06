import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import axiosClient from "../../axios-client";


const AdminCommunities = () => {
    const storageBaseUrl = import.meta.env.VITE_API_COMMUNITIES_URL;
    const [loading, setLoading] = useState(false);
    const [communities, setCommunities] = useState([]);
    const [image, setImage] = useState();

    useEffect(() => {
        getCommunities();
    }, [])

    const onDeleteClick = community => {
        if (!window.confirm("Are you sure you want to delete this community?")) {
          return
        }
        axiosClient.delete(`/communities/${community.id}`)
          .then(() => {
            getCommunities();
        })
    }

    const getCommunities = () => {
        setLoading(true);
        axiosClient.get('/communities').then(({ data }) => {
            setLoading(false);
            setCommunities(data.data);
        })
    }

    return (
        <div className="communities-container">
            <div className="top-section">
                <Link className="add-community-button" to={'/add-communities'}><span><FontAwesomeIcon icon={faPlus} /></span> Add a Community</Link>
            </div>
            <div className='users-table'>
            
            {loading &&
                <div className="loading-admin">Loading...</div>

            }

            {!loading &&
                
                 communities.map(u => (
                    
                    <div key={u.id} className="community-item">
                        <div><img src={storageBaseUrl+u.community_photo} alt="" /></div>
                        <div className="community-item-details" >
                            <div className="community-details-top">
                                <span><strong>Community Name: <br/> </strong>{u.name}</span>
                                <span><strong>Description: <br/></strong>{u.description}</span>
                                <span><strong>Members: <br/></strong></span>
                            </div>
                            <div className="buttons-community">
                                <Link to={'/edit-community/' + u.id} className="orange-button">Edit Community</Link>
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

export default AdminCommunities;