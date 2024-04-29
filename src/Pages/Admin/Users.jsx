import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import toast from "react-hot-toast";
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import axiosClient from "../../axios-client";
import Loading from '../../components/utils/Loading';

const Users = () => {

  const storageBaseUrl = import.meta.env.VITE_API_STORAGE_URL;
  const queryClient = useQueryClient();
  const [searchKey, setSearchKey] = useState('')

  const onDeleteClick = user => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will remove the user's access to their account",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then((result) => {
      if (result.isConfirmed) {
        axiosClient.post(`/deactivate/${user.id}`)
          .then(() => {
            toast.success('User has been deactivated')
            queryClient.invalidateQueries('deactivated-users');
            queryClient.invalidateQueries('admin-users');
          })
      }
    });
  }



  const fetchUsers = async (pageParams) => {
    const fetchedData = await axiosClient.get(`/users?page=${pageParams}`)
    return { ...fetchedData.data, prevPage: pageParams };
  }

  const { data, fetchNextPage, hasNextPage, } = useInfiniteQuery({
    queryKey: ['admin-users'],
    queryFn: ({ pageParam }) => fetchUsers(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.meta.current_page + 1 > lastPage.meta.last_page) {
        return null;
      }
      return lastPage.meta.current_page + 1
    }
  })

  const fetchedUsers = data?.pages.reduce((acc, page) => {
    return [...acc, page.data];
  }, [])


  return (
    <div className="communities-container">
      <div className="top-section">
        <div className='user-count'>Current number of users: {data?.pages[0].meta.total - 1}</div>
      </div>
      <div className="filters">
        <span><strong>Filters:</strong></span>
        <input onChange={(ev) => setSearchKey(ev.target.value)} className='student-id-search' type="text" placeholder='Search by Student ID' />
      </div>
      <div className='users-table' id='users-table'>
        {
          fetchedUsers ?
            <InfiniteScroll
              scrollableTarget='users-table'
              dataLength={fetchedUsers ? fetchedUsers.length : 0}
              next={fetchNextPage}
              hasMore={hasNextPage}
              loader={<Loading />}>
              {
                fetchedUsers.map((users) => (
                  users.filter(u => {
                    if (u.student_id.includes(searchKey)) {
                      return u
                    } 
                    else if (searchKey === '') {
                      return u
                    }
                  }).map(u => {
                    return u.type != 'admin' &&
                      <div key={u.id} className="community-item">
                        <div className="community-item-details" >
                          <div className="community-details-top">
                            <span id='user-img-span'><img src={storageBaseUrl + u.profile_picture} /></span>
                            <span style={{ wordBreak: 'break-word' }}><strong>Full Name: <br /> </strong>{`${u.first_name} ${u.middle_name} ${u.last_name}  `} </span>
                            <span><strong>Username:  <br /></strong>{u.user_name}</span>
                            <span><strong>Email:  <br /></strong>{u.email}</span>
                            <span><strong>Date Created:  <br /></strong>{u.created_at}</span>
                          </div>
                          <div className="buttons-community">
                            <Link to={'/view-user/' + u.id} className="orange-button">View User</Link>
                            <button className="red-button" onClick={ev => onDeleteClick(u)}>Deactivate User</button>
                          </div>
                        </div>
                      </div>
                  }
                  )
                ))
              }
            </InfiniteScroll>
            :
            <Loading />
        }
      </div>
    </div>
  )


}

export default Users;