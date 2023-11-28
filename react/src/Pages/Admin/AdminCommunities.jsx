import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'


const AdminCommunities = () => {
    return (
        <div className="communities-container">
            <div className="top-section">
                <Link className="add-community-button"><span><FontAwesomeIcon icon={faPlus} /></span> Add a Community</Link>
            </div>
        </div>
    )
}

export default AdminCommunities;