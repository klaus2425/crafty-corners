import { useEffect, useState } from 'react'
import axiosClient from "../../axios-client";
import { Link } from "react-router-dom";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        getUsers();
    }, [])

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
      console.log(users);

    return ( 
        <div className='users-table'>
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
              <td colSpan="5" class="text-center">
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
                <td>
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