

const RecommendedCommunities = (props) => {

    const storageUrl = import.meta.env.VITE_API_COMMUNITIES_URL;

    return (
        <div className="rec-community__item">
            <img src={storageUrl + props.communityIcon} />
            <div className="com-count">
                <div className="top">
                    <span className="rec-community__name">/{props.communityName}</span>
                </div>
                <span className="rec-community__member-count">{props.communityMemberCount} {props.communityMemberCount == 1 ? 'Member' : 'Members'} </span>
            </div>

        </div>
    )
}

export default RecommendedCommunities;