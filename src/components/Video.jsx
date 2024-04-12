import { useNavigate } from 'react-router-dom'
import ReactPlayer from 'react-player';



const Video = (props) => {
    const navigate = useNavigate();

    const openLink = (url) => {
        // const newWindow = window.open(url, "_blank", 'noopener,noreferrer');
        // if (newWindow) newWindow.opener = null;
        navigate(`/v/${props.id}`)
    }

    return (

        <div onClick={() => openLink(props.link)} className="video">
            <div className="left">
                <ReactPlayer url={props.link} controls width={100} height={50} light={true} />
            </div>
            <div className="right">
                <div className="top">
                    <span className="title">{props.title}</span>
                    <span className="community-title">/{props.community}</span>
                </div>
                <div className="bottom">
                    <span className='flex flex--justify-space-between'><strong>{props.creator}</strong><strong>Posted by: {props.user}</strong></span>
                    <span>{props.description}</span>
                </div>
            </div>

        </div>
    )
}

export default Video;