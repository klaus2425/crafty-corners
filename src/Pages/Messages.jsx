import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../axios-client";

const Messages = () => {
  const navigate = useNavigate();
  const [conversations, setConversations] = useState();
  const viewConversation = (id) => {
    navigate(`/conversation/${id}`);
  }

  const getConversations = () => {
    axiosClient.get('chat/conversations')
      .then(res => {
        console.log(res.data.conversations);
        setConversations(res.data.conversations);
      });
  }

  useEffect(() => {
    getConversations()
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
            <input className="search" type="text" placeholder="Search for Conversations" />
            <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
              <circle cx="15.583" cy="15.5833" r="8.5" stroke="#677186" strokeWidth="1.41667" />
              <path d="M15.583 11.3333C15.0249 11.3333 14.4722 11.4432 13.9566 11.6568C13.441 11.8704 12.9725 12.1835 12.5778 12.5781C12.1832 12.9728 11.8701 13.4413 11.6565 13.9569C11.4429 14.4725 11.333 15.0252 11.333 15.5833" stroke="#677186" strokeWidth="1.41667" strokeLinecap="round" />
              <path d="M28.333 28.3333L24.083 24.0833" stroke="#677186" strokeWidth="1.41667" strokeLinecap="round" />
            </svg>
          </div>

          {
            conversations.map(conversation => {
              return (
                <div onClick={() => viewConversation(14)} className="list-card-items">
                  <div className="list-card-item">
                    <div className="list-card-item-image">
                      <img src="/Jaycie.png" alt="" />
                    </div>
                    <div className="list-card-item-text">
                      <span>Jaycie</span>
                      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat aliquam quisquam, deserunt ab vitae, eius nesciunt alias quia quo a, fuga corporis praesentium debitis quas deleniti soluta assumenda temporibus et.</p>
                    </div>
                    <div className="list-card-item-time">
                      <span>2h</span>
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