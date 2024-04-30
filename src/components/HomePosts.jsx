
import { useInfiniteQuery } from '@tanstack/react-query';
import Loading from '../components/utils/Loading';
import Post from '../components/Post';
import InfiniteScroll from 'react-infinite-scroll-component';
import axiosClient from '../axios-client';

const HomePosts = () => {
  const getUserPosts = async (pageParam) => {
    const fetchedData = await axiosClient.get(`/homepage-post?page=${pageParam}`)
    return { ...fetchedData.data, prevPage: pageParam };
  }

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: ({ pageParam }) => getUserPosts(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.meta.current_page + 1 > lastPage.meta.last_page) {
        return null;
      }
      return lastPage.meta.current_page + 1
    },
    keepPreviousData: true,
  })


  const fetchedPosts = data?.pages.reduce((acc, page) => {
    return [...acc, ...page.data];
  }, []);
  
  return (
    <>
      {
        fetchedPosts ?
          <InfiniteScroll
            scrollableTarget='feed'
            dataLength={fetchedPosts.length}
            next={fetchNextPage}
            hasMore={hasNextPage}
            loader={<Loading />}
            endMessage={
              <div style={{ textAlign: 'center' }}>
                <h2>End of Feed</h2>
              </div>
            }>
            {
              fetchedPosts.map((post) => (
                <Post key={post.id} post={post} community={post.community} />
              ))
            }
          </InfiniteScroll>
          :
          <Loading />
      }
    </>
  )
}

export default HomePosts;