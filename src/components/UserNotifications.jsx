import { useNavigate } from "react-router-dom";

const UserNotifications = (props) => {

    const navigate = useNavigate();
    const handlePostClick = () => {
        navigate(`/p/${props.post_id}?uid=${props.uid}`)
    }
    if (props.type == "App\\Notifications\\PostLiked") {
        return (
            <div className="notification-card">
                {
                    <div onClick={handlePostClick} className="notification">
                        <img src={props.notifierImage} />
                        <span><span id="bold">{props.notifier}</span> liked your post in /{props.community}</span>
                    </div>
                }
            </div>
        )
    }
    if (props.type === "App\\Notifications\\PostComments") {
        return (
            <div className="notification-card">
                {
                    <div onClick={handlePostClick} className="notification">
                        <img src={props.notifierImage} />
                        <span><span id="bold">{props.notifier}</span> commented on your post in /{props.community}</span>
                    </div>
                }
            </div>
        )
    }
    if (props.type === 'post_share') {
        return (
            <div className="notification-card">
                {
                    <div onClick={handlePostClick} className="notification">
                        <img src={props.notifierImage} />
                        <span><span id="bold">{props.notifier}</span> shared your post in /{props.community}</span>
                    </div>
                }
            </div>
        )
    }

}

export default UserNotifications;