import { useInfiniteQuery } from '@tanstack/react-query';
import axiosClient from '../../axios-client';
import { Link } from 'react-router-dom';
import Loading from '../../components/utils/Loading';
import InfiniteScroll from 'react-infinite-scroll-component';

const ReportsArchived = () => {

  const getPosts = async (pageParams) => {
    const fetchedData = await axiosClient.get(`/deleted/posts?page=${pageParams}`)
    return { ...fetchedData.data, prevPage: pageParams };
  }
  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: ({ pageParam }) => getPosts(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.meta.current_page + 1 > lastPage.meta.last_page) {
        return null;
      }
      return lastPage.meta.current_page + 1
    }
  })

  console.log(data);
  const fetchedPosts = data?.pages.reduce((acc, page) => {
    return [...acc, page.data];
  }, [])
  return (
    <div className="communities-container">
      <div className="top-section">
        <h2>Archived Posts</h2>
      </div>
      <div className="users-table" id='users-table'>
        {
          fetchedPosts ?
            <InfiniteScroll
              scrollableTarget='users-table'
              dataLength={fetchedPosts ? fetchedPosts.length : 0}
              next={fetchNextPage}
              hasMore={hasNextPage}
              loader={<Loading />}>
              {
                fetchedPosts.map((post) => (
                  post.map(u => (
                    <div key={u.id} className="community-item">
                      <div className="community-item-details" >
                        <div className="community-details-top">
                          <span><strong>Post ID: <br /> </strong>{u.id} </span>

                          <span><strong>Post Title: <br /> </strong>{u.title} </span>
                          <span><strong>Community: <br /> </strong>{u.community_name} </span>

                          <span><strong>Posted by: <br /> </strong>{u?.user.first_name} {u?.user.middle_name} {u?.user.last_name} </span>
                        </div>
                        <div className="buttons-community">
                          <Link to={'/archived-post/' + u.id} className="orange-button">View Post</Link>
                        </div>
                      </div>
                    </div>
                  ))
                ))
              }

            </InfiniteScroll>
            :
            <Loading />

        }
        {/* {
          useReportedPosts.data ?
            useReportedPosts.data.map(u => (
              <div key={u.id} className="community-item">
                <div className="community-item-details" >
                  <div className="community-details-top">
                    <span><strong>Post ID: <br /> </strong>{u.id} </span>

                    <span><strong>Post Title: <br /> </strong>{u.title} </span>
                    <span><strong>Community: <br /> </strong>{u.community_name} </span>

                    <span><strong>Posted by: <br /> </strong>{u?.user.first_name} {u?.user.middle_name} {u?.user.last_name} </span>
                  </div>
                  <div className="buttons-community">
                    <Link to={'/archived-post/' + u.id} className="orange-button">View Post</Link>
                  </div>
                </div>
              </div>
            ))
            :
            null
        } */}
      </div>
    </div>
  )

}

export default ReportsArchived;