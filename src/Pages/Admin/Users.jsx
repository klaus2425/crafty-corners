import { useEffect, useState } from 'react'
import axiosClient from "../../axios-client";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';


const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const userCount = users.length;
    const storageBaseUrl = import.meta.env.VITE_API_STORAGE_URL;

    useEffect(() => {
        getUsers();
    }, [])

    const onDeleteClick = user => {
      console.log(user.id);
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          axiosClient.delete(`/users/${user.id}`)
          .then(() => {
            getUsers();
          })
          Swal.fire({
            title: "Deleted!",
            text: "User has been deleted",
            icon: "success"
          });
        }
      });


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
                            <span><img src={storageBaseUrl+u.profile_picture} alt="" /></span>
                            <span><strong>Full Name: <br/> </strong>{`${u.first_name} ${u.middle_name} ${u.last_name}  `} </span>
                            <span><strong>Username:  <br/></strong>{u.user_name}</span>
                            <span><strong>Email:  <br/></strong>{u.email}</span>
                            <span><strong>Date Created:  <br/></strong>{u.created_at}</span>
                        </div>
                        <div className="buttons-community">
                            <Link to={'/edit-user/' + u.id} className="orange-button">View User</Link>
                            <button className="red-button" onClick={ev => onDeleteClick(u)}>Delete User</button>
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