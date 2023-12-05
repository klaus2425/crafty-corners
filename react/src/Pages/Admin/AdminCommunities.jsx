import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import axiosClient from "../../axios-client";


const AdminCommunities = () => {
    const [loading, setLoading] = useState(false);
    const [communities, setCommunities] = useState([]);
    useEffect(() => {
        getCommunities();
    }, [])

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
                <tbody>
                <tr>
                <td >
                    Loading...
                </td>
                </tr>
                </tbody>
            }

            {!loading &&
            <table>
            <thead>
            <tr>
                <th>Community Name</th>
                <th>Community Description</th>
                <th>Image</th>

            </tr>
            </thead>
                <tbody>
                {communities.map(u => (
                <tr key={u.id}>
                    asdasd
                </tr>
                ))}
                </tbody>
            </table>
            }
            
            </div>
        </div>
    )
}

export default AdminCommunities;