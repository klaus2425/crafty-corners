import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../context/ContextProvider';
import echo from './Echo';

const BottomNav = () => {
  const navigate = useNavigate();
  const { user } = useStateContext();
  const [messageNotify, setMessageNotify] = useState(false);
  const [hasNotification, setHasNotification] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    echo.private(`user-${user.id}`)
      .listen('MessageSent', (data) => {
        if (!(window.location.pathname == '/messages') && !(window.location.pathname == `/conversation/${data.message.conversation_id}`)) {
          setMessageNotify(true);
        }
        else {
          setMessageNotify(false);
        }

      })
      .listen('PostInteraction', () => {
        queryClient.refetchQueries('notifications');
        if (window.location.pathname != '/notifications') {
          setHasNotification(true);
        }
        else {
          setHasNotification(false);
        }
      })
    if (user.unread_notifications_count > 0 && window.location.pathname != '/notifications') {
      setHasNotification(true);
    } else setHasNotification(false);
    if (user.unread_messages_count > 0 && window.location.pathname != '/messages') {
      setMessageNotify(true);
    } else setMessageNotify(false);

  }, [])

  return (
    <div className='bottom-navbar'>

      <div className="bottom-navbar__link" onClick={() => {
        setHasNotification(false);
        navigate('/notifications')
      }}>
        {
          hasNotification ?
            <svg id='notification-icon' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M13.7942 3.29494C13.2296 3.10345 12.6258 3 12 3C9.15347 3 6.76217 5.14032 6.44782 7.96942L6.19602 10.2356L6.18957 10.2933C6.06062 11.417 5.69486 12.5005 5.11643 13.4725L5.08664 13.5222L4.5086 14.4856C3.98405 15.3599 3.72177 15.797 3.77839 16.1559C3.81607 16.3946 3.93896 16.6117 4.12432 16.7668C4.40289 17 4.91267 17 5.93221 17H18.0678C19.0873 17 19.5971 17 19.8756 16.7668C20.061 16.6117 20.1839 16.3946 20.2216 16.1559C20.2782 15.797 20.0159 15.3599 19.4914 14.4856L18.9133 13.5222L18.8835 13.4725C18.4273 12.7059 18.1034 11.8698 17.9236 10.9994C15.1974 10.9586 13 8.73592 13 6C13 5.00331 13.2916 4.07473 13.7942 3.29494ZM16.2741 4.98883C16.0999 5.28551 16 5.63109 16 6C16 6.94979 16.662 7.74494 17.5498 7.94914C17.4204 6.82135 16.9608 5.80382 16.2741 4.98883Z" fill="#222222" />
              <path d="M9 17C9 17.394 9.0776 17.7841 9.22836 18.1481C9.37913 18.512 9.6001 18.8427 9.87868 19.1213C10.1573 19.3999 10.488 19.6209 10.8519 19.7716C11.2159 19.9224 11.606 20 12 20C12.394 20 12.7841 19.9224 13.1481 19.7716C13.512 19.6209 13.8427 19.3999 14.1213 19.1213C14.3999 18.8427 14.6209 18.512 14.7716 18.1481C14.9224 17.7841 15 17.394 15 17L12 17H9Z" fill="#222222" />
              <circle cx="18" cy="6" r="2.5" fill="#FF4444" stroke="#FF4444" />
            </svg>
            :
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M6.50248 6.97519C6.78492 4.15083 9.16156 2 12 2C14.8384 2 17.2151 4.15083 17.4975 6.97519L17.7841 9.84133C17.8016 10.0156 17.8103 10.1028 17.8207 10.1885C17.9649 11.3717 18.3717 12.5077 19.0113 13.5135C19.0576 13.5865 19.1062 13.6593 19.2034 13.8051L20.0645 15.0968C20.8508 16.2763 21.244 16.866 21.0715 17.3412C21.0388 17.4311 20.9935 17.5158 20.9368 17.5928C20.6371 18 19.9283 18 18.5108 18H5.48923C4.07168 18 3.36291 18 3.06318 17.5928C3.00651 17.5158 2.96117 17.4311 2.92854 17.3412C2.75601 16.866 3.14916 16.2763 3.93548 15.0968L4.79661 13.8051C4.89378 13.6593 4.94236 13.5865 4.98873 13.5135C5.62832 12.5077 6.03508 11.3717 6.17927 10.1885C6.18972 10.1028 6.19844 10.0156 6.21587 9.84133L6.50248 6.97519Z" fill="#222222" />
              <path className='bell-stroke' d="M10.0681 20.6294C10.1821 20.7357 10.4332 20.8297 10.7825 20.8967C11.1318 20.9637 11.5597 21 12 21C12.4403 21 12.8682 20.9637 13.2175 20.8967C13.5668 20.8297 13.8179 20.7357 13.9319 20.6294" stroke="#222222" strokeWidth="2" strokeLinecap="round" />
            </svg>
        }
      </div>
      <div className="bottom-navbar__link" onClick={() => navigate(`/profile?uid=${user.id}`)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M19.6515 19.4054C20.2043 19.2902 20.5336 18.7117 20.2589 18.2183C19.6533 17.1307 18.6993 16.1749 17.4788 15.4465C15.907 14.5085 13.9812 14 12 14C10.0188 14 8.09292 14.5085 6.52112 15.4465C5.30069 16.1749 4.34666 17.1307 3.74108 18.2183C3.46638 18.7117 3.79562 19.2902 4.34843 19.4054C9.39524 20.4572 14.6047 20.4572 19.6515 19.4054Z" fill="#222222" />
          <circle cx="12" cy="8" r="5" fill="#222222" />
        </svg>
      </div>
      <div className="bottom-navbar__link" onClick={() => {
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
      </div>
      <div className="bottom-navbar__link" onClick={() => navigate(`/schedule`)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21ZM13 6.5C13 5.94772 12.5523 5.5 12 5.5C11.4477 5.5 11 5.94772 11 6.5V11.75C11 12.4404 11.5596 13 12.25 13H15.5C16.0523 13 16.5 12.5523 16.5 12C16.5 11.4477 16.0523 11 15.5 11H13V6.5Z" fill="#222222" />
        </svg>
      </div>
      <div className="bottom-navbar__link" onClick={() => navigate(`/communities?uid=${user.id}`)} >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="9" r="4" fill="#33363F" />
          <circle cx="17" cy="9" r="3" fill="#33363F" />
          <circle cx="7" cy="9" r="3" fill="#33363F" />
          <path fillRule="evenodd" clipRule="evenodd" d="M17.5685 18H19.895C20.4867 18 20.9403 17.4901 20.7966 16.9162C20.4284 15.4458 19.448 13 17 13C16.114 13 15.4201 13.3205 14.8781 13.7991C16.3858 14.7773 17.1654 16.4902 17.5685 18Z" fill="#33363F" />
          <path fillRule="evenodd" clipRule="evenodd" d="M9.12197 13.7991C8.57989 13.3205 7.88609 13 7 13C4.55208 13 3.57166 15.4458 3.20343 16.9162C3.05971 17.4901 3.51335 18 4.10498 18H6.43155C6.83464 16.4902 7.61422 14.7773 9.12197 13.7991Z" fill="#33363F" />
          <path d="M12 14C15.7087 14 16.6665 17.301 16.9139 19.0061C16.9932 19.5526 16.5523 20 16 20H8C7.44772 20 7.00684 19.5526 7.08614 19.0061C7.33351 17.301 8.29134 14 12 14Z" fill="#33363F" />
        </svg>
      </div>
    </div>
  )

}

export default BottomNav;