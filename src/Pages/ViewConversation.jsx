import { useParams } from 'react-router-dom'
import { useEffect, useRef, useState, exper } from 'react';
import { useNavigate } from 'react-router-dom'
import Pusher from 'pusher-js';
import axiosClient from '../axios-client';
import { useStateContext } from '../context/ContextProvider';
import Echo from 'laravel-echo';
import axios from 'axios';

const ViewConversation = (props) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [receiver, setReceiver] = useState();
  const storageBaseUrl = import.meta.env.VITE_API_STORAGE_URL;
  const { user } = useStateContext();
  const [allMessages, setAllMessage] = useState();
  const { id } = useParams();
  const navigate = useNavigate();
  const conversationEndRef = useRef(null);
  const handleBack = () => {
    navigate('/messages')
  }

  const getTimestamp = (date) => {
    const dateObject = new Date(date);
  
    const hours = dateObject.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = (hours % 12 || 12).toString().padStart(2, '0');
    const minutes = dateObject.getMinutes().toString().padStart(2, '0');
  
    const formattedTime = `${formattedHours}:${minutes} ${ampm}`;
  
    return formattedTime;
  }

  const getMessages = () => {
    axiosClient.get(`/chat/messages/${id}`)
      .then(res => {
        console.log('method called');
        setMessages(res.data.messages);
      })
  }

  const getReceiver = () => {
    axiosClient.get(`/users/${id}`)
      .then(res => {
        setReceiver(res.data.data);
      })
  }

  const submit = async () => {
    const formData = new FormData();
    formData.append('to_user_id', id);
    formData.append('from_user_id', user.id);

    formData.append('message', message);
    axiosClient.post(`chat/send/${id}`, formData)
      .then(res => {
        setMessage('')
        getMessages();
      })
      .catch(err => console.log(err.response.data))
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      submit();
    }
  }

  useEffect(() => {
    getMessages();
    getReceiver();
    Pusher.logToConsole = true;

    const echo = new Echo({
      broadcaster: 'pusher',
      key: 'dc6423124445d7b08415',
      cluster: 'ap1',
      forceTLS: true,
      authEndPoint: "/pusher/auth",
      encrypted: true,
      authorizer: (channel) => {
        return {
          authorize: (socketId, callback) => {
            axiosClient.post('broadcasting/auth', {
              socket_id: socketId,
              channel_name: channel.name
            })
              .then(response => {
                callback(false, response.data);
              })
              .catch(error => {
                callback(true, error);
              });
          }
        }
      }
    });

    echo.private(`chat-${user?.id}`)
    .listen('MessageSent', (data) => {
      console.log(data);
      getMessages();

    }).error((error) => { console.error(error) });
    // 
    // const pusher = new Pusher('dc6423124445d7b08415', {
    //   cluster: 'ap1',
    //   encrypted: true,
    // });

    // const channel = pusher.subscribe(`chat-${user.id}`);
    // channel.bind('pusher:subscription_succeeded', function (data) {
    //   console.log('Subscription Successful');
    // });

    // channel.bind('pusher:subscription_error', function (data) {
    //   console.log(data);
    // });

    // channel.bind('PublicChat', function (data) {
    //   allMessages.push(data);
    //   console.log('all messages',allMessages);
    //   setMessages(allMessages);
    // });
    return () => {
      echo.leave(`chat-${user?.id}`);
      console.log('unmount',);
    }
  }, [])

  useEffect(() => {
    conversationEndRef.current?.scrollIntoView();
  }, [messages])



  return (
    <div className="authenticated-container">
      <div className="feed">
        <div className='section-header'>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21H16.5C17.8978 21 18.5967 21 19.1481 20.7716C19.8831 20.4672 20.4672 19.8831 20.7716 19.1481C21 18.5967 21 17.8978 21 16.5V12C21 7.02944 16.9706 3 12 3ZM8 11C8 10.4477 8.44772 10 9 10H15C15.5523 10 16 10.4477 16 11C16 11.5523 15.5523 12 15 12H9C8.44772 12 8 11.5523 8 11ZM11 15C11 14.4477 11.4477 14 12 14H15C15.5523 14 16 14.4477 16 15C16 15.5523 15.5523 16 15 16H12C11.4477 16 11 15.5523 11 15Z" fill="#222222" />
          </svg>
          <h3>Messages</h3>
        </div>
        <div className='conversation-card'>
          <div className="conversation-name">
            <svg className='message-back' onClick={handleBack} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M4 8L3.64645 8.35355L3.29289 8L3.64645 7.64645L4 8ZM9 19.5C8.72386 19.5 8.5 19.2761 8.5 19C8.5 18.7239 8.72386 18.5 9 18.5L9 19.5ZM8.64645 13.3536L3.64645 8.35355L4.35355 7.64645L9.35355 12.6464L8.64645 13.3536ZM3.64645 7.64645L8.64645 2.64645L9.35355 3.35355L4.35355 8.35355L3.64645 7.64645ZM4 7.5L14.5 7.5L14.5 8.5L4 8.5L4 7.5ZM14.5 19.5L9 19.5L9 18.5L14.5 18.5L14.5 19.5ZM20.5 13.5C20.5 16.8137 17.8137 19.5 14.5 19.5L14.5 18.5C17.2614 18.5 19.5 16.2614 19.5 13.5L20.5 13.5ZM14.5 7.5C17.8137 7.5 20.5 10.1863 20.5 13.5L19.5 13.5C19.5 10.7386 17.2614 8.5 14.5 8.5L14.5 7.5Z" fill="#222222" />
            </svg>
            <div className='c-name-type'>
              <span className='c-username'>{receiver?.first_name}</span>
              <span>{receiver?.type}</span>
            </div>
          </div>
          <div className="conversation-container">
            {
              messages.map(message => {
                if (message.from_user_id === user.id) {
                  return (
                    <div key={message.id}>
                      <div className="conversation-item-user">
                        <img className='chat-img' src={`${storageBaseUrl}${user?.profile_picture}`} alt="" />
                        <span className="chat">{message.message}</span>
                        <span className='chat-timestamp'>{getTimestamp(message.updated_at)}</span>
                      </div>
                      <div ref={conversationEndRef} />
                    </div>
                  )
                }
                else {
                  return (
                    <div key={message.id}>
                      <div key={message.id} className="conversation-item-sender">
                        <img className='chat-img' src={`${storageBaseUrl}${receiver?.profile_picture}`} alt="" />
                        <span className="chat">{message.message}</span>
                        <span className='chat-timestamp'>{getTimestamp(message.updated_at)}</span>
                      </div>
                      <div ref={conversationEndRef} />
                    </div>
                  )
                }
              })
            }
          </div>
          <div>
            <div className="textbox">
              <div className='text-icon-container'>
                <input value={message} onKeyDown={handleKeyDown} onChange={ev => setMessage(ev.target.value)} type="text" placeholder='Send a message' />
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd" d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12ZM12 18C11.4477 18 11 17.5523 11 17V13H7C6.44772 13 6 12.5523 6 12C6 11.4477 6.44772 11 7 11H11V7C11 6.44772 11.4477 6 12 6C12.5523 6 13 6.44772 13 7V11H17C17.5523 11 18 11.4477 18 12C18 12.5523 17.5523 13 17 13H13V17C13 17.5523 12.5523 18 12 18Z" fill="#222222" />
                </svg>
              </div>
              <svg onClick={submit} xmlns="http://www.w3.org/2000/svg" width="55" height="55" viewBox="0 0 55 55" fill="none">
                <path id='send-icon' fillRule="evenodd" clipRule="evenodd" d="M42.5778 11.7986C41.4291 12.0029 39.8592 12.5225 37.571 13.2852L19.9738 19.1509C17.7452 19.8938 16.1235 20.4348 14.9457 20.8944C13.7218 21.3719 13.1848 21.6879 12.9599 21.904C11.2947 23.5042 11.2947 26.1682 12.9599 27.7683C13.1848 27.9845 13.7218 28.3005 14.9457 28.778C16.1235 29.2376 17.7452 29.7786 19.9738 30.5214C20.0092 30.5333 20.0442 30.5449 20.0786 30.5564C20.8702 30.82 21.4166 31.0021 21.9128 31.2645C23.1157 31.9007 24.0993 32.8843 24.7355 34.0872C24.9979 34.5834 25.18 35.1298 25.4436 35.9214C25.4551 35.9558 25.4667 35.9908 25.4786 36.0262C26.2214 38.2548 26.7624 39.8764 27.222 41.0543C27.6995 42.2782 28.0155 42.8152 28.2317 43.0401C29.8318 44.7053 32.4958 44.7053 34.096 43.0401C34.3121 42.8152 34.6281 42.2782 35.1056 41.0543C35.5652 39.8764 36.1062 38.2548 36.8491 36.0262L42.7148 18.429C43.4775 16.1408 43.9971 14.5709 44.2014 13.4222C44.4075 12.2636 44.2042 12.0004 44.1019 11.8981C43.9996 11.7958 43.7364 11.5925 42.5778 11.7986ZM42.103 9.12947C43.485 8.88362 44.9364 8.89863 46.0189 9.98109C47.1014 11.0636 47.1164 12.5149 46.8705 13.897C46.6271 15.2654 46.0404 17.0252 45.3236 19.1755L45.2867 19.2863L39.421 36.8835L39.4074 36.9241C38.6807 39.1042 38.1186 40.7906 37.6312 42.0397C37.1588 43.2505 36.6821 44.2615 36.0507 44.9185C33.3838 47.6938 28.9438 47.6938 26.2769 44.9185C25.6455 44.2615 25.1688 43.2505 24.6964 42.0397C24.209 40.7905 23.6468 39.1039 22.92 36.9236L22.9067 36.8835C22.5948 35.9478 22.4836 35.6281 22.339 35.3546C21.9573 34.6329 21.3671 34.0427 20.6454 33.661C20.3719 33.5164 20.0522 33.4052 19.1165 33.0933L19.0764 33.08C16.8961 32.3532 15.2095 31.791 13.9603 31.3036C12.7495 30.8312 11.7385 30.3545 11.0815 29.7231C8.30618 27.0562 8.30618 22.6162 11.0815 19.9493C11.7385 19.3179 12.7495 18.8412 13.9603 18.3688C15.2094 17.8814 16.896 17.3192 19.0762 16.5925L19.1165 16.579L36.7137 10.7133L36.8244 10.6764C38.9747 9.95957 40.7346 9.37291 42.103 9.12947Z" fill="#222222" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="recommended">

      </div>
    </div>

  )
}

export default ViewConversation;