import { PropsWithChildren } from 'react';
import { Link, useOutletContext } from 'react-router-dom'
import UserNotifications from '../components/UserNotifications';


const UserFeed = () => {
    return (
        <div className="authenticated-container">
            <div className="feed">
                <div className='section-header'>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.50248 6.97519C6.78492 4.15083 9.16156 2 12 2C14.8384 2 17.2151 4.15083 17.4975 6.97519L17.7841 9.84133C17.8016 10.0156 17.8103 10.1028 17.8207 10.1885C17.9649 11.3717 18.3717 12.5077 19.0113 13.5135C19.0576 13.5865 19.1062 13.6593 19.2034 13.8051L20.0645 15.0968C20.8508 16.2763 21.244 16.866 21.0715 17.3412C21.0388 17.4311 20.9935 17.5158 20.9368 17.5928C20.6371 18 19.9283 18 18.5108 18H5.48923C4.07168 18 3.36291 18 3.06318 17.5928C3.00651 17.5158 2.96117 17.4311 2.92854 17.3412C2.75601 16.866 3.14916 16.2763 3.93548 15.0968L4.79661 13.8051C4.89378 13.6593 4.94236 13.5865 4.98873 13.5135C5.62832 12.5077 6.03508 11.3717 6.17927 10.1885C6.18972 10.1028 6.19844 10.0156 6.21587 9.84133L6.50248 6.97519Z" fill="#222222" />
                        <path d="M10.0681 20.6294C10.1821 20.7357 10.4332 20.8297 10.7825 20.8967C11.1318 20.9637 11.5597 21 12 21C12.4403 21 12.8682 20.9637 13.2175 20.8967C13.5668 20.8297 13.8179 20.7357 13.9319 20.6294" stroke="#222222" stroke-width="2" stroke-linecap="round" />
                    </svg>
                    <h3>Notifications</h3>
                </div>
                <UserNotifications notificationType='like' notifier='Kafka' notifierImage='/kafka.jpg' community='Gaming' />
                <UserNotifications notificationType='like' notifier='Kafka' notifierImage='/kafka.jpg' community='Gaming' />
                <UserNotifications notificationType='like' notifier='Kafka' notifierImage='/kafka.jpg' community='Gaming' />

            </div>
            <div className="recommended">
            </div>
        </div>
    )
}

export default UserFeed;