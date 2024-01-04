
const Messages = () => {
  return (
    <div className="authenticated-container">
            <div className="feed">
                <div className='section-header'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M3.87868 5.87868C3 6.75736 3 8.17157 3 11V13C3 15.8284 3 17.2426 3.87868 18.1213C4.75736 19 6.17157 19 9 19H15C17.8284 19 19.2426 19 20.1213 18.1213C21 17.2426 21 15.8284 21 13V11C21 8.17157 21 6.75736 20.1213 5.87868C19.2426 5 17.8284 5 15 5H9C6.17157 5 4.75736 5 3.87868 5.87868ZM6.5547 8.16795C6.09517 7.8616 5.4743 7.98577 5.16795 8.4453C4.8616 8.90483 4.98577 9.5257 5.4453 9.83205L10.8906 13.4622C11.5624 13.9101 12.4376 13.9101 13.1094 13.4622L18.5547 9.83205C19.0142 9.5257 19.1384 8.90483 18.8321 8.4453C18.5257 7.98577 17.9048 7.8616 17.4453 8.16795L12 11.7982L6.5547 8.16795Z" fill="#222222"/>
                  </svg>
                    <h3>Messages</h3>
                </div>
                <div className="messages-card">
                   <div className="conversation-search">
                      <input className="search" type="text" placeholder="Search for conversations" />
                      <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
                        <circle cx="15.583" cy="15.5833" r="8.5" stroke="#677186" stroke-width="1.41667"/>
                        <path d="M15.583 11.3333C15.0249 11.3333 14.4722 11.4432 13.9566 11.6568C13.441 11.8704 12.9725 12.1835 12.5778 12.5781C12.1832 12.9728 11.8701 13.4413 11.6565 13.9569C11.4429 14.4725 11.333 15.0252 11.333 15.5833" stroke="#677186" stroke-width="1.41667" stroke-linecap="round"/>
                        <path d="M28.333 28.3333L24.083 24.0833" stroke="#677186" stroke-width="1.41667" stroke-linecap="round"/>
                      </svg>
                   </div>

                    <div className="conversations">
                      <div className="conversation">
                        <div className="conversation-image">
                          <img src="/Jaycie.png" alt="" />
                        </div>
                        <div className="conversation-text">
                          <text>Jaycie</text>
                          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat aliquam quisquam, deserunt ab vitae, eius nesciunt alias quia quo a, fuga corporis praesentium debitis quas deleniti soluta assumenda temporibus et.</p>
                        </div>
                        <div className="conversation-time">
                          <text>2h</text>
                        </div>
                      </div>
                    </div>

                    <div className="conversations">
                      <div className="conversation">
                        <div className="conversation-image">
                          <img src="/kafka.jpg" alt="" />
                        </div>
                        <div className="conversation-text">
                          <text>Kafka</text>
                          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat aliquam quisquam, deserunt ab vitae, eius nesciunt alias quia quo a, fuga corporis praesentium debitis quas deleniti soluta assumenda temporibus et.</p>
                        </div>
                        <div className="conversation-time">
                          <text>4h</text>
                        </div>
                      </div>
                    </div>
                </div>
               
            </div>
            <div className="recommended">
            </div>
        </div>
  )
}

export default Messages;