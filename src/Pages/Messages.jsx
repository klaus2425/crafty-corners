import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axiosClient from "../axios-client";
import Loading from "../components/utils/Loading";
import { useStateContext } from "../context/ContextProvider";
import TimeAgo from 'javascript-time-ago';
import debounce from "../components/utils/debounce";
import { useEffect, useState } from "react";

const Messages = () => {
  const navigate = useNavigate();
  const { user, setHasMessageNotification, hasMessageNotification } = useStateContext();
  const params = new URLSearchParams(window.location.search);
  const uid = params.get('uid')
  const timeAgo = new TimeAgo();
  const [searchResults, setSearchResult] = useState(null);
  const queryClient = useQueryClient();

  const viewConversation = (conversation_id, id1, id2) => {
    axiosClient.post(`/conversation/mark-as-read/${conversation_id}`)
    navigate(`/conversation/${conversation_id}`, { state: { user_id0: id1, user_id1: id2, lid: user.id } });
  }
  const storageBaseUrl = import.meta.env.VITE_API_STORAGE_URL;


  const useConversations = useQuery({
    queryKey: ['conversations'],
    queryFn: () => axiosClient.get('/conversations').then(({ data }) => (data.data))
  })

  const handleSearch = (ev) => {
    if (ev.target.value != '') {
      searchDebounce(ev.target.value);
    }
    else setSearchResult(null);
  }

  const searchDebounce = debounce((value) => {
    axiosClient.get(`/search-conversation?name=${value}`)
      .then(res => {
        setSearchResult(res.data.data)
      })
  }, 400)

  useEffect(() => {
    queryClient.invalidateQueries('conversations');
  }, [])


  return (
    <div className="authenticated-container">
      <div className="feed">
        <div className='section-header'>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21H16.5C17.8978 21 18.5967 21 19.1481 20.7716C19.8831 20.4672 20.4672 19.8831 20.7716 19.1481C21 18.5967 21 17.8978 21 16.5V12C21 7.02944 16.9706 3 12 3ZM8 11C8 10.4477 8.44772 10 9 10H15C15.5523 10 16 10.4477 16 11C16 11.5523 15.5523 12 15 12H9C8.44772 12 8 11.5523 8 11ZM11 15C11 14.4477 11.4477 14 12 14H15C15.5523 14 16 14.4477 16 15C16 15.5523 15.5523 16 15 16H12C11.4477 16 11 15.5523 11 15Z" fill="#222222" />
          </svg>
          <h3>Messages</h3>
        </div>
        <div className="list-card">
          <div className="card-search">
            <input onChange={handleSearch} className="search" type="text" placeholder="Search for Conversations 🔍" />
          </div>

          {
            !searchResults ?

              !useConversations.isLoading ? useConversations.data.map(c => {
                if (!c.latest_message) return null;
                if (c.user_0.id == uid) {
                  return (
                    <div key={c.id} onClick={() => viewConversation(c.id, c.user_0.id, c.user_1.id)} className="list-card-items">
                      <div className="list-card-item">
                        <div className="left">
                          <div className="list-card-item-image">
                            <img src={`${storageBaseUrl}${c.receiver_profile_picture}`} alt="" />
                          </div>
                          <div className="list-card-item-text">
                            <span>{c.user_1.first_name}</span>
                            {uid != c?.latest_message.sender_id && !c?.latest_message.read ?
                              <p><strong>{c.user_1.id == c.latest_message.sender_id ? c.user_1.first_name : c.user_0.first_name}: {!c.latest_message.attachments ?
                                c.latest_message.message : c.latest_message.attachments[0].file_type.startsWith('image/') ? 'Sent an image' :
                                  c.latest_message.attachments[0].file_type.startsWith('video/') ? 'Sent a video' : 'Sent an attachment'}</strong>

                              </p>
                              :
                              <p>{c.user_1.id == c.latest_message.sender_id ? c.user_1.first_name : c.user_0.first_name}: {!c.latest_message.attachments ?
                                c.latest_message.message : c.latest_message.attachments[0].file_type.startsWith('image/') ? 'Sent an image' :
                                  c.latest_message.attachments[0].file_type.startsWith('video/') ? 'Sent a video' : 'Sent an attachment'}</p>
                            }
                          </div>
                        </div>
                        <div className="list-card-item-time-message">

                          {uid != c.latest_message.sender_id && !c.latest_message.read &&
                            <span>
                              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="7" cy="7" r="7" fill="#FF4646" />
                              </svg>
                            </span>
                          }
                          <span className="message-time">
                            {timeAgo.format(new Date(c.latest_message.created_at.replace(" ", "T")), 'twitter-now')}

                          </span>
                        </div>
                      </div>
                    </div>
                  )
                }
                else return (
                  <div key={c.id} onClick={() => viewConversation(c.id, c.user_0.id, c.user_1.id)} className="list-card-items">
                    <div className="list-card-item">
                      <div className="left">
                        <div className="list-card-item-image">
                          <img src={`${storageBaseUrl}${c.receiver_profile_picture}`} alt="" />
                        </div>
                        <div className="list-card-item-text">
                          <span>{c.user_0.first_name}</span>
                          {uid != c.latest_message.sender_id && !c.latest_message.read ?
                            <p><strong>{c.user_0.id == c.latest_message.sender_id ? c.user_0.first_name : c.user_1.first_name}:
                              {!c.latest_message.attachments ? c.latest_message.message : c.latest_message.attachments[0].file_type.startsWith('image/') ?
                                'Sent an image' : c.latest_message.attachments[0].file_type.startsWith('video/') ? 'Sent a video' : 'Sent an attachment'}</strong></p>
                            :
                            <p>{c.user_0.id == c.latest_message.sender_id ? c.user_0.first_name : c.user_1.first_name}: {!c.latest_message.attachments ?
                              c.latest_message.message : c.latest_message.attachments[0].file_type.startsWith('image/') ? 'Sent an image' :
                                c.latest_message.attachments[0].file_type.startsWith('video/') ? 'Sent a video' : 'Sent an attachment'}</p>
                          }
                        </div>
                      </div>

                      <div className="list-card-item-time-message">
                        {uid != c.latest_message.sender_id && !c.latest_message.read &&
                          <span>
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="7" cy="7" r="7" fill="#FF4646" />
                            </svg>
                          </span>
                        }
                        <span className="message-time">
                          {timeAgo.format(new Date(c.latest_message.created_at.replace(" ", "T")), 'twitter-now')}

                        </span>
                      </div>
                    </div>
                  </div>
                )
              })
                : <Loading />
              :
              searchResults.map(c => {
                if (c.user_0.id == uid) {
                  return (
                    <div key={c.id} onClick={() => viewConversation(c.id, c.user_0.id, c.user_1.id)} className="list-card-items">
                      <div className="list-card-item">
                        <div className="left">
                          <div className="list-card-item-image">
                            <img src={`${storageBaseUrl}${c.receiver_profile_picture}`} alt="" />
                          </div>
                          <div className="list-card-item-text">
                            <span>{c.user_1.first_name}</span>
                            {uid != c?.latest_message.sender_id && !c?.latest_message.read ?
                              <p><strong>{c.user_1.id == c.latest_message.sender_id ? c.user_1.first_name : c.user_0.first_name}: {!c.latest_message.attachments ?
                                c.latest_message.message : c.latest_message.attachments[0].file_type.startsWith('image/') ? 'Sent an image' :
                                  c.latest_message.attachments[0].file_type.startsWith('video/') ? 'Sent a video' : 'Sent an attachment'}</strong>

                              </p>
                              :
                              <p>{c.user_1.id == c.latest_message.sender_id ? c.user_1.first_name : c.user_0.first_name}: {!c.latest_message.attachments ?
                                c.latest_message.message : c.latest_message.attachments[0].file_type.startsWith('image/') ? 'Sent an image' :
                                  c.latest_message.attachments[0].file_type.startsWith('video/') ? 'Sent a video' : 'Sent an attachment'}</p>
                            }
                          </div>
                        </div>
                        <div className="list-card-item-time-message">

                          {uid != c.latest_message.sender_id && !c.latest_message.read &&
                            <span>
                              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="7" cy="7" r="7" fill="#FF4646" />
                              </svg>
                            </span>
                          }
                          <span className="message-time">
                            {timeAgo.format(new Date(c.latest_message.created_at.replace(" ", "T")), 'twitter-now')}

                          </span>
                        </div>
                      </div>
                    </div>
                  )
                }
                else return (
                  <div key={c.id} onClick={() => viewConversation(c.id, c.user_0.id, c.user_1.id)} className="list-card-items">
                    <div className="list-card-item">
                      <div className="left">
                        <div className="list-card-item-image">
                          <img src={`${storageBaseUrl}${c.receiver_profile_picture}`} alt="" />
                        </div>
                        <div className="list-card-item-text">
                          <span>{c.user_0.first_name}</span>
                          {uid != c.latest_message.sender_id && !c.latest_message.read ?
                            <p><strong>{c.user_0.id == c.latest_message.sender_id ? c.user_0.first_name : c.user_1.first_name}:
                              {!c.latest_message.attachments ? c.latest_message.message : c.latest_message.attachments[0].file_type.startsWith('image/') ?
                                'Sent an image' : c.latest_message.attachments[0].file_type.startsWith('video/') ? 'Sent a video' : 'Sent an attachment'}</strong></p>
                            :
                            <p>{c.user_0.id == c.latest_message.sender_id ? c.user_0.first_name : c.user_1.first_name}: {!c.latest_message.attachments ?
                              c.latest_message.message : c.latest_message.attachments[0].file_type.startsWith('image/') ? 'Sent an image' :
                                c.latest_message.attachments[0].file_type.startsWith('video/') ? 'Sent a video' : 'Sent an attachment'}</p>
                          }
                        </div>
                      </div>

                      <div className="list-card-item-time-message">
                        {uid != c.latest_message.sender_id && !c.latest_message.read &&
                          <span>
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="7" cy="7" r="7" fill="#FF4646" />
                            </svg>
                          </span>
                        }
                        <span className="message-time">
                          {timeAgo.format(new Date(c.latest_message.created_at.replace(" ", "T")), 'twitter-now')}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })
          }
        </div>
      </div>
      <div className="recommended">
      </div>
    </div>
  )
}

export default Messages;