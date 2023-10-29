import { Link } from 'react-router-dom';

const Users = () => {
    return (
        <div className="authenticated-container">
            <div className="sidebar">
                <div className='sidebar-upper'>
                    <Link to={'/'}>Home</Link>
                    <Link to={'/'}>Notifications</Link>
                    <Link to={'/'}>Profile</Link>
                </div>
                <div className='sidebar-lower'>
                    <Link to={'/'}>Communities</Link>
                    <Link to={'/'}>Articles</Link>
                    <Link to={'/'}>Videos</Link>
                    <Link to={'/'}>Mentors</Link>
                </div>
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

export default Users;