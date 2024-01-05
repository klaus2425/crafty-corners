import {useNavigate} from 'react-router-dom'


const Video = (props) => {
    const navigate = useNavigate();

    const openLink = (url) => {
        // const newWindow = window.open(url, "_blank", 'noopener,noreferrer');
        // if (newWindow) newWindow.opener = null;
        navigate(`/v/${props.id}`)
    }

    return (
        
        <div onClick={() => openLink(props.link)} className="video">
            <div className="top">
                <span className="title">{props.title}</span>
                <span className="community-title">/{props.community}</span>
            </div>
            <div className="bottom">
                <span><strong>{props.creator}</strong></span>
                <span>{props.description}</span>
            </div>
        </div>
    )
}

export default Video;