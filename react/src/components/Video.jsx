const Video = (props) => {
    return (
        <div className="video">
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