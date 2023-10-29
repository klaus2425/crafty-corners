import { Link } from 'react-router-dom'
import '../styles/index.scss'

const UserFeed =  () => {
    return (
        <div className="container">
            <div className="sidebar">
                <Link to={123}>Home</Link>
            </div>
            <div className="feed">
                User Feed
            </div>
            <div className="recommended">
                recommended section
            </div>
        </div>
    )
}

export default UserFeed;