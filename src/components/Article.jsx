
const Article = (props) => {
    const openLink = (url) => {
        const newWindow = window.open(url, "_blank", 'noopener,noreferrer');
        if (newWindow) newWindow.opener = null;
    }

    return (
        <div onClick={() => openLink(props.link)} className="article">
            <div className="top">
                <span className="title">{props.title}</span>
                <span className="community-title">/{props.community}</span>
            </div>
            <div className="bottom">
                <span className="flex flex--justify-space-between gap-1"><strong>{props.author}</strong> 
                <strong className="text-align-end">Posted by: {props.user}</strong></span>
                <span >{props.description}</span>
            </div>
        </div>
    )

}

export default Article;