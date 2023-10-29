import '../styles/index.scss'
import { Link } from 'react-router-dom'

const Landing =  () => {
    return (
        <div className="container">
            <div className="sidebar">
            <Link to={'/'}>Home</Link>
            <Link to={'/'}>About</Link>

                
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

export default Landing;