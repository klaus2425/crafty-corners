import { useParams } from 'react-router-dom'
import { useEffect, useRef, useState, } from 'react';
import { useNavigate } from 'react-router-dom'
import Pusher from 'pusher-js';
import axiosClient from '../axios-client';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';
import InfiniteScroll from 'react-infinite-scroll-component'
import Loading from '../components/utils/Loading';
import echo  from '../components/Echo';

const ViewConversation = (props) => {
  
  const [pageIndex, setPageIndex] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [messages, setMessages] = useState([]);
  const messageRef = useRef();
  const [hasMessage , setHasMessage] = useState(false);
  const params = new URLSearchParams(window.location.search);
  const user_id0 = params.get('user_id0');
  const user_id1 = params.get('user_id1');
  const uid = params.get('lid')
  const [receiver, setReceiver] = useState();
  const storageBaseUrl = import.meta.env.VITE_API_STORAGE_URL;
  const { conversation_id } = useParams();
  const navigate = useNavigate();
  const conversationEndRef = useRef(null);
  const handleBack = () => {
    navigate(`/messages?uid=${uid}`)
  }
  const [deleteOpen, setDeleteOpen] = useState(false);
  const getTimestamp = (date) => {
    const dateObject = new Date(date);

    const hours = dateObject.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = (hours % 12 || 12).toString().padStart(2, '0');
    const minutes = dateObject.getMinutes().toString().padStart(2, '0');
    const formattedTime = `${formattedHours}:${minutes} ${ampm}`;

    return formattedTime;
  }

  const fetchNext = () => {
    console.log('Fetch Next called');
    console.log(messages.length);
    axiosClient.get(`/conversation/message/${receiver.id}?page=${pageIndex + 1}`)
      .then((res) => {
        console.log(res.data.data.meta);
        setMessages(messages.concat(res.data.data.messages))
        if (res.data.data.meta.current_page >= res.data.data.meta.last_page) {
          setHasMore(false);
          console.log('last page');
        }
        setPageIndex(pageIndex + 1)

      })
  }

  const getMessages = (rec) => {
    axiosClient.get(`/conversation/message/${rec}`)
      .then(res => {
        setPageIndex(1)
        setHasMore(true)
        console.log(res.data);
        conversationEndRef.current?.scrollIntoView();
        setMessages(res.data.data.messages);
        if (res.data.data.messages.length == 0) {
          setHasMessage(false);
          console.log();
          setHasMore(false);
        } else {
          console.log('setHasMessage', true);
          setHasMessage(true)
        }
      })
      .catch(err => console.log(err))
  }

  const getReceiver = () => {
    if (user_id0 != uid) {
      axiosClient.get(`/users/${user_id0}`)
        .then(res => {
          console.log(res.data.data);
          setReceiver(res.data.data);
          getMessages(res.data.data.id);
        })
    }
    else if (user_id1 !== uid) {
      axiosClient.get(`/users/${user_id1}`)
        .then(res => {
          setReceiver(res.data.data);
          getMessages(res.data.data.id);

        })
    }

  }

  const submit = () => {
    const formData = new FormData();
    formData.append('message', messageRef.current.value);
    axiosClient.post(`/conversation/message/${receiver.id}`, formData)
      .then(res => {
        messageRef.current.value = "";
        getMessages(res.data.data.receiver.receiver_id);
      })
      .catch(err => console.log(err))
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      submit();
    }
  }

  useEffect(() => {
    getReceiver()
    Pusher.logToConsole = true;

    echo.private(`conversation-${conversation_id}`)
      .listen('MessageSent', (data) => {
        console.log('listen triggered');
        console.log(data);
        if (data.user != uid) getMessages(data.user)
        
      }).error((error) => { console.error(error) });
    conversationEndRef.current?.scrollIntoView();




    return () => {
      echo.leave(`conversation-${conversation_id}`);
      console.log(hasMessage);
      if (!hasMessage) {
        axiosClient.delete(`/conversation/${conversation_id}`).catch(err => console.log(err));
      }
    };
  }, []);




  return (
    <div className="authenticated-container">
      <div className="feed">
        <ConfirmDeleteModal id={conversation_id} deleteOpen={deleteOpen} setDeleteOpen={setDeleteOpen} />
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
            <div onClick={() => setDeleteOpen(true)} className='conversation-trash'>
              <svg width="30" height="30" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.8333 23.75L15.8333 19" stroke="#FF5C5C" strokeWidth="1.9" strokeLinecap="round" />
                <path d="M22.1667 23.75L22.1667 19" stroke="#FF5C5C" strokeWidth="1.9" strokeLinecap="round" />
                <path d="M4.75 11.0833H33.25V11.0833C31.7745 11.0833 31.0368 11.0833 30.4548 11.3244C29.6789 11.6458 29.0624 12.2622 28.741 13.0382C28.5 13.6201 28.5 14.3579 28.5 15.8333V25.3333C28.5 28.3189 28.5 29.8117 27.5725 30.7392C26.645 31.6667 25.1522 31.6667 22.1667 31.6667H15.8333C12.8478 31.6667 11.355 31.6667 10.4275 30.7392C9.5 29.8117 9.5 28.3189 9.5 25.3333V15.8333C9.5 14.3579 9.5 13.6201 9.25895 13.0382C8.93755 12.2622 8.32109 11.6458 7.54516 11.3244C6.96322 11.0833 6.22548 11.0833 4.75 11.0833V11.0833Z" fill="#7E869E" fillOpacity="0.25" stroke="#FF5C5C" strokeWidth="1.9" strokeLinecap="round" />
                <path d="M15.9412 5.33677C16.1216 5.16843 16.5192 5.01969 17.0722 4.9136C17.6253 4.8075 18.3029 4.75 19 4.75C19.6971 4.75 20.3747 4.8075 20.9277 4.9136C21.4808 5.01969 21.8783 5.16843 22.0588 5.33677" stroke="#FF5C5C" strokeWidth="1.9" strokeLinecap="round" />
              </svg>
            </div>
          </div>
          <div className="conversation-container">
            <div id='conversation-scroll' >
              <InfiniteScroll style={{ display: 'flex', flexDirection: 'column-reverse' }} inverse={true}
                scrollableTarget='conversation-scroll' dataLength={messages.length} next={fetchNext} hasMore={hasMore} loader={<Loading />}
                endMessage={
                  <div style={{ textAlign: 'center', marginBottom: '8rem' }}>
                    <h2>Start of Conversation</h2>
                  </div>
                }>
                {
                  messages.map(message => {
                    if (message.sender_id == uid) {
                      return (
                        <div key={message.id} className="conversation-item-user">
                          <span className="chat">{message.message}</span>
                          <span className='chat-timestamp'>{getTimestamp(message.created_at)}</span>
                        </div>
                      )
                    }
                    else {
                      return (
                        <div key={message.id} className="conversation-item-sender">
                          <img className='chat-img' src={`${storageBaseUrl}${receiver?.profile_picture}`} alt="" />
                          <span className="chat">{message.message}</span>
                          <span className='chat-timestamp'>{getTimestamp(message.created_at)}</span>
                        </div>
                      )
                    }
                  })
                }
              </InfiniteScroll>
            </div>
            <div className='end' ref={conversationEndRef}></div>

          </div>
          <div>
            <div className="textbox">
              <div className='text-icon-container'>
                <input ref={messageRef} onKeyDown={handleKeyDown} type="text" placeholder='Send a message' />
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