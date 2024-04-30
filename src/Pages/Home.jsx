
import HomePosts from '../components/HomePosts';
import RecommendedCard from '../components/RecommendedCard';

const UserFeed = () => {

    return (
        <div className="authenticated-container" id='home'>
            <div id="feed" className="feed">
                <div className='section-header'>
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M5.27446 10.1262C5 10.7229 5 11.4018 5 12.7595V16.9999C5 18.8856 5 19.8284 5.58579 20.4142C6.11733 20.9457 6.94285 20.9949 8.5 20.9995V16C8.5 14.8954 9.39543 14 10.5 14H13.5C14.6046 14 15.5 14.8954 15.5 16V20.9995C17.0572 20.9949 17.8827 20.9457 18.4142 20.4142C19 19.8284 19 18.8856 19 16.9999V12.7595C19 11.4018 19 10.7229 18.7255 10.1262C18.4511 9.52943 17.9356 9.08763 16.9047 8.20401L15.9047 7.34687C14.0414 5.74974 13.1098 4.95117 12 4.95117C10.8902 4.95117 9.95857 5.74974 8.09525 7.34687L7.09525 8.20401C6.06437 9.08763 5.54892 9.52943 5.27446 10.1262ZM13.5 20.9999V16H10.5V20.9999H13.5Z" fill="#222222" />
                    </svg>
                    <h3>Home</h3>
                </div>
                <HomePosts />
            </div>
            <div className="recommended">
                <div className="card" id='recommended-card'>
                    <h3>Recommended Communities</h3>
                    <RecommendedCard />
                </div>
            </div>
        </div>
    )
}

export default UserFeed;