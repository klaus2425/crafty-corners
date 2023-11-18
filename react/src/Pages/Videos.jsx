import { PropsWithChildren } from 'react';
import { Link, useOutletContext } from 'react-router-dom'


const UserFeed =  () => {
    return (
        <div className="authenticated-container">
            <div className="feed">
            Videos
            </div>
            <div className="recommended">
            recommended section
            </div>
        </div>
    )
}

export default UserFeed;