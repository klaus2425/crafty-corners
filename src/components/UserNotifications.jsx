const UserNotifications = (props) => {
    return (
        <div className="notification-card">
            {
                props.notificationType === 'like' &&
                <div className="notification">
                    <img src={props.notifierImage} />
                    <span><span id="bold">{props.notifier}</span> liked your post in /{props.community}</span>
                </div>
            }
        </div>
    )
}

export default UserNotifications;