import { useEffect, useState } from 'react'
import axiosClient from "../../axios-client";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2';


const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const userCount = users.length;
    useEffect(() => {
        getUsers();
    }, [])

    const onDeleteClick = user => {

        if (!window.confirm("Are you sure you want to delete this user?")) {
          return
        }
        axiosClient.delete(`/users/${user.id}`)
          .then(() => {
            getUsers()
          })
    }

    const getUsers = () => {
        setLoading(true)
        axiosClient.get('/users')
          .then(({ data }) => {
            setLoading(false)
            setUsers(data.data)
          })
          .catch(() => {
            setLoading(false)
          })
      }

    return ( 
<div className="communities-container">
        <div className="top-section">
          <div className='user-count'>Current Number of users: {userCount}</div>
        </div>
        <div className='users-table'>
        
        {loading &&
            <div className="loading-admin">Loading...</div>

        }

        {!loading &&
            
             users.map(u => (
                
                <div key={u.id} className="community-item">
                    <div className="community-item-details" >
                        <div className="community-details-top">
                            <span><strong>Title: <br/> </strong>{u.title} </span>
                            <span><strong>Author:  <br/></strong>{u.author}</span>
                            <span><strong>Description:  <br/></strong>{u.description}</span>
                        </div>
                        <div className="buttons-community">
                            <Link to={'/edit-article/' + u.id} className="orange-button">View Article</Link>
                            <button className="red-button" onClick={ev => onDeleteClick(u)}>Delete Article</button>
                        </div>
                        

                    </div>
                </div>
            ))
            

        }
        
        </div>
    </div>
    )


}

export default Users;