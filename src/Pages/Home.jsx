import Posts from '../components/Posts'
import RecommendedCommunities from '../components/RecommendedCommunities'

const UserFeed = () => {
    return (
        <div className="authenticated-container">
            <div className="feed">
                <div className='section-header'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                        <path d="M8.33337 21.266C8.33337 19.0031 8.33337 17.8716 8.79081 16.877C9.24824 15.8825 10.1073 15.1461 11.8255 13.6734L13.4921 12.2449C16.5977 9.58299 18.1504 8.25204 20 8.25204C21.8497 8.25204 23.4024 9.58299 26.508 12.2449L28.1746 13.6734C29.8928 15.1461 30.7518 15.8825 31.2093 16.877C31.6667 17.8716 31.6667 19.0031 31.6667 21.266V28.3333C31.6667 31.476 31.6667 33.0474 30.6904 34.0237C29.7141 35 28.1427 35 25 35H15C11.8573 35 10.286 35 9.30968 34.0237C8.33337 33.0474 8.33337 31.476 8.33337 28.3333V21.266Z" stroke="#677186" strokeWidth="3.33333" />
                        <path d="M24.1667 35V26.6667C24.1667 25.7462 23.4205 25 22.5 25H17.5C16.5796 25 15.8334 25.7462 15.8334 26.6667V35" stroke="#677186" strokeWidth="3.33333" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <h3>Home</h3>
                </div>
                {<Posts />}
                {<Posts />}
                {<Posts />}
                {<Posts />}
                {<Posts />}
                {<Posts />}

            </div>
            <div className="recommended">

                <div className="card">
                    <h3>Recommended Communities</h3>
                    <RecommendedCommunities communityName='Gaming' communityMemberCount='140' communityId='1' communityIcon='/gamepad-solid.svg' rank='1' />
                    <RecommendedCommunities communityName='Singing' communityMemberCount='40' communityId='2' communityIcon='/music-solid.svg' rank='2' />
                    <RecommendedCommunities communityName='Painting' communityMemberCount='340' communityId='3' communityIcon='/paintbrush-solid.svg' rank='3' />
                    <RecommendedCommunities communityName='Knitting' communityMemberCount='60' communityId='4' communityIcon='/mitten-solid.svg' rank='4' />
                    <RecommendedCommunities communityName='Dancing' communityMemberCount='180' communityId='5' communityIcon='/dance.png' rank='5' />

                </div>


            </div>
        </div>
    )
}

export default UserFeed;