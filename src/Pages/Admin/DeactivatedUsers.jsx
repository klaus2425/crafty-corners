import axiosClient from "../../axios-client";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import Loading from '../../components/utils/Loading';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import InfiniteScroll from 'react-infinite-scroll-component';
import toast from "react-hot-toast";

const DeactivatedUsers = () => {

  const storageBaseUrl = import.meta.env.VITE_API_STORAGE_URL;
  const queryClient = useQueryClient();


  const onActivateClick = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will give the user access to their account",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then((result) => {
      if (result.isConfirmed) {
        axiosClient.post(`/activate/${user.id}`)
          .then(() => {
            toast.success('User has been activated')
            queryClient.invalidateQueries({queryKey: ['deactivated-users']});
            queryClient.invalidateQueries({queryKey: ['admin-users']});
          })
      }
    });
  }



  const fetchUsers = async (pageParams) => {
    const fetchedData = await axiosClient.get(`/deactivated-users?page=${pageParams}`)
    return { ...fetchedData.data, prevPage: pageParams };
  }

  const { data, fetchNextPage, hasNextPage, refetch } = useInfiniteQuery({
    queryKey: ['deactivated-users'],
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
        <div className='user-count'>Current number of deactivated users: {data?.pages[0].meta.total}</div>
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
                  users.map(u => {
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
                            <button className="red-button" onClick={() => onActivateClick(u)}>Activate User</button>
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

export default DeactivatedUsers;