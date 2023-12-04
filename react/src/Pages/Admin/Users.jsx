import { useEffect, useState } from 'react'
import axiosClient from "../../axios-client";
import { Link } from "react-router-dom";
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
        <div className='users-table'>
        <div className='user-count'>Current Number of users: {userCount}</div>
        <table>
          <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Birthday</th>
            <th>Address</th>
            <th>Create Date</th>
            <th>Actions</th>
          </tr>
          </thead>
          {loading &&
            <tbody>
            <tr>
              <td >
                Loading...
              </td>
            </tr>
            </tbody>
          }

          {!loading &&
            <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{`${u.first_name} ${u.middle_name} ${u.last_name}`}</td>
                <td>{u.email}</td>
                <td>{u.birthday}</td>
                <td>{`${u.street_address}, ${u.municipality}, ${u.province}`}</td>
                <td>{u.created_at}</td>
                <td className='table-actions'>
                  <Link className="btn-edit" to={'/users/' + u.id}>Edit</Link>
                  &nbsp;
                  <button className="btn-delete" onClick={ev => onDeleteClick(u)}>Delete</button>
                </td>
              </tr>
            ))}
            </tbody>
          }
        </table>
        </div>
    )


}

export default Users;