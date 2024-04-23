import { useNavigate } from "react-router-dom";
import TimeAgo from 'javascript-time-ago';
import axiosClient from "../axios-client";
import { useQueryClient } from "@tanstack/react-query";

const UserNotifications = (props) => {
    const queryClient = useQueryClient
    const navigate = useNavigate();
    const handlePostClick = () => {
        navigate(`/p/${props.post_id}?uid=${props.uid}`)
        axiosClient.post(`/notifications/mark-as-read/${props.id}`).then(
            queryClient.refetchQueries('notifications')
        )
    }
    const timeAgo = new TimeAgo('en-US')
    if (props.type == "App\\Notifications\\PostLiked") {
        return (
            <div className="notification-card">
                {
                    <div onClick={handlePostClick} className="notification">
                        <div className="left">
                            <img src={props.notifierImage} />
                            <span><span id="bold">{props.notifier}</span> liked your post in /{props.community}</span>
                        </div>
                        {
                            !props.read ?
                                <div className="flex flex--column gap-1 h-100 align-end">
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="7" cy="7" r="7" fill="#FF4646" />
                                    </svg>
                                    {timeAgo.format(new Date(props.created_at.replace(" ", "T")), 'twitter-now')}
                                </div>
                                :
                                <div className="flex flex--column gap-1 h-100 justify-end">

                                    {timeAgo.format(new Date(props.created_at.replace(" ", "T")), 'twitter-now')}
                                </div>
                        }
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
                        <div className="left">
                            <img src={props.notifierImage} />
                            <span><span id="bold">{props.notifier}</span> commented on your post in /{props.community}</span>
                        </div>
                        {
                            !props.read ?
                                <div className="flex flex--column gap-1 h-100 align-end">
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="7" cy="7" r="7" fill="#FF4646" />
                                    </svg>
                                    {timeAgo.format(new Date(props.created_at.replace(" ", "T")), 'twitter-now')}
                                </div>
                                :
                                <div className="flex flex--column gap-1 h-100 justify-end">

                                    {timeAgo.format(new Date(props.created_at.replace(" ", "T")), 'twitter-now')}
                                </div>
                        }
                    </div>
                }
            </div>
        )
    }
    // if (props.type === 'post_share') {
    //     return (
    //         <div className="notification-card">
    //             {
    //                 <div onClick={handlePostClick} className="notification">
    //                     <img src={props.notifierImage} />
    //                     <span><span id="bold">{props.notifier}</span> shared your post in /{props.community}</span>
    //                     {/* <ReactTimeAgo style={{marginLeft: 'auto'}} date={props.created_at} locale="en-US"/> */}

    //                 </div>
    //             }
    //         </div>
    //     )
    // }

}

export default UserNotifications;