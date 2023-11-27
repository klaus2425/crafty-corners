import { useState } from 'react'

const Users = () => {

    const [loading, setLoading] = useState(false);
    
    return ( 
        <div className='users-table'>
            <table>
          <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Create Date</th>
            <th>Actions</th>
          </tr>
          </thead>
          
        </table>
        </div>
    )
}

export default Users;