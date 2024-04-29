import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import axiosClient from "../../axios-client";
import Swal from 'sweetalert2'
import Loading from "../../components/utils/Loading";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";


const AdminCommunities = () => {
    const storageBaseUrl = import.meta.env.VITE_API_COMMUNITIES_URL;
    const fetchCommunities = async (pageParams) => {
        const fetchedData = await axiosClient.get(`/list/communities?page=${pageParams}`);
        return { ...fetchedData.data, prevPage: pageParams };
    }

    const { data, fetchNextPage, hasNextPage, refetch } = useInfiniteQuery({
        queryKey: ['admin-communities'],
        queryFn: ({ pageParam }) => fetchCommunities(pageParam),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            if (lastPage.meta.current_page + 1 > lastPage.meta.last_page) {
                return null;
            }
            return lastPage.meta.current_page + 1
        }
    });

    const fetchedCommunities = data?.pages.reduce((acc, page) => {
        return [...acc, page.data];
    }, [])


    const onDeleteClick = community => {
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
                axiosClient.delete(`/communities/${community.id}`)
                    .then(() => {
                        refetch()
                    })
                Swal.fire({
                    title: "Deleted!",
                    text: "Community has been deleted",
                    icon: "success"
                });
            }
        });

    }

    return (
        <div className="communities-container" >
            <div className="top-section">
                <Link className="add-community-button" to={'/add-communities'}><span><FontAwesomeIcon icon={faPlus} /></span> Add a Community</Link>
            </div>

            <div className="community-scroll" id="community-scroll">
                {fetchedCommunities ?
                    <InfiniteScroll
                        scrollableTarget='community-scroll'
                        dataLength={fetchedCommunities ? fetchedCommunities.length : 0}
                        next={fetchNextPage}
                        hasMore={hasNextPage}
                        loader={<Loading />}>
                        {fetchedCommunities?.map((community) =>
                            community.map(c => (
                                <div key={c.id} className="community-item">
                                    <div><img src={storageBaseUrl + c.community_photo} alt="" /></div>
                                    <div className="community-item-details" >
                                        <div className="community-details-top">
                                            <span><strong>Community Name: <br /> </strong>{c.name}</span>
                                            <span><strong>Description: <br /></strong>{c.description}</span>
                                            <span><strong>Members: <br /></strong>{c.members_count}</span>
                                        </div>
                                        <div className="buttons-community">
                                            <Link to={'/edit-community/' + c.id} className="orange-button">View Community</Link>
                                            <button className="red-button" onClick={() => onDeleteClick(c)}>Delete Community</button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </InfiniteScroll>
                    :
                    <Loading />
                }
            </div>

        </div>
    )
}

export default AdminCommunities;