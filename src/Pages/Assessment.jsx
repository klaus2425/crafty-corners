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
                queryClient.refetchQueries({ queryKey: ['user'] }).then(() => navigate('/Home'));

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
                     style={{
                         display: 'flex',
                         flexDirection: 'column',
                         width: 'fit-content',
                         height: 'fit-content',
                         padding: '2rem'
                     }}>
                    <h2 style={{ textAlign: 'center' }}>There are no communities that matches your interests
                        yet,<br/> but don't be afraid to explore
                    </h2>
                    <div className="button-container" style={{ width: 'fit-content', alignSelf: 'flex-end' }}>
                        <div onClick={handleProceed} className="purple-button"><strong>Proceed to Home</strong></div>
                    </div>
                </div>


            </div>
    }


    return !communities && (
        <div className="pre-assessment-container" style={{ gap: '0.3rem' }}>
            <svg width="130" height="130" viewBox="0 0 130 130" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M101.687 14.846C92.2706 8.69557 81.2939 5.1541 69.9457 4.60495C58.5975 4.0558 47.3102 6.5199 37.3058 11.7305C27.3014 16.9411 18.961 24.6996 13.1875 34.1662C7.4141 43.6327 4.42759 54.4466 4.55133 65.4372C4.67507 76.4277 7.90434 87.1761 13.8895 96.5188C19.8747 105.862 28.3878 113.443 38.5072 118.441C48.6266 123.44 59.9666 125.665 71.2998 124.877C82.6329 124.089 93.5273 120.317 102.803 113.97L90.8615 97.6392C84.665 101.879 77.3876 104.399 69.817 104.925C62.2465 105.452 54.6713 103.965 47.9116 100.626C41.1519 97.2869 35.4651 92.2228 31.467 85.9819C27.4689 79.741 25.3117 72.561 25.2291 65.2193C25.1464 57.8777 27.1414 50.654 30.9981 44.3303C34.8547 38.0066 40.4261 32.8239 47.1091 29.3433C53.792 25.8626 61.3319 24.2166 68.9125 24.5834C76.4931 24.9502 83.8255 27.3159 90.116 31.4244L101.687 14.846Z"
                    fill="#A076F9"/>
                <path
                    d="M101.687 14.846C92.2706 8.69557 81.2939 5.1541 69.9457 4.60495C58.5975 4.0558 47.3102 6.5199 37.3058 11.7305C27.3014 16.9411 18.961 24.6996 13.1875 34.1662C7.4141 43.6327 4.42759 54.4466 4.55133 65.4372C4.67507 76.4277 7.90434 87.1761 13.8895 96.5188C19.8747 105.862 28.3878 113.443 38.5072 118.441C48.6266 123.44 59.9666 125.665 71.2998 124.877C82.6329 124.089 93.5273 120.317 102.803 113.97L90.8615 97.6392C84.665 101.879 77.3876 104.399 69.817 104.925C62.2465 105.452 54.6713 103.965 47.9116 100.626C41.1519 97.2869 35.4651 92.2228 31.467 85.9819C27.4689 79.741 25.3117 72.561 25.2291 65.2193C25.1464 57.8777 27.1414 50.654 30.9981 44.3303C34.8547 38.0066 40.4261 32.8239 47.1091 29.3433C53.792 25.8626 61.3319 24.2166 68.9125 24.5834C76.4931 24.9502 83.8255 27.3159 90.116 31.4244L101.687 14.846Z"
                    fill="#A076F9"/>
                <path
                    d="M101.687 14.846C92.2706 8.69557 81.2939 5.1541 69.9457 4.60495C58.5975 4.0558 47.3102 6.5199 37.3058 11.7305C27.3014 16.9411 18.961 24.6996 13.1875 34.1662C7.4141 43.6327 4.42759 54.4466 4.55133 65.4372C4.67507 76.4277 7.90434 87.1761 13.8895 96.5188C19.8747 105.862 28.3878 113.443 38.5072 118.441C48.6266 123.44 59.9666 125.665 71.2998 124.877C82.6329 124.089 93.5273 120.317 102.803 113.97L90.8615 97.6392C84.665 101.879 77.3876 104.399 69.817 104.925C62.2465 105.452 54.6713 103.965 47.9116 100.626C41.1519 97.2869 35.4651 92.2228 31.467 85.9819C27.4689 79.741 25.3117 72.561 25.2291 65.2193C25.1464 57.8777 27.1414 50.654 30.9981 44.3303C34.8547 38.0066 40.4261 32.8239 47.1091 29.3433C53.792 25.8626 61.3319 24.2166 68.9125 24.5834C76.4931 24.9502 83.8255 27.3159 90.116 31.4244L101.687 14.846Z"
                    stroke="#222222" stroke-width="8.10398"/>
                <path
                    d="M47.4045 90.4349C52.2347 93.7368 57.9065 95.6977 63.806 96.1053C69.7055 96.5129 75.6078 95.3517 80.8741 92.7474C86.1403 90.1432 90.5698 86.195 93.683 81.3305C96.7962 76.4659 98.4745 70.8702 98.5362 65.1492C98.5979 59.4283 97.0407 53.7999 94.0331 48.8736C91.0254 43.9473 86.6821 39.9106 81.4731 37.2006C76.2642 34.4906 70.3882 33.2106 64.4812 33.499C58.5742 33.7875 52.8613 35.6335 47.961 38.8372L53.9884 47.4642C57.2618 45.3241 61.0781 44.091 65.0239 43.8983C68.9698 43.7056 72.895 44.5607 76.3745 46.3709C79.8541 48.1812 82.7555 50.8777 84.7646 54.1685C86.7736 57.4593 87.8139 61.219 87.7727 65.0406C87.7315 68.8622 86.6104 72.6001 84.5307 75.8497C82.4511 79.0992 79.4922 81.7366 75.9744 83.4762C72.4565 85.2159 68.5137 85.9915 64.5729 85.7192C60.632 85.447 56.8432 84.1371 53.6167 81.9314L47.4045 90.4349Z"
                    fill="#A076F9"/>
                <path
                    d="M47.4045 90.4349C52.2347 93.7368 57.9065 95.6977 63.806 96.1053C69.7055 96.5129 75.6078 95.3517 80.8741 92.7474C86.1403 90.1432 90.5698 86.195 93.683 81.3305C96.7962 76.4659 98.4745 70.8702 98.5362 65.1492C98.5979 59.4283 97.0407 53.7999 94.0331 48.8736C91.0254 43.9473 86.6821 39.9106 81.4731 37.2006C76.2642 34.4906 70.3882 33.2106 64.4812 33.499C58.5742 33.7875 52.8613 35.6335 47.961 38.8372L53.9884 47.4642C57.2618 45.3241 61.0781 44.091 65.0239 43.8983C68.9698 43.7056 72.895 44.5607 76.3745 46.3709C79.8541 48.1812 82.7555 50.8777 84.7646 54.1685C86.7736 57.4593 87.8139 61.219 87.7727 65.0406C87.7315 68.8622 86.6104 72.6001 84.5307 75.8497C82.4511 79.0992 79.4922 81.7366 75.9744 83.4762C72.4565 85.2159 68.5137 85.9915 64.5729 85.7192C60.632 85.447 56.8432 84.1371 53.6167 81.9314L47.4045 90.4349Z"
                    fill="#A076F9"/>
                <path
                    d="M47.4045 90.4349C52.2347 93.7368 57.9065 95.6977 63.806 96.1053C69.7055 96.5129 75.6078 95.3517 80.8741 92.7474C86.1403 90.1432 90.5698 86.195 93.683 81.3305C96.7962 76.4659 98.4745 70.8702 98.5362 65.1492C98.5979 59.4283 97.0407 53.7999 94.0331 48.8736C91.0254 43.9473 86.6821 39.9106 81.4731 37.2006C76.2642 34.4906 70.3882 33.2106 64.4812 33.499C58.5742 33.7875 52.8613 35.6335 47.961 38.8372L53.9884 47.4642C57.2618 45.3241 61.0781 44.091 65.0239 43.8983C68.9698 43.7056 72.895 44.5607 76.3745 46.3709C79.8541 48.1812 82.7555 50.8777 84.7646 54.1685C86.7736 57.4593 87.8139 61.219 87.7727 65.0406C87.7315 68.8622 86.6104 72.6001 84.5307 75.8497C82.4511 79.0992 79.4922 81.7366 75.9744 83.4762C72.4565 85.2159 68.5137 85.9915 64.5729 85.7192C60.632 85.447 56.8432 84.1371 53.6167 81.9314L47.4045 90.4349Z"
                    stroke="#222222" stroke-width="4.2184"/>
                <g clip-path="url(#clip0_723_455)">
                    <path
                        d="M111.154 23.7502C111.759 23.2571 112.661 23.3322 113.17 23.9181L114.092 24.9775C114.602 25.5635 114.524 26.4352 113.918 26.9283L108.442 31.3854L106.252 33.1683L100.776 37.6254C100.171 38.1185 99.2695 38.0435 98.7598 37.4575L97.8383 36.3981C97.3285 35.8122 97.4061 34.9404 98.0119 34.4473L100.202 32.6645L99.2806 31.6051C98.7709 31.0191 98.8485 30.1474 99.4543 29.6543L101.645 27.8714C101.135 27.2855 101.212 26.4137 101.818 25.9207C102.424 25.4276 103.325 25.5026 103.835 26.0886L106.025 24.3057C106.631 23.8127 107.532 23.8877 108.042 24.4737L108.963 25.5331L111.154 23.7502ZM124.055 38.5814L121.865 40.3642L122.786 41.4236C123.296 42.0096 123.218 42.8813 122.613 43.3744L120.422 45.1572C120.932 45.7432 120.855 46.615 120.249 47.108C119.643 47.6011 118.742 47.5261 118.232 46.9401L116.042 48.723C115.436 49.216 114.535 49.141 114.025 48.555L113.104 47.4956L110.913 49.2785C110.308 49.7716 109.406 49.6965 108.897 49.1106L107.975 48.0512C107.465 47.4652 107.543 46.5935 108.149 46.1004L113.624 41.6433L115.815 39.8604L121.29 35.4033C121.896 34.9102 122.797 34.9852 123.307 35.5712L124.229 36.6306C124.738 37.2165 124.661 38.0883 124.055 38.5814ZM114.893 38.801L112.703 40.5839L107.174 34.2277L109.364 32.4448L114.893 38.801Z"
                        fill="#222222"/>
                </g>
                <g clip-path="url(#clip1_723_455)">
                    <path
                        d="M124.464 72.709C124.229 73.0404 123.84 73.2453 123.424 73.2596L120.456 73.361L109.575 73.7329C107.753 73.7952 106.215 72.1312 106.138 70.0182C106.061 67.9051 107.474 66.1402 109.295 66.078C111.117 66.0157 112.655 67.6797 112.733 69.7927C112.749 70.2393 112.699 70.6721 112.59 71.0751L118.591 70.8699L115.052 60.7715L106.471 61.0648C104.649 61.1271 103.111 59.4632 103.034 57.3501C102.957 55.237 104.37 53.4722 106.192 53.4099C108.013 53.3476 109.551 55.0116 109.629 57.1247C109.645 57.5712 109.595 58.004 109.486 58.407L115.94 58.1863L118.908 58.0849C119.489 58.065 120.018 58.4182 120.206 58.9507L124.629 71.5737C124.763 71.9563 124.704 72.3775 124.464 72.709Z"
                        fill="#222222"/>
                </g>
                <g clip-path="url(#clip2_723_455)">
                    <path
                        d="M122.345 91.8594C123.671 90.1741 123.334 87.7655 121.592 86.4821L111.072 78.7332C109.33 77.4498 106.84 77.7759 105.513 79.4613L98.3039 88.6195L97.5029 89.6371C97.0598 90.2 97.1719 91.001 97.7538 91.4296C98.3356 91.8582 99.1637 91.7497 99.6068 91.1869L101.711 92.7367C101.268 93.2995 101.38 94.1005 101.962 94.5291L112.481 102.278C113.063 102.707 113.891 102.598 114.334 102.035L115.135 101.018L122.345 91.8594ZM109.721 82.5608L103.313 90.7015L101.209 89.1517L107.617 81.0111C108.06 80.4482 108.888 80.3398 109.47 80.7684C110.052 81.197 110.164 81.998 109.721 82.5608ZM116.81 89.3901C117.099 89.6031 117.155 90.0065 116.935 90.2863L112.129 96.3918C111.909 96.6716 111.492 96.7262 111.202 96.5131C110.913 96.3 110.857 95.8967 111.077 95.6169L115.883 89.5114C116.104 89.2316 116.52 89.177 116.81 89.3901ZM114.831 88.7365L110.025 94.842C109.805 95.1218 109.388 95.1765 109.098 94.9634C108.809 94.7503 108.753 94.347 108.973 94.0671L113.779 87.9616C114 87.6818 114.417 87.6272 114.706 87.8403C114.995 88.0534 115.052 88.4567 114.831 88.7365Z"
                        fill="#222222"/>
                </g>
                <g clip-path="url(#clip3_723_455)">
                    <path
                        d="M51.8996 64.4287C51.8996 60.5973 53.473 56.9229 56.2737 54.2137C59.0744 51.5045 62.8729 49.9825 66.8337 49.9825C70.7945 49.9825 74.593 51.5045 77.3937 54.2137C80.1944 56.9229 81.7678 60.5973 81.7678 64.4287C81.7678 68.2601 80.1944 71.9345 77.3937 74.6437C74.593 77.3529 70.7945 78.8749 66.8337 78.8749C62.8729 78.8749 59.0744 77.3529 56.2737 74.6437C53.473 71.9345 51.8996 68.2601 51.8996 64.4287ZM62.8843 58.2834C62.441 58.5204 62.1668 58.9775 62.1668 59.4628V69.3946C62.1668 69.8855 62.441 70.337 62.8843 70.574C63.3277 70.811 63.8644 70.8054 64.3019 70.5458L72.7023 65.5799C73.1165 65.3316 73.3732 64.8971 73.3732 64.4231C73.3732 63.949 73.1165 63.5145 72.7023 63.2662L64.3019 58.3003C63.8702 58.0464 63.3277 58.0351 62.8843 58.2721V58.2834Z"
                        fill="#222222"/>
                </g>
                <g clip-path="url(#clip4_723_455)">
                    <path
                        d="M46.5267 43.8048C46.5489 43.8153 46.571 43.8258 46.5932 43.8363C47.4876 44.2712 47.6986 45.3514 47.2589 46.2213L46.0795 48.5544C45.7602 49.1859 46.0309 49.9488 46.6837 50.2577C46.7675 50.2973 46.8536 50.3262 46.9397 50.3492C47.2163 50.418 47.5107 50.4274 47.8064 50.4403C48.2199 50.4557 48.6297 50.4724 48.9869 50.6414C49.7703 51.012 50.2221 51.8635 49.871 52.6365C49.8313 52.7211 49.7916 52.8057 49.7483 52.8915C48.046 56.2589 43.842 57.6544 40.3584 56.0066C36.8749 54.3587 35.4322 50.2921 37.1357 46.9223C38.8392 43.5526 43.0431 42.157 46.5267 43.8048ZM42.6889 53.3291C42.4798 53.2302 42.2386 53.2156 42.0185 53.2887C41.7984 53.3618 41.6172 53.5165 41.515 53.7187C41.4127 53.921 41.3977 54.1543 41.4733 54.3672C41.5488 54.5802 41.7088 54.7554 41.9178 54.8543C42.1269 54.9532 42.3681 54.9677 42.5882 54.8946C42.8084 54.8215 42.9895 54.6668 43.0917 54.4646C43.194 54.2623 43.209 54.0291 43.1334 53.8161C43.0579 53.6032 42.898 53.428 42.6889 53.3291ZM40.3238 52.2103C40.426 52.008 40.441 51.7748 40.3655 51.5618C40.2899 51.3489 40.13 51.1737 39.9209 51.0748C39.7119 50.9759 39.4707 50.9614 39.2506 51.0344C39.0304 51.1075 38.8493 51.2622 38.7471 51.4645C38.6448 51.6667 38.6298 51.9 38.7054 52.1129C38.7809 52.3259 38.9408 52.5011 39.1499 52.6C39.359 52.6989 39.6001 52.7134 39.8203 52.6403C40.0404 52.5672 40.2215 52.4126 40.3238 52.2103ZM39.8863 47.2785C39.6772 47.1796 39.4361 47.1651 39.2159 47.2382C38.9958 47.3112 38.8146 47.4659 38.7124 47.6682C38.6102 47.8704 38.5952 48.1037 38.6707 48.3166C38.7463 48.5296 38.9062 48.7048 39.1152 48.8037C39.3243 48.9026 39.5655 48.9171 39.7856 48.844C40.0058 48.771 40.1869 48.6163 40.2891 48.414C40.3914 48.2118 40.4064 47.9785 40.3308 47.7655C40.2553 47.5526 40.0954 47.3774 39.8863 47.2785ZM43.4079 46.1094C43.5102 45.9072 43.5252 45.6739 43.4496 45.461C43.3741 45.248 43.2142 45.0728 43.0051 44.9739C42.796 44.875 42.5548 44.8605 42.3347 44.9336C42.1146 45.0066 41.9334 45.1613 41.8312 45.3636C41.7289 45.5658 41.7139 45.7991 41.7895 46.0121C41.865 46.225 42.0249 46.4002 42.234 46.4991C42.4431 46.598 42.6843 46.6125 42.9044 46.5395C43.1246 46.4664 43.3057 46.3117 43.4079 46.1094Z"
                        fill="#222222"/>
                </g>
                <g clip-path="url(#clip5_723_455)">
                    <path
                        d="M33.2638 68.1578C33.2965 70.7592 35.5049 72.8441 38.1942 72.8124C40.8834 72.7808 43.0387 70.6445 43.006 68.0431L42.927 61.7605C42.8943 59.1591 40.6859 57.0742 37.9966 57.1059C35.3074 57.1375 33.1521 59.2737 33.1848 61.8752L33.2638 68.1578ZM35.8085 60.6661C35.8052 60.4058 35.909 60.1548 36.097 59.9685C36.285 59.7821 36.5418 59.6757 36.8109 59.6725C37.0801 59.6693 37.3395 59.7697 37.5321 59.9516C37.7248 60.1334 37.8348 60.3819 37.8381 60.6422C37.8414 60.9026 37.7376 61.1535 37.5496 61.3399C37.3616 61.5262 37.1048 61.6327 36.8356 61.6358C36.5665 61.639 36.3071 61.5386 36.1144 61.3567C35.9218 61.1749 35.8118 60.9265 35.8085 60.6661ZM39.2909 63.1778C39.0218 63.181 38.7624 63.0806 38.5697 62.8987C38.3771 62.7169 38.2671 62.4685 38.2638 62.2081C38.2605 61.9477 38.3643 61.6968 38.5523 61.5105C38.7403 61.3241 38.9971 61.2177 39.2662 61.2145C39.5354 61.2113 39.7948 61.3117 39.9874 61.4936C40.1801 61.6754 40.2901 61.9239 40.2934 62.1842C40.2967 62.4446 40.1929 62.6955 40.0049 62.8819C39.8169 63.0682 39.5601 63.1747 39.2909 63.1778ZM36.7216 68.7062C36.3841 68.7101 36.1094 68.4507 36.1053 68.1243C36.1012 67.7979 36.3693 67.5321 36.7068 67.5282L37.5186 67.5186L37.5087 66.7333C37.5046 66.4069 37.7728 66.1411 38.1102 66.1371C38.4476 66.1332 38.7224 66.3926 38.7265 66.719L38.7364 67.5043L39.5482 67.4947C39.8857 67.4908 40.1604 67.7502 40.1645 68.0766C40.1686 68.403 39.9005 68.6688 39.563 68.6727L38.7512 68.6823L38.7611 69.4676C38.7652 69.794 38.497 70.0598 38.1596 70.0638C37.8222 70.0677 37.5474 69.8083 37.5433 69.4819L37.5334 68.6966L36.7216 68.7062Z"
                        fill="#222222"/>
                </g>
                <g clip-path="url(#clip6_723_455)">
                    <path
                        d="M38.3422 75.2237L40.4795 77.3828C41.0768 76.7129 41.4426 75.8446 41.4639 74.8921C41.4721 74.5275 41.4287 74.1743 41.3413 73.8374C40.2156 74.0471 39.1888 74.5343 38.3422 75.2237ZM37.7502 75.7722C37.0014 76.5605 36.4538 77.5317 36.1885 78.6105C36.5326 78.7095 36.8956 78.7668 37.2725 78.7747C38.2571 78.7953 39.1697 78.4795 39.89 77.9337L37.7502 75.7722ZM42.7214 73.7274C42.5342 73.7235 42.3469 73.727 42.1619 73.738C42.251 74.1146 42.2935 74.5075 42.2845 74.9093C42.2582 76.0825 41.7957 77.1449 41.0515 77.9606L42.5917 79.5165L47.0294 75.4058C45.8925 74.3944 44.3855 73.7623 42.7214 73.7274ZM37.2547 79.5684C36.8393 79.5597 36.4353 79.5016 36.0502 79.3992C36.0308 79.5775 36.0191 79.7584 36.015 79.9394C35.979 81.5492 36.5665 83.033 37.5619 84.1755L41.9997 80.0649L40.4594 78.509C39.5847 79.1929 38.4675 79.5938 37.2547 79.5684ZM49.108 80.7549C49.1274 80.5766 49.1392 80.3957 49.1432 80.2146C49.1793 78.6049 48.5917 77.1211 47.5963 75.9786L43.1586 80.0892L44.6989 81.6451C45.571 80.9611 46.6908 80.5603 47.9036 80.5857C48.319 80.5944 48.723 80.6525 49.108 80.7549ZM48.9698 81.5436C48.6257 81.4445 48.2627 81.3873 47.8858 81.3794C46.9012 81.3588 45.9886 81.6746 45.2683 82.2204L47.4081 84.3819C48.1568 83.5961 48.707 82.625 48.9698 81.5436ZM44.6763 82.7688C44.0814 83.4412 43.7157 84.3095 43.6943 85.2619C43.6862 85.6266 43.7296 85.9798 43.8169 86.3167C44.9427 86.107 45.9694 85.6198 46.816 84.9303L44.6788 82.7713L44.6763 82.7688ZM44.1068 82.1935L42.5666 80.6376L38.1289 84.7482C39.2632 85.7597 40.7702 86.3918 42.4369 86.4267C42.6241 86.4306 42.8114 86.4271 42.9964 86.4161C42.9073 86.0395 42.8648 85.6466 42.8738 85.2447C42.9001 84.0715 43.3626 83.0092 44.1068 82.1935Z"
                        fill="#222222"/>
                </g>
                <defs>
                    <clipPath id="clip0_723_455">
                        <rect width="28.0819" height="22.5934" fill="white"
                              transform="matrix(0.656316 0.754486 -0.775552 0.631284 111.569 18.1489)"/>
                    </clipPath>
                    <clipPath id="clip1_723_455">
                        <rect width="20.4268" height="21.1149" fill="white"
                              transform="matrix(0.0365047 0.999334 -0.999416 0.0341614 123.997 52.8013)"/>
                    </clipPath>
                    <clipPath id="clip2_723_455">
                        <rect width="18.1307" height="20.9046" fill="white"
                              transform="matrix(-0.618548 0.785747 -0.805142 -0.593082 124.748 88.8067)"/>
                    </clipPath>
                    <clipPath id="clip3_723_455">
                        <rect width="29.8682" height="28.8925" fill="white" transform="translate(51.8996 49.9825)"/>
                    </clipPath>
                    <clipPath id="clip4_723_455">
                        <rect width="13.6722" height="13.9538" fill="white"
                              transform="matrix(0.451153 -0.892447 0.903965 0.427606 34.0516 53.0232)"/>
                    </clipPath>
                    <clipPath id="clip5_723_455">
                        <rect width="15.7078" height="12.9905" fill="white"
                              transform="matrix(-0.0125756 -0.999921 0.999931 -0.0117676 31.6994 72.8889)"/>
                    </clipPath>
                    <clipPath id="clip6_723_455">
                        <rect width="13.1311" height="12.7025" fill="white"
                              transform="matrix(0.99978 0.0209577 -0.0223964 0.999749 36.1573 73.5898)"/>
                    </clipPath>
                </defs>
            </svg>

            <h1 style={{ color: '#18191a' }}>Tell us your interests</h1>
            <input ref={subtopicInputRef} type="text" placeholder={'Example: Drawing, Valorant, Netflix, Novel, ...'}/>
            <span>(<i>Separate by comma</i>)</span>
            <button onClick={handleSubmit} className="btn btn--purple">Submit</button>
        </div>
    )

}


export default Assessment;