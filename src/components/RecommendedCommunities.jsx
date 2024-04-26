import { useNavigate } from "react-router-dom";


const RecommendedCommunities = (props) => {
    const navigate = useNavigate();
    const storageUrl = import.meta.env.VITE_API_COMMUNITIES_URL;

    return (
        <div onClick={() => navigate(`/c/${props.communityName}`, { state: { id: `${props.communityId}` } })} className="rec-community__item" >
            <h2>{props.index})</h2>
            <img src={storageUrl + props.communityIcon} />
            <div className="com-count">
                <div className="top">
                    <span className="rec-community__name">/{props.communityName}</span>
                </div>
                <span className="rec-community__member-count">{props.communityMemberCount} {props.communityMemberCount == 1 ? 'Member' : 'Members'} </span>
            </div>
        </div >
    )
}

export default RecommendedCommunities;