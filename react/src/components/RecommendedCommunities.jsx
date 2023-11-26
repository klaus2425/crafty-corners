import { faGamepad } from '@fortawesome/free-solid-svg-icons'


const RecommendedCommunities = (props) => {
    return (
        <div className="rec-community-item">
            <span id="rank">{props.rank}</span>
            <div className="com-count">
                <div className="top">
                    <h4>/{props.communityName}</h4>
                    <img src={props.communityIcon} alt="" />
                </div>
                <span>{props.communityMemberCount} Members</span>
            </div>
            
            
        </div>
    )
}

export default RecommendedCommunities;