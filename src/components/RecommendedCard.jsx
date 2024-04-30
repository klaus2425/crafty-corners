import { useQuery } from '@tanstack/react-query';
import axiosClient from '../axios-client';
import RecommendedCommunities from '../components/RecommendedCommunities';
import Loading from '../components/utils/Loading';
const RecommendedCard = () => {
  const useRecommended = useQuery({
    queryKey: ['recommended-communities'],
    queryFn: () => axiosClient.get('/recommend-communities')
      .then(({ data }) => (data.recommended_communities)),
    refetchOnMount: false,
  })

  return (
    <>
      {
        !useRecommended.isLoading ?
          useRecommended.data?.length > 0 ?
            useRecommended.data.map((community, index) => (
              <RecommendedCommunities key={index} index={index + 1} communityName={community.name}
                communityMemberCount={community.members_count} communityId={community.id}
                communityIcon={community.community_photo} userId={community.user_id} />
            ))
            :
            <div className='rec-community-empty'>
              No recommended communities
            </div>
          : <Loading />
      }
    </>
  )

}

export default RecommendedCard;