const UserNotifications = (props) => {
    return (
        <div className="card">
            {
                props.type=== 'like' && 
                <div className="notification"> </div>
            }
        </div>
    )
}

export default UserNotifications;