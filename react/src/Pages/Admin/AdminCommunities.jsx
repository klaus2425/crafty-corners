import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'


const AdminCommunities = () => {
    const [loading, setLoading] = useState(false);
    const [communities, setCommunities] = useState([]);

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
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Birthday</th>
                <th>Address</th>
                <th>Create Date</th>
                <th>Actions</th>
            </tr>
            </thead>
                <tbody>
                {communities.map(u => (
                <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>{`${u.first_name} ${u.middle_name} ${u.last_name}`}</td>
                    <td>{u.email}</td>
                    <td>{u.birthday}</td>
                    <td>{`${u.street_address}, ${u.municipality}, ${u.province}`}</td>
                    <td>{u.created_at}</td>
                    <td className='table-actions'>
                    <Link className="btn-edit" to={'/users/' + u.id}>Edit</Link>
                    &nbsp;
                    <button className="btn-delete" onClick={ev => onDeleteClick(u)}>Delete</button>
                    </td>
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