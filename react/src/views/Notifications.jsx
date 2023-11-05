import { PropsWithChildren } from 'react';
import { Link, useOutletContext } from 'react-router-dom'


const UserFeed =  () => {
    const [name] = useOutletContext();
    return (
        <div className="authenticated-container">
            <div className="feed">
            Notications
            </div>
            <div className="recommended">
            recommended section
            </div>
        </div>
    )
}

export default UserFeed;