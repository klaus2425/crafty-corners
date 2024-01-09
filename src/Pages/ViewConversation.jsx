import { useParams } from 'react-router-dom'

const ViewConversation = (props) => {

  const id = useParams(); 
 

  return (
    <div className="authenticated-container">
      <div className="feed">
        <div className='section-header'>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21H16.5C17.8978 21 18.5967 21 19.1481 20.7716C19.8831 20.4672 20.4672 19.8831 20.7716 19.1481C21 18.5967 21 17.8978 21 16.5V12C21 7.02944 16.9706 3 12 3ZM8 11C8 10.4477 8.44772 10 9 10H15C15.5523 10 16 10.4477 16 11C16 11.5523 15.5523 12 15 12H9C8.44772 12 8 11.5523 8 11ZM11 15C11 14.4477 11.4477 14 12 14H15C15.5523 14 16 14.4477 16 15C16 15.5523 15.5523 16 15 16H12C11.4477 16 11 15.5523 11 15Z" fill="#222222"/>
          </svg>
          <h3>Messages</h3>
        </div>
        <div className='conversation-card'>
          <div className="conversation-name">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M4 8L3.64645 8.35355L3.29289 8L3.64645 7.64645L4 8ZM9 19.5C8.72386 19.5 8.5 19.2761 8.5 19C8.5 18.7239 8.72386 18.5 9 18.5L9 19.5ZM8.64645 13.3536L3.64645 8.35355L4.35355 7.64645L9.35355 12.6464L8.64645 13.3536ZM3.64645 7.64645L8.64645 2.64645L9.35355 3.35355L4.35355 8.35355L3.64645 7.64645ZM4 7.5L14.5 7.5L14.5 8.5L4 8.5L4 7.5ZM14.5 19.5L9 19.5L9 18.5L14.5 18.5L14.5 19.5ZM20.5 13.5C20.5 16.8137 17.8137 19.5 14.5 19.5L14.5 18.5C17.2614 18.5 19.5 16.2614 19.5 13.5L20.5 13.5ZM14.5 7.5C17.8137 7.5 20.5 10.1863 20.5 13.5L19.5 13.5C19.5 10.7386 17.2614 8.5 14.5 8.5L14.5 7.5Z" fill="#222222"/>
            </svg>
            <div className='c-name-type'>
              <span className='c-username'>R. Octavo</span>
              <span>Hobbyist</span>
            </div>
          </div>
          <div className="conversation-container">
            <div className="conversation-item-sender">
              <img className='chat-img' src="/kafka.jpg" alt="" />
              <span className="chat">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, eaque, expedita dicta accusamus fugit, ipsum eligendi minima officiis veritatis iste numquam nulla inventore alias quaerat similique animi illum quia deserunt!</span>
              <span className='chat-timestamp'>12:00</span>
            </div>
            <div className="conversation-item-user">
              <img className='chat-img' src="/kafka.jpg" alt="" />
              <span className="chat">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, eaque, expedita dicta accusamus fugit, ipsum eligendi minima officiis veritatis iste numquam nulla inventore alias quaerat similique animi illum quia deserunt!</span>
              <span className='chat-timestamp'>12:00</span>
            </div>
          </div>
          <div>
            <div className="textbox">
              <input type="text" />
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