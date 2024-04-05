import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useStateContext } from '../context/ContextProvider';
import { useEffect, useState } from 'react';
import echo from './Echo';
import Pusher from 'pusher-js';
import { useQueryClient } from '@tanstack/react-query';
import axiosClient from '../axios-client';

export const Sidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useStateContext();
    const [messageNotify, setMessageNotify] = useState(false);
    const [hasNotification, setHasNotification] = useState(false);
    const queryClient = useQueryClient();

    useEffect(() => {
        console.log(user);
        Pusher.logToConsole = true;
        echo.private(`user-${user.id}`)
            .listen('MessageSent', (data) => {
                if (!(location.pathname == '/messages') && !(location.pathname == `/conversation/${data.message.conversation_id}`)) {
                    setMessageNotify(true);
                }
            })
            .listen('PostInteraction', () => {
                queryClient.refetchQueries('notifications');
                if (user.unread_notifications_count > 0 && window.location.pathname != '/notifications') {
                    setHasNotification(true);
                }
            })
        if (user.unread_notifications_count > 0 && window.location.pathname != '/notifications') {
            setHasNotification(true);
        } else setHasNotification(false);
        if (user.unread_messages_count > 0 && window.location.pathname != '/messages') {
            setMessageNotify(true);
        } else setMessageNotify(false);

    }, [user])


    return (
        <aside className="sidebar">
            <div className='sidebar-upper'>
                <div className="sidebar-link" onClick={() => navigate('/home')}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M5.27446 10.1262C5 10.7229 5 11.4018 5 12.7595V16.9999C5 18.8856 5 19.8284 5.58579 20.4142C6.11733 20.9457 6.94285 20.9949 8.5 20.9995V16C8.5 14.8954 9.39543 14 10.5 14H13.5C14.6046 14 15.5 14.8954 15.5 16V20.9995C17.0572 20.9949 17.8827 20.9457 18.4142 20.4142C19 19.8284 19 18.8856 19 16.9999V12.7595C19 11.4018 19 10.7229 18.7255 10.1262C18.4511 9.52943 17.9356 9.08763 16.9047 8.20401L15.9047 7.34687C14.0414 5.74974 13.1098 4.95117 12 4.95117C10.8902 4.95117 9.95857 5.74974 8.09525 7.34687L7.09525 8.20401C6.06437 9.08763 5.54892 9.52943 5.27446 10.1262ZM13.5 20.9999V16H10.5V20.9999H13.5Z" fill="#222222" />
                    </svg>
                    <Link to={'/Home'}>Home</Link>
                </div>
                <div className="sidebar-link" onClick={() => {
                    setHasNotification(false);
                    axiosClient.post(`/notifications/mark-all-as-read`)
                    navigate('/notifications')
                }}>
                    {
                        hasNotification ?
                            <svg id='notification-icon' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M13.7942 3.29494C13.2296 3.10345 12.6258 3 12 3C9.15347 3 6.76217 5.14032 6.44782 7.96942L6.19602 10.2356L6.18957 10.2933C6.06062 11.417 5.69486 12.5005 5.11643 13.4725L5.08664 13.5222L4.5086 14.4856C3.98405 15.3599 3.72177 15.797 3.77839 16.1559C3.81607 16.3946 3.93896 16.6117 4.12432 16.7668C4.40289 17 4.91267 17 5.93221 17H18.0678C19.0873 17 19.5971 17 19.8756 16.7668C20.061 16.6117 20.1839 16.3946 20.2216 16.1559C20.2782 15.797 20.0159 15.3599 19.4914 14.4856L18.9133 13.5222L18.8835 13.4725C18.4273 12.7059 18.1034 11.8698 17.9236 10.9994C15.1974 10.9586 13 8.73592 13 6C13 5.00331 13.2916 4.07473 13.7942 3.29494ZM16.2741 4.98883C16.0999 5.28551 16 5.63109 16 6C16 6.94979 16.662 7.74494 17.5498 7.94914C17.4204 6.82135 16.9608 5.80382 16.2741 4.98883Z" fill="#222222" />
                                <path d="M9 17C9 17.394 9.0776 17.7841 9.22836 18.1481C9.37913 18.512 9.6001 18.8427 9.87868 19.1213C10.1573 19.3999 10.488 19.6209 10.8519 19.7716C11.2159 19.9224 11.606 20 12 20C12.394 20 12.7841 19.9224 13.1481 19.7716C13.512 19.6209 13.8427 19.3999 14.1213 19.1213C14.3999 18.8427 14.6209 18.512 14.7716 18.1481C14.9224 17.7841 15 17.394 15 17L12 17H9Z" fill="#222222" />
                                <circle cx="18" cy="6" r="2.5" fill="#FF4444" stroke="#FF4444" />
                            </svg>
                            :
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M6.50248 6.97519C6.78492 4.15083 9.16156 2 12 2C14.8384 2 17.2151 4.15083 17.4975 6.97519L17.7841 9.84133C17.8016 10.0156 17.8103 10.1028 17.8207 10.1885C17.9649 11.3717 18.3717 12.5077 19.0113 13.5135C19.0576 13.5865 19.1062 13.6593 19.2034 13.8051L20.0645 15.0968C20.8508 16.2763 21.244 16.866 21.0715 17.3412C21.0388 17.4311 20.9935 17.5158 20.9368 17.5928C20.6371 18 19.9283 18 18.5108 18H5.48923C4.07168 18 3.36291 18 3.06318 17.5928C3.00651 17.5158 2.96117 17.4311 2.92854 17.3412C2.75601 16.866 3.14916 16.2763 3.93548 15.0968L4.79661 13.8051C4.89378 13.6593 4.94236 13.5865 4.98873 13.5135C5.62832 12.5077 6.03508 11.3717 6.17927 10.1885C6.18972 10.1028 6.19844 10.0156 6.21587 9.84133L6.50248 6.97519Z" fill="#222222" />
                                <path d="M10.0681 20.6294C10.1821 20.7357 10.4332 20.8297 10.7825 20.8967C11.1318 20.9637 11.5597 21 12 21C12.4403 21 12.8682 20.9637 13.2175 20.8967C13.5668 20.8297 13.8179 20.7357 13.9319 20.6294" stroke="#222222" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                    }
                    <Link to={'/Notifications'}>Notifications</Link>
                </div>
                <div className="sidebar-link" onClick={() => navigate(`/profile?uid=${user.id}`)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M19.6515 19.4054C20.2043 19.2902 20.5336 18.7117 20.2589 18.2183C19.6533 17.1307 18.6993 16.1749 17.4788 15.4465C15.907 14.5085 13.9812 14 12 14C10.0188 14 8.09292 14.5085 6.52112 15.4465C5.30069 16.1749 4.34666 17.1307 3.74108 18.2183C3.46638 18.7117 3.79562 19.2902 4.34843 19.4054C9.39524 20.4572 14.6047 20.4572 19.6515 19.4054Z" fill="#222222" />
                        <circle cx="12" cy="8" r="5" fill="#222222" />
                    </svg>
                    <Link to={'/Profile'}>Profile</Link>
                </div>

                <div className="sidebar-link" onClick={() => {
                    setMessageNotify(false);
                    navigate(`/messages?uid=${user.id}`)
                }}>

                    {
                        messageNotify ?
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21H16.5C17.8978 21 18.5967 21 19.1481 20.7716C19.8831 20.4672 20.4672 19.8831 20.7716 19.1481C21 18.5967 21 17.8978 21 16.5V12C21 7.02944 16.9706 3 12 3ZM8 11C8 10.4477 8.44772 10 9 10H15C15.5523 10 16 10.4477 16 11C16 11.5523 15.5523 12 15 12H9C8.44772 12 8 11.5523 8 11ZM11 15C11 14.4477 11.4477 14 12 14H15C15.5523 14 16 14.4477 16 15C16 15.5523 15.5523 16 15 16H12C11.4477 16 11 15.5523 11 15Z" fill="#222222" />
                                <circle id='notification-circle' cx="5" cy="6" r="4" fill="#FF4646" />
                            </svg>
                            :
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path fillRule="evenodd" clipRule="evenodd" d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21H16.5C17.8978 21 18.5967 21 19.1481 20.7716C19.8831 20.4672 20.4672 19.8831 20.7716 19.1481C21 18.5967 21 17.8978 21 16.5V12C21 7.02944 16.9706 3 12 3ZM8 11C8 10.4477 8.44772 10 9 10H15C15.5523 10 16 10.4477 16 11C16 11.5523 15.5523 12 15 12H9C8.44772 12 8 11.5523 8 11ZM11 15C11 14.4477 11.4477 14 12 14H15C15.5523 14 16 14.4477 16 15C16 15.5523 15.5523 16 15 16H12C11.4477 16 11 15.5523 11 15Z" fill="#222222" />
                            </svg>
                    }

                    <Link to={'/Messages'}> Messages</Link>
                </div>
                <div className="sidebar-link" onClick={() => navigate(`/schedule`)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21ZM13 6.5C13 5.94772 12.5523 5.5 12 5.5C11.4477 5.5 11 5.94772 11 6.5V11.75C11 12.4404 11.5596 13 12.25 13H15.5C16.0523 13 16.5 12.5523 16.5 12C16.5 11.4477 16.0523 11 15.5 11H13V6.5Z" fill="#222222" />
                    </svg>
                    <Link to={'schedule'}>Schedule</Link>
                </div>
            </div>
            <div className='sidebar-lower'>

                <div className="sidebar-link" onClick={() => navigate(`/communities?uid=${user.id}`)} >

                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="9" r="4" fill="#33363F" />
                        <circle cx="17" cy="9" r="3" fill="#33363F" />
                        <circle cx="7" cy="9" r="3" fill="#33363F" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M17.5685 18H19.895C20.4867 18 20.9403 17.4901 20.7966 16.9162C20.4284 15.4458 19.448 13 17 13C16.114 13 15.4201 13.3205 14.8781 13.7991C16.3858 14.7773 17.1654 16.4902 17.5685 18Z" fill="#33363F" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M9.12197 13.7991C8.57989 13.3205 7.88609 13 7 13C4.55208 13 3.57166 15.4458 3.20343 16.9162C3.05971 17.4901 3.51335 18 4.10498 18H6.43155C6.83464 16.4902 7.61422 14.7773 9.12197 13.7991Z" fill="#33363F" />
                        <path d="M12 14C15.7087 14 16.6665 17.301 16.9139 19.0061C16.9932 19.5526 16.5523 20 16 20H8C7.44772 20 7.00684 19.5526 7.08614 19.0061C7.33351 17.301 8.29134 14 12 14Z" fill="#33363F" />
                    </svg>
                    <Link to={'/Communities'}>
                        Communities</Link>
                </div>
                <div className="sidebar-link" onClick={() => navigate('/articles')}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M5.58579 4.58579C5 5.17157 5 6.11438 5 8V17C5 18.8856 5 19.8284 5.58579 20.4142C6.17157 21 7.11438 21 9 21H15C16.8856 21 17.8284 21 18.4142 20.4142C19 19.8284 19 18.8856 19 17V8C19 6.11438 19 5.17157 18.4142 4.58579C17.8284 4 16.8856 4 15 4H9C7.11438 4 6.17157 4 5.58579 4.58579ZM9 8C8.44772 8 8 8.44772 8 9C8 9.55228 8.44772 10 9 10H15C15.5523 10 16 9.55228 16 9C16 8.44772 15.5523 8 15 8H9ZM9 12C8.44772 12 8 12.4477 8 13C8 13.5523 8.44772 14 9 14H15C15.5523 14 16 13.5523 16 13C16 12.4477 15.5523 12 15 12H9ZM9 16C8.44772 16 8 16.4477 8 17C8 17.5523 8.44772 18 9 18H13C13.5523 18 14 17.5523 14 17C14 16.4477 13.5523 16 13 16H9Z" fill="#222222" />
                    </svg>
                    <Link to={'/Articles'}>Articles </Link>
                </div>
                <div className="sidebar-link" onClick={() => navigate('/videos')}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21ZM10.7828 7.99043L16.4265 11.1258C17.1123 11.5068 17.1123 12.4932 16.4265 12.8742L10.7828 16.0096C9.98293 16.4539 9 15.8756 9 14.9606V9.03942C9 8.12444 9.98293 7.54607 10.7828 7.99043Z" fill="#222222" />
                    </svg>
                    <Link to={'/Videos'}>Videos</Link>
                </div>
                <div className="sidebar-link" onClick={() => navigate('/mentors')}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M21 19V6C21 6 20 4 16.5 4C13 4 12 7 12 7C12 7 11 4 7.5 4C4 4 3 6 3 6V19C3 19 4 17 7.5 17C11 17 12 19 12 19C12 19 13 17 16.5 17C20 17 21 19 21 19Z" fill="#222222" />
                        <path d="M21 6H22C22 5.84475 21.9639 5.69164 21.8944 5.55279L21 6ZM21 19L20.1056 19.4472C20.313 19.862 20.7784 20.0798 21.2298 19.9732C21.6811 19.8667 22 19.4638 22 19H21ZM3 6L2.10557 5.55279C2.03615 5.69164 2 5.84475 2 6H3ZM3 19H2C2 19.4638 2.31888 19.8667 2.77025 19.9732C3.22162 20.0798 3.68702 19.862 3.89443 19.4472L3 19ZM12 19L11.1056 19.4472C11.275 19.786 11.6212 20 12 20C12.3788 20 12.725 19.786 12.8944 19.4472L12 19ZM12 7L11.0513 7.31623C11.1874 7.72457 11.5696 8 12 8C12.4304 8 12.8126 7.72457 12.9487 7.31623L12 7ZM20 6V19H22V6H20ZM2 6V19H4V6H2ZM21 19C21.8944 18.5528 21.8941 18.5522 21.8938 18.5515C21.8937 18.5513 21.8934 18.5507 21.8932 18.5502C21.8927 18.5494 21.8923 18.5485 21.8918 18.5475C21.8908 18.5456 21.8898 18.5436 21.8887 18.5415C21.8865 18.5372 21.884 18.5324 21.8812 18.5272C21.8757 18.5167 21.869 18.5043 21.861 18.49C21.8452 18.4616 21.8244 18.4259 21.7982 18.3841C21.7459 18.3004 21.672 18.1917 21.5731 18.0668C21.3752 17.8168 21.0765 17.5009 20.6507 17.1913C19.787 16.5631 18.4547 16 16.5 16V18C18.0453 18 18.963 18.4369 19.4743 18.8087C19.736 18.9991 19.9061 19.1832 20.005 19.3082C20.0545 19.3708 20.0861 19.4183 20.1022 19.4441C20.1102 19.4569 20.1143 19.4642 20.1148 19.465C20.115 19.4655 20.1144 19.4643 20.1128 19.4613C20.112 19.4599 20.111 19.458 20.1098 19.4556C20.1092 19.4544 20.1086 19.4532 20.1079 19.4518C20.1075 19.4511 20.1071 19.4503 20.1068 19.4496C20.1066 19.4492 20.1063 19.4486 20.1062 19.4484C20.1059 19.4478 20.1056 19.4472 21 19ZM16.5 16C14.5453 16 13.213 16.5631 12.3493 17.1913C11.9235 17.5009 11.6248 17.8168 11.4269 18.0668C11.328 18.1917 11.2541 18.3004 11.2018 18.3841C11.1756 18.4259 11.1548 18.4616 11.139 18.49C11.131 18.5043 11.1243 18.5167 11.1188 18.5272C11.116 18.5324 11.1135 18.5372 11.1113 18.5415C11.1102 18.5436 11.1092 18.5456 11.1082 18.5475C11.1078 18.5485 11.1073 18.5494 11.1068 18.5502C11.1066 18.5507 11.1063 18.5513 11.1062 18.5515C11.1059 18.5522 11.1056 18.5528 12 19C12.8944 19.4472 12.8941 19.4478 12.8938 19.4484C12.8937 19.4486 12.8934 19.4492 12.8932 19.4496C12.8929 19.4503 12.8925 19.4511 12.8921 19.4518C12.8914 19.4532 12.8908 19.4544 12.8902 19.4556C12.889 19.458 12.888 19.4599 12.8872 19.4613C12.8856 19.4643 12.885 19.4655 12.8852 19.465C12.8857 19.4642 12.8898 19.4569 12.8978 19.4441C12.9139 19.4183 12.9455 19.3708 12.995 19.3082C13.0939 19.1832 13.264 18.9991 13.5257 18.8087C14.037 18.4369 14.9547 18 16.5 18V16ZM12 19C12.8944 18.5528 12.8941 18.5522 12.8938 18.5515C12.8937 18.5513 12.8934 18.5507 12.8932 18.5502C12.8927 18.5494 12.8922 18.5485 12.8918 18.5475C12.8908 18.5456 12.8898 18.5436 12.8887 18.5415C12.8865 18.5372 12.884 18.5324 12.8812 18.5272C12.8757 18.5167 12.869 18.5043 12.861 18.49C12.8452 18.4616 12.8244 18.4259 12.7982 18.3841C12.7459 18.3004 12.672 18.1917 12.5731 18.0668C12.3752 17.8168 12.0765 17.5009 11.6507 17.1913C10.787 16.5631 9.45471 16 7.5 16V18C9.04529 18 9.96303 18.4369 10.4743 18.8087C10.736 18.9991 10.9061 19.1832 11.005 19.3082C11.0545 19.3708 11.0861 19.4183 11.1022 19.4441C11.1102 19.4569 11.1143 19.4642 11.1148 19.465C11.115 19.4655 11.1144 19.4643 11.1128 19.4613C11.112 19.4599 11.111 19.458 11.1098 19.4556C11.1092 19.4544 11.1086 19.4532 11.1079 19.4518C11.1075 19.4511 11.1071 19.4503 11.1068 19.4496C11.1066 19.4492 11.1063 19.4486 11.1062 19.4484C11.1059 19.4478 11.1056 19.4472 12 19ZM7.5 16C5.54529 16 4.21303 16.5631 3.34933 17.1913C2.92351 17.5009 2.62482 17.8168 2.42689 18.0668C2.32798 18.1917 2.25409 18.3004 2.20181 18.3841C2.17565 18.4259 2.15484 18.4616 2.13896 18.49C2.13102 18.5043 2.1243 18.5167 2.11875 18.5272C2.11598 18.5324 2.1135 18.5372 2.11131 18.5415C2.11021 18.5436 2.10918 18.5456 2.10823 18.5475C2.10775 18.5485 2.10729 18.5494 2.10685 18.5502C2.10663 18.5507 2.10631 18.5513 2.1062 18.5515C2.10588 18.5522 2.10557 18.5528 3 19C3.89443 19.4472 3.89412 19.4478 3.89383 19.4484C3.89373 19.4486 3.89343 19.4492 3.89324 19.4496C3.89286 19.4503 3.89249 19.4511 3.89214 19.4518C3.89143 19.4532 3.89077 19.4544 3.89017 19.4556C3.88896 19.458 3.88797 19.4599 3.8872 19.4613C3.88565 19.4643 3.88497 19.4655 3.88521 19.465C3.88569 19.4642 3.88978 19.4569 3.8978 19.4441C3.91388 19.4183 3.94546 19.3708 3.99498 19.3082C4.09393 19.1832 4.26399 18.9991 4.52567 18.8087C5.03697 18.4369 5.95471 18 7.5 18V16ZM21 6C21.8944 5.55279 21.8941 5.55217 21.8938 5.55154C21.8937 5.55132 21.8934 5.55068 21.8932 5.55024C21.8927 5.54937 21.8923 5.54845 21.8918 5.54751C21.8908 5.54563 21.8898 5.54362 21.8887 5.54148C21.8865 5.53721 21.884 5.53244 21.8812 5.52719C21.8757 5.5167 21.869 5.50427 21.861 5.49004C21.8452 5.4616 21.8244 5.42592 21.7982 5.38406C21.7459 5.30041 21.672 5.19174 21.5731 5.0668C21.3752 4.81678 21.0765 4.50095 20.6507 4.19126C19.787 3.56311 18.4547 3 16.5 3V5C18.0453 5 18.963 5.43689 19.4743 5.80874C19.736 5.99905 19.9061 6.18322 20.005 6.3082C20.0545 6.37076 20.0861 6.41834 20.1022 6.44406C20.1102 6.4569 20.1143 6.46418 20.1148 6.46503C20.115 6.46546 20.1144 6.46426 20.1128 6.46133C20.112 6.45987 20.111 6.45797 20.1098 6.45562C20.1092 6.45445 20.1086 6.45316 20.1079 6.45176C20.1075 6.45106 20.1071 6.45033 20.1068 6.44957C20.1066 6.44919 20.1063 6.4486 20.1062 6.44841C20.1059 6.44782 20.1056 6.44721 21 6ZM16.5 3C14.4233 3 13.0435 3.90451 12.2003 4.82428C11.7865 5.27576 11.5054 5.72556 11.3266 6.06449C11.2367 6.2348 11.1712 6.37969 11.1267 6.48648C11.1044 6.53996 11.0873 6.58414 11.0749 6.61747C11.0687 6.63414 11.0637 6.64813 11.0598 6.65924C11.0578 6.66479 11.0561 6.66963 11.0547 6.67373C11.054 6.67577 11.0534 6.67764 11.0528 6.67931C11.0525 6.68015 11.0523 6.68094 11.052 6.68168C11.0519 6.68206 11.0517 6.68258 11.0517 6.68276C11.0515 6.68327 11.0513 6.68377 12 7C12.9487 7.31623 12.9485 7.3167 12.9484 7.31717C12.9483 7.31731 12.9482 7.31776 12.9481 7.31804C12.9479 7.3186 12.9477 7.31912 12.9476 7.31959C12.9472 7.32054 12.947 7.32132 12.9468 7.32193C12.9463 7.32314 12.9462 7.32367 12.9462 7.32355C12.9463 7.32331 12.9473 7.32045 12.9493 7.31515C12.9532 7.30453 12.961 7.28426 12.9729 7.25571C12.9967 7.19843 13.0368 7.10895 13.0953 6.99801C13.2133 6.77444 13.401 6.47424 13.6747 6.17572C14.2065 5.59549 15.0767 5 16.5 5V3ZM12 7C12.9487 6.68377 12.9485 6.68327 12.9483 6.68276C12.9483 6.68258 12.9481 6.68206 12.948 6.68168C12.9477 6.68094 12.9475 6.68015 12.9472 6.67931C12.9466 6.67764 12.946 6.67577 12.9453 6.67373C12.9439 6.66963 12.9422 6.66479 12.9402 6.65924C12.9363 6.64813 12.9313 6.63414 12.9251 6.61747C12.9127 6.58414 12.8956 6.53996 12.8733 6.48648C12.8288 6.37969 12.7633 6.2348 12.6734 6.06449C12.4946 5.72556 12.2135 5.27576 11.7997 4.82428C10.9565 3.90451 9.57669 3 7.5 3V5C8.92331 5 9.79346 5.59549 10.3253 6.17572C10.599 6.47424 10.7867 6.77444 10.9047 6.99801C10.9632 7.10895 11.0033 7.19843 11.0271 7.25571C11.039 7.28426 11.0468 7.30453 11.0507 7.31515C11.0527 7.32045 11.0537 7.32331 11.0538 7.32355C11.0538 7.32367 11.0537 7.32314 11.0532 7.32193C11.053 7.32132 11.0528 7.32054 11.0524 7.31959C11.0523 7.31912 11.0521 7.3186 11.0519 7.31804C11.0518 7.31776 11.0517 7.31731 11.0516 7.31717C11.0515 7.3167 11.0513 7.31623 12 7ZM7.5 3C5.54529 3 4.21303 3.56311 3.34933 4.19126C2.92351 4.50095 2.62482 4.81678 2.42689 5.0668C2.32798 5.19174 2.25409 5.30041 2.20181 5.38406C2.17565 5.42592 2.15484 5.4616 2.13896 5.49004C2.13102 5.50427 2.1243 5.5167 2.11875 5.52719C2.11598 5.53244 2.1135 5.53721 2.11131 5.54148C2.11021 5.54362 2.10918 5.54563 2.10823 5.54751C2.10775 5.54845 2.10729 5.54937 2.10685 5.55024C2.10663 5.55068 2.10631 5.55132 2.1062 5.55154C2.10588 5.55217 2.10557 5.55279 3 6C3.89443 6.44721 3.89412 6.44782 3.89383 6.44841C3.89373 6.4486 3.89343 6.44919 3.89324 6.44957C3.89286 6.45033 3.89249 6.45106 3.89214 6.45176C3.89143 6.45316 3.89077 6.45445 3.89017 6.45562C3.88896 6.45797 3.88797 6.45987 3.8872 6.46133C3.88565 6.46426 3.88497 6.46546 3.88521 6.46503C3.88569 6.46418 3.88978 6.4569 3.8978 6.44406C3.91388 6.41834 3.94546 6.37076 3.99498 6.3082C4.09393 6.18322 4.26399 5.99905 4.52567 5.80874C5.03697 5.43689 5.95471 5 7.5 5V3Z" fill="#222222" />
                    </svg>
                    <Link to={'/Mentors'}>Mentors</Link>
                </div>
            </div>
        </aside>
    )
}