import { useEffect, useState } from "react";
import { useParams} from "react-router-dom";
import axiosClient from "../../axios-client"

const EditCommunity = () => {

    let {id} = useParams();
    const storageBaseUrl = import.meta.env.VITE_API_COMMUNITY_URL;
    const[community, setCommunity] = useState({});
    const [imageChange, setImageChange] = useState(false);
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState();

    if(id) {
        useEffect(() => {
            setLoading(true);
            axiosClient.get(`/communities/${id}`)
                  .then(({ data }) => {
                    setCommunity(data);
                    setLoading(false);
                  })
                  .catch((err) => {
                    setLoading(false);
                    console.log(err.message);
                  })
        }, []);
    }


    return (
        <div></div>
    )
}

export default EditCommunity;