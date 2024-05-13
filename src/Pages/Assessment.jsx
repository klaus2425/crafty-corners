import { useQueryClient } from "@tanstack/react-query";
import axiosClient from "../axios-client";
import { useNavigate } from "react-router-dom";
import MembershipCheck from "../components/utils/Membership";
import '../styles/index.scss'
import { useEffect, useRef, useState } from "react";
import Loading from "../components/utils/Loading.jsx";

const Assessment = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const params = new URLSearchParams(window.location.search);
    const uid = params.get('uid')
    const storageBaseUrl = import.meta.env.VITE_API_COMMUNITIES_URL
    const [communities, setCommunities] = useState(null);
    const subtopicInputRef = useRef(null);
    const [interests, setInterests] = useState({ subtopics: [] })
    const [loading, setLoading] = useState(false);
    const getCommunities = async () => {
        const fetchedData = await axiosClient.get('subtopic/communities', {
            params: interests,
        });
        setLoading(false);
        setCommunities(fetchedData.data)
    }

    const handleSubmit = () => {
        setLoading(true);
        const subtopicInputValue = subtopicInputRef.current.value;
        const subtopicsArray = subtopicInputValue.split(',').map(subtopic => subtopic.trim());
        setInterests(prevInterests => ({
            ...prevInterests,
            subtopics: [...prevInterests.subtopics, ...subtopicsArray]
        }));
        subtopicInputRef.current.value = ''
    }

    useEffect(() => {
        getCommunities();
    }, [interests])

    const handleProceed = () => {
        axiosClient.post('/done-assessment')
            .then(() => {
                queryClient.invalidateQueries({ queryKey: ['communities'] });
                queryClient.invalidateQueries({ queryKey: ['recommended-communities'] })
                queryClient.refetchQueries({queryKey: ['user']}).then(() => navigate('/Home'));

            })
    }

    if (loading) {
        return (
            <div className={'pre-assessment-container'}>
                <Loading/>
            </div>
        )
    } else if (communities) {
        return communities.length > 0 ?
            <div className="pre-assessment-container">
                <h2>Here are some communities based on your interests...</h2>
                < div
                    className="card"
                    id="assessment-card">
                    {
                        communities &&
                        communities.map((community, index) => (
                            <div key={index} className="community-assmnt-card">
                                <img src={storageBaseUrl + community.community_photo} alt=""/>
                                <span className="community-name">/{community.name}</span>
                                <span className="community-description">{community.description}</span>
                                <span className="member-count"><strong>{community.members_count}</strong> Members</span>
                                <MembershipCheck isMember={community.is_user_member} community_id={community.id}
                                                 user_id={uid}/>
                            </div>
                        ))
                    }
                </div>
                <div className="button-container">
                    <div onClick={handleProceed} className="purple-button"><strong>Proceed to Home</strong></div>
                </div>
            </div>
            :
            <div className="pre-assessment-container">
                <div class="card"
                     style={{ display: 'flex', flexDirection: 'column', width: 'fit-content', height: 'fit-content', padding: '2rem' }}>
                    <h2 style={{ textAlign: 'center' }}>There are no communities that matches your interests
                        yet,<br/> but don't be afraid to explore
                    </h2>
                    <div className="button-container" style={{width: 'fit-content', alignSelf: 'flex-end'}}>
                        <div onClick={handleProceed} className="purple-button"><strong>Proceed to Home</strong></div>
                    </div>
                </div>


            </div>
    }


    return !communities && (
        <div className="pre-assessment-container" style={{ gap: '0.3rem' }}>
            <h1 style={{ color: '#18191a' }}>Tell us your interests</h1>
            <input ref={subtopicInputRef} type="text" placeholder={'Example: Drawing, Valorant, Netflix, Novel, ...'}/>
            <span>(<i>Separate by comma</i>)</span>
            <button onClick={handleSubmit} className="btn btn--purple">Submit</button>
        </div>
    )

}


export default Assessment;