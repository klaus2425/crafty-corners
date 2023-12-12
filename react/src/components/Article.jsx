
const Article = (props) => {
    return (
        <div className="article">
            <div className="top">
                <span className="title">{props.title}</span>
                <span className="community-title">/{props.community}</span>
            </div>
            <div className="bottom">
                {props.description}
            </div>
        </div>
    )

}

export default Article;