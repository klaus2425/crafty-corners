import { Link } from 'react-router-dom'

const UserFeed =  () => {
    return (
        <div className="authenticated-container">
            <aside className="sidebar">
                <div className='sidebar-upper'>
                    <div className="sidebar-link">                
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                        <path d="M8.33337 21.266C8.33337 19.0031 8.33337 17.8716 8.79081 16.877C9.24824 15.8825 10.1073 15.1461 11.8255 13.6734L13.4921 12.2449C16.5977 9.58299 18.1504 8.25204 20 8.25204C21.8497 8.25204 23.4024 9.58299 26.508 12.2449L28.1746 13.6734C29.8928 15.1461 30.7518 15.8825 31.2093 16.877C31.6667 17.8716 31.6667 19.0031 31.6667 21.266V28.3333C31.6667 31.476 31.6667 33.0474 30.6904 34.0237C29.7141 35 28.1427 35 25 35H15C11.8573 35 10.286 35 9.30968 34.0237C8.33337 33.0474 8.33337 31.476 8.33337 28.3333V21.266Z" stroke="#677186" stroke-width="3.33333"/>
                        <path d="M24.1667 35V26.6667C24.1667 25.7462 23.4205 25 22.5 25H17.5C16.5796 25 15.8334 25.7462 15.8334 26.6667V35" stroke="#677186" stroke-width="3.33333" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <Link to={'/'}>Home</Link>
                    </div>
                    <div className="sidebar-link">                
                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
                            <path d="M9.67176 11.9541C10.1433 7.71048 13.7302 4.5 18 4.5V4.5C22.2698 4.5 25.8567 7.71048 26.3282 11.9541L26.7059 15.3535C26.7108 15.3968 26.7132 15.4185 26.7156 15.4399C26.909 17.1254 27.4577 18.7508 28.3253 20.2087C28.3364 20.2273 28.3476 20.246 28.37 20.2834L29.2371 21.7284C30.0239 23.0398 30.4173 23.6955 30.3324 24.2338C30.2759 24.5919 30.0915 24.9175 29.8135 25.1502C29.3956 25.5 28.631 25.5 27.1017 25.5H8.89835C7.36903 25.5 6.60436 25.5 6.1865 25.1502C5.90846 24.9175 5.72413 24.5919 5.66762 24.2338C5.58269 23.6955 5.9761 23.0398 6.76293 21.7284L7.62998 20.2834C7.65242 20.246 7.66363 20.2273 7.67466 20.2087C8.54232 18.7508 9.09096 17.1254 9.28438 15.4399C9.28684 15.4185 9.28925 15.3968 9.29406 15.3535L9.67176 11.9541Z" stroke="#677186" stroke-width="3"/>
                            <path d="M12 25.5C12 26.2879 12.1552 27.0681 12.4567 27.7961C12.7583 28.5241 13.2002 29.1855 13.7574 29.7426C14.3145 30.2998 14.9759 30.7417 15.7039 31.0433C16.4319 31.3448 17.2121 31.5 18 31.5C18.7879 31.5 19.5681 31.3448 20.2961 31.0433C21.0241 30.7417 21.6855 30.2998 22.2426 29.7426C22.7998 29.1855 23.2417 28.5241 23.5433 27.7961C23.8448 27.0681 24 26.2879 24 25.5" stroke="#677186" stroke-width="3" stroke-linecap="round"/>
                        </svg>
                        <Link to={'/'}>Notifications</Link>
                    </div>
                    <div className="sidebar-link">                
                        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none">
                            <path d="M28.7692 29.8187C28.1045 27.9581 26.6398 26.3141 24.6023 25.1415C22.5647 23.9689 20.0683 23.3333 17.5 23.3333C14.9318 23.3333 12.4353 23.9689 10.3978 25.1415C8.36031 26.3141 6.89562 27.9581 6.23091 29.8187" stroke="#677186" stroke-width="2.91667" stroke-linecap="round"/>
                            <circle cx="17.5" cy="11.6667" r="5.83333" stroke="#677186" stroke-width="2.91667" stroke-linecap="round"/>
                        </svg>  
                        <Link to={'/'}>Profile</Link>
                    </div>
                </div>
                <div className='sidebar-lower'>
                    <div className="sidebar-link">                
                         <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 45 45" fill="none">
                            <circle cx="22.5" cy="15" r="5.625" stroke="#677186" stroke-width="3.75" stroke-linecap="round"/>
                            <path d="M28.6274 15C29.1247 14.1387 29.9438 13.5102 30.9044 13.2528C31.8651 12.9954 32.8887 13.1301 33.75 13.6274C34.6113 14.1247 35.2398 14.9438 35.4972 15.9044C35.7546 16.8651 35.6199 17.8887 35.1226 18.75C34.6253 19.6113 33.8062 20.2398 32.8456 20.4972C31.8849 20.7546 30.8613 20.6199 30 20.1226C29.1387 19.6253 28.5102 18.8062 28.2528 17.8456C27.9954 16.8849 28.1301 15.8613 28.6274 15L28.6274 15Z" stroke="#677186" stroke-width="3.75"/>
                            <path d="M9.8774 15C10.3747 14.1387 11.1938 13.5102 12.1544 13.2528C13.1151 12.9954 14.1387 13.1301 15 13.6274C15.8613 14.1247 16.4898 14.9438 16.7472 15.9044C17.0046 16.8651 16.8699 17.8887 16.3726 18.75C15.8753 19.6113 15.0562 20.2398 14.0956 20.4972C13.1349 20.7546 12.1113 20.6199 11.25 20.1226C10.3887 19.6253 9.76019 18.8062 9.50278 17.8456C9.24537 16.8849 9.38012 15.8613 9.8774 15L9.8774 15Z" stroke="#677186" stroke-width="3.75"/>
                            <path d="M31.6528 33.75L29.8147 34.1202L30.1178 35.625H31.6528V33.75ZM38.8502 31.6953L37.083 32.3221V32.3221L38.8502 31.6953ZM27.7138 27.5823L26.5797 26.0891L24.4112 27.7362L26.7236 29.1744L27.7138 27.5823ZM37.2508 31.875H31.6528V35.625H37.2508V31.875ZM37.083 32.3221C37.0698 32.2848 37.0577 32.2144 37.0733 32.1288C37.088 32.0477 37.1215 31.9862 37.1532 31.9468C37.2136 31.8716 37.2635 31.875 37.2508 31.875V35.625C39.3996 35.625 41.5148 33.5989 40.6173 31.0685L37.083 32.3221ZM31.8748 28.125C34.9528 28.125 36.3798 30.3395 37.083 32.3221L40.6173 31.0685C39.7453 28.6102 37.4033 24.375 31.8748 24.375V28.125ZM28.8479 29.0754C29.5688 28.5278 30.5285 28.125 31.8748 28.125V24.375C29.6962 24.375 27.9425 25.054 26.5797 26.0891L28.8479 29.0754ZM26.7236 29.1744C28.672 30.3862 29.4881 32.4983 29.8147 34.1202L33.4909 33.3798C33.0822 31.3507 31.9449 28.0057 28.7041 25.9901L26.7236 29.1744Z" fill="#677186"/>
                            <path d="M17.2861 27.5822L18.2763 29.1744L20.5889 27.7362L18.4202 26.089L17.2861 27.5822ZM6.14985 31.6953L7.91698 32.3221L6.14985 31.6953ZM13.347 33.75V35.625H14.882L15.185 34.1202L13.347 33.75ZM13.1253 28.125C14.4715 28.125 15.4312 28.5278 16.152 29.0753L18.4202 26.089C17.0574 25.054 15.3037 24.375 13.1253 24.375V28.125ZM7.91698 32.3221C8.6202 30.3395 10.0473 28.125 13.1253 28.125V24.375C7.5968 24.375 5.2547 28.6101 4.38272 31.0685L7.91698 32.3221ZM7.7492 31.875C7.73649 31.875 7.78642 31.8716 7.84684 31.9468C7.87852 31.9862 7.91199 32.0477 7.92676 32.1288C7.94235 32.2144 7.93019 32.2848 7.91698 32.3221L4.38272 31.0685C3.48517 33.5989 5.60042 35.625 7.7492 35.625V31.875ZM13.347 31.875H7.7492V35.625H13.347V31.875ZM15.185 34.1202C15.5117 32.4982 16.3278 30.3861 18.2763 29.1744L16.2959 25.99C13.0549 28.0056 11.9175 31.3506 11.5089 33.3798L15.185 34.1202Z" fill="#677186"/>
                            <path d="M22.5 26.25C29.1966 26.25 31.1098 31.0335 31.6564 33.7667C31.8595 34.7821 31.0355 35.625 30 35.625H15C13.9645 35.625 13.1405 34.7821 13.3436 33.7667C13.8902 31.0335 15.8034 26.25 22.5 26.25Z" stroke="#677186" stroke-width="3.75" stroke-linecap="round"/>
                        </svg>
                        <Link to={'/'}>Communities</Link>
                    </div>
                    <div className="sidebar-link">                
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                            <path d="M23.3334 27.2222V35H25L35 25V23.3333H27.2223C25.389 23.3333 24.4724 23.3333 23.9029 23.9028C23.3334 24.4724 23.3334 25.389 23.3334 27.2222Z" fill="#7E869E" fill-opacity="0.25"/>
                            <path d="M23.6193 35H11.6667C8.52397 35 6.95262 35 5.97631 34.0237C5 33.0474 5 31.476 5 28.3333V11.6667C5 8.52397 5 6.95262 5.97631 5.97631C6.95262 5 8.52397 5 11.6667 5H28.3333C31.476 5 33.0474 5 34.0237 5.97631C35 6.95262 35 8.52397 35 11.6667V23.6193C35 24.3005 35 24.6412 34.8731 24.9475C34.7463 25.2537 34.5054 25.4946 34.0237 25.9763L25.9763 34.0237C25.4946 34.5054 25.2537 34.7463 24.9474 34.8731C24.6412 35 24.3005 35 23.6193 35Z" stroke="#677186" stroke-width="2"/>
                            <path d="M23.3334 35V27.2222C23.3334 25.389 23.3334 24.4724 23.9029 23.9028C24.4724 23.3333 25.389 23.3333 27.2223 23.3333H35" stroke="#677186" stroke-width="2"/>
                        </svg> 
                        <Link to={'/'}>Articles</Link>
                    </div>
                    <div className="sidebar-link">                
                        <svg xmlns="http://www.w3.org/2000/svg" width="39" height="39" viewBox="0 0 39 39" fill="none">
                            <path d="M26.3431 18.0466L15.8221 12.786C14.5255 12.1378 13 13.0806 13 14.5302V24.4698C13 25.9194 14.5255 26.8622 15.8221 26.214L26.3431 20.9534C27.5408 20.3546 27.5408 18.6454 26.3431 18.0466Z" stroke="#677186" stroke-width="3.25" stroke-linecap="round" stroke-linejoin="round"/>
                            <circle cx="19.5" cy="19.5" r="14.625" stroke="#677186" stroke-width="3.25"/>
                        </svg> 
                        <Link to={'/'}>Videos</Link>
                    </div>
                    <div className="sidebar-link">                
                        <svg xmlns="http://www.w3.org/2000/svg" width="55" height="55" viewBox="0 0 55 55" fill="none">
                            <path d="M42.3958 21.7708V19.9375C42.3958 17.3706 42.3958 16.0871 41.8963 15.1067C41.4569 14.2443 40.7557 13.5431 39.8933 13.1037C38.9129 12.6042 37.6294 12.6042 35.0625 12.6042H17.6458C15.0789 12.6042 13.7955 12.6042 12.815 13.1037C11.9526 13.5431 11.2515 14.2443 10.8121 15.1067C10.3125 16.0871 10.3125 17.3706 10.3125 19.9375V28.1875C10.3125 30.7544 10.3125 32.0379 10.8121 33.0183C11.2515 33.8807 11.9526 34.5819 12.815 35.0213C13.7955 35.5208 15.0789 35.5208 17.6458 35.5208H30.9375" stroke="#677186" stroke-width="2.29167" stroke-linecap="round"/>
                            <path d="M17.1875 28.6458H26.3542" stroke="#677186" stroke-width="2.29167" stroke-linecap="round"/>
                            <path d="M17.1875 19.4792H33.2292" stroke="#677186" stroke-width="2.29167" stroke-linecap="round"/>
                            <circle cx="40.1042" cy="30.9375" r="4.58333" stroke="#677186" stroke-width="2.29167"/>
                            <path d="M44.6875 42.3958C44.6875 42.3958 43.5417 40.1042 40.1042 40.1042C36.6667 40.1042 35.5209 42.3958 35.5209 42.3958" stroke="#677186" stroke-width="2.29167" stroke-linecap="round"/>
                        </svg> 
                        <Link to={'/'}>Mentors</Link>
                    </div>
                    
                    
                    
                </div>
            </aside>
            <div className="feed">
                User Feed
            </div>
            <div className="recommended">
                recommended section
            </div>
        </div>
    )
}

export default UserFeed;