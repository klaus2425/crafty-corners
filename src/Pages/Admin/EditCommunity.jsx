import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../../axios-client"
import Swal from 'sweetalert2';
import Loading from "../../components/utils/Loading";
import toast from 'react-hot-toast';
const EditCommunity = () => {

  let { id } = useParams();
  const storageBaseUrl = import.meta.env.VITE_API_COMMUNITIES_URL;
  const [community, setCommunity] = useState({});
  const [imageChange, setImageChange] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState();
  const [communityName, setCommunityName] = useState();
  const [topics, setTopics] = useState([]);

  const handleTextareaChange = (event) => {
    const newValue = event.target.value;
    // Assuming you want to store each line of text as a separate topic
    const newTopics = newValue.split('\n');
    setTopics(newTopics);
  }

  const handleChange = (ev) => {
    setImage(URL.createObjectURL(ev.target.files[0]));
    setImageChange(true);
    setCommunity({ ...community, community_photo: ev.target.files[0] })
  };

  const getCommunity = () => {
    setLoading(true);
    axiosClient.get(`/communities/${id}`)
      .then(({ data }) => {
        setCommunity(data.data);
        setLoading(false);
        setImage(storageBaseUrl + data.data.community_photo);
        setCommunityName(data.data.name);
      })
      .catch((err) => {
        setLoading(false);
        Swal.fire({
          title: "Error",
          text: `${Object.values(err.response.data.errors)[0]}`,
          icon: "warning"
        });
      })
    axiosClient.get(`/community/${id}/subtopics`)
      .then(({ data }) => {
        setTopics(data)
        console.log(data);
      })
  }


  if (id) {
    useEffect(() => {
      getCommunity();
    }, []);
  }

  const onSubmit = (ev) => {
    ev.preventDefault();

    if (!imageChange) {
      const formData = new FormData();
      formData.append("_method", "PUT");
      formData.append('name', community.name);
      formData.append('description', community.description);

      axiosClient.post(`communities/${id}`, formData)
        .then(() => {
          setCommunityName(community.name);
          toast('Changes Applied', {
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
    else if (imageChange) {

      const formData = new FormData();
      formData.append("_method", "PUT");
      formData.append('name', community.name);
      formData.append('description', community.description);
      formData.append('community_photo', community.community_photo);
      formData.append('subtopics', topics);
      axiosClient.post(`communities/${id}`, formData)
        .then(() => {
          setCommunityName(community.name);
          setImageChange(false);
          toast('Changes Applied', {
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
      Swal.fire({
        title: "No Changes Applied",
        icon: "info"
      });
    }
  }

  return (
    <div>
      {loading ? (
        <div className="loading-container">
          <Loading />
        </div>
      ) :
        <div className="add-community-container">
          <form encType="multipart/form-data" onSubmit={onSubmit}>
            <h1>Edit {communityName} Community</h1>
            <div className="community-form">
              <div className="community-input-label">
                <div className="community-labels">
                  <label style={{ marginBottom: '1.1rem' }} htmlFor="community-name">Community Name</label>
                  <label style={{ marginBottom: '6.87rem' }} htmlFor="community-name">Community Description</label>
                  <label htmlFor="community-name">Community Topics</label>

                </div>
                <div className="community-inputs">
                  <input value={community.name} type="text" name="community-name" id="community-name" onChange={ev => setCommunity({ ...community, name: ev.target.value })} required />
                  <textarea value={community.description} name="community-name" onChange={ev => setCommunity({ ...community, description: ev.target.value })} rows={6} cols={20} required />
                  <textarea onChange={(ev) => handleTextareaChange(ev)} rows={6} cols={20} required />

                </div>
              </div>
              <div>
                <div className="community-right">
                  <div className="upload-picture">
                    <img id='update-picture' src={image} />
                    <input id='upload-button' type="file" onChange={handleChange} />
                    <label htmlFor='upload-button'>Upload File</label>
                    <span className="edit-text">File size: maximum 2 MB</span>
                    <span className="edit-text">File extension: .JPEG, .PNG, .JPG</span>
                  </div>
                </div>
              </div>
            </div>
            <button className="button">Submit</button>
          </form>
        </div>
      }
    </div>
  )
}

export default EditCommunity;