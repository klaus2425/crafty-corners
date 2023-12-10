import { useEffect, useState } from "react";
import { useParams} from "react-router-dom";
import axiosClient from "../../axios-client"
import Swal from 'sweetalert2';

const EditCommunity = () => {

    let {id} = useParams();
    const storageBaseUrl = import.meta.env.VITE_API_COMMUNITIES_URL;
    const[community, setCommunity] = useState({});
    const [imageChange, setImageChange] = useState(false);
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState();
    const [communityName, setCommunityName] = useState();

    const handleChange = (ev) => {
      setImage(URL.createObjectURL(ev.target.files[0]));
      setImageChange(true);
      setCommunity({...community, community_photo: ev.target.files[0]})
    };

    const getCommunity = () => {
      setLoading(true);
      axiosClient.get(`/communities/${id}`)
      .then(({ data }) => {
        setCommunity(data.data);
        setLoading(false);
        setImage(storageBaseUrl+data.data.community_photo)
        setCommunityName(data.data.name)
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.message);
      })
    }
    if(id) {
        useEffect(() => {
          getCommunity();
        }, []);
    }

    const onSubmit = (ev) => {
      ev.preventDefault();

      if(!imageChange && community.name !== communityName) {
          const formData = new FormData();
          formData.append("_method", "PUT");
          formData.append('name', community.name);
          formData.append('description', community.description);
          axiosClient.post(`communities/${id}`, formData)
          .then(() => {
              getCommunity();
          })
          .catch(err => {
              const response = err.response;
              if (response && response.status === 422) {
                Swal.fire({
                  title: "Error",
                  text: `${Object.values(response.data.errors)[0]}`,
                  icon: "warning"
                });
              }
          });
      }
      else if(imageChange && community.name === communityName) {
        const formData = new FormData();
        formData.append("_method", "PUT");
        formData.append('description', community.description);
        formData.append('community_photo', community.community_photo);

        axiosClient.post(`communities/${id}`, formData)
        .then(() => {
            getCommunity();
        })
        .catch(err => {
            const response = err.response;
            if (response && response.status === 422) {
              Swal.fire({
                title: "Error",
                text: `${Object.values(response.data.errors)[0]}`,
                icon: "warning"
              });
            }
        });

      } 
      else {
        const formData = new FormData();
        formData.append("_method", "PUT");
        for (const key in community) {
          formData.append(key, community[key]);
        }
        console.log(community);
        axiosClient.post(`communities/${community.id}`, formData)
        .then((res) => {
          console.log(res.data);
            getCommunity();
        })
        .catch(err => {
            const response = err.response;
            Swal.fire({
                title: "Error",
                text: `${Object.values(response.data.errors)[0]}`,
                icon: "warning"
              });
            setLoading(false);
            setImage(image);
        
        })
      }
    }

    return (
      <div>
          <form enctype="multipart/form-data" onSubmit={onSubmit}>
            <div className="add-community-container">
              <h1>Edit {communityName} Community</h1>
              <div className="community-form">
                  <div className="community-input-label">
                      <div className="community-labels">
                          <label htmlFor="community-name">Community Name</label>
                          <label htmlFor="community-name">Community Description</label>
                      </div>
                      <div className="community-inputs">
                          <input value={community.name} type="text" name="community-name" id="community-name" onChange={ev => setCommunity({...community, name: ev.target.value})} required/>
                          <textarea value={community.description}  name="community-name" onChange={ev => setCommunity({...community, description: ev.target.value})} rows={6} cols={20} required/>
                      </div>
                  </div>
                  <div>
                  <div className="community-right">
                      <div className="upload-picture">
                                  <img id='update-picture'src={image}/>
                                  <input id='upload-button' type="file" onChange={handleChange} />
                                  <label htmlFor='upload-button'>Upload File</label>
                                  <span className="edit-text">File size: maximum 2 MB</span>
                                  <span className="edit-text">File extension: .JPEG, .PNG, .JPG</span>
                      </div>
                  </div>
                  </div>
              </div>
              <button className="button">Submit</button>
            </div>
          </form>
      </div>
    )
}

export default EditCommunity;