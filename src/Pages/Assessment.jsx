import { useQuery, useQueryClient } from "@tanstack/react-query";
import axiosClient from "../axios-client";
import Loading from "../components/utils/Loading";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Assessment = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const getCommunites = async () => {
    const fetchedData = await axiosClient.get('/communities');
    return fetchedData.data;
  }

  const { data } = useQuery({
    queryKey: ['communities'],
    queryFn: getCommunites,
  })

  const handleProceed = () => {
    axiosClient.post('/done-assessment')
    .then(() => {
      queryClient.refetchQueries('communities').then(() => {
        navigate('/')
        toast('Assessment success', {
          duration: 1500,
          position: "bottom-center",
          icon: "✅",
          style: {
            borderRadius: "100px",
            border: 0,
            boxShadow: "0 0px 20px rgb(0 0 0 / 0.1)",
          }
        })
      })
    })
  }

  console.log(data);

  return (
    <div className="pre-assessment-container">
      <Toaster />
      <h2>Here are some communities that might interest you...</h2>
      <div className="card">

        {
          data ?
            data.map((community) => (
              <div className="community-assmnt-card">
                {community.name}
              </div>
            ))


            :

            <Loading />
        }

      </div>
      <div className="button-container">
        <div onClick={handleProceed} className="purple-button"><strong>Proceed to Home</strong></div>
      </div>
    </div>
  )
}


export default Assessment;