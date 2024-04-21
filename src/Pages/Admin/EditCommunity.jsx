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
  const [displayTopics, setDisplayTopics] = useState([]);

  const handleTextareaChange = (event) => {
    const newValue = event.target.value;
    const newTopics = newValue.split(',');
    setTopics(newTopics);
  }

  const handleDelete = (topic, index) => {
    const formData = new FormData()
    formData.append('subtopics', `${[topic]}`)
    axiosClient.delete(`/community/${id}/subtopic`, { data: { "subtopics": topic } })
      .then((res) => {
        toast.success('Topic removed')
      });
    getTopics();
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

  }
  const getTopics = () => {
    axiosClient.get(`/community/${id}/subtopics`)
      .then(({ data }) => {
        setTopics(data.subtopics)
        setDisplayTopics(data.subtopics)
      })
  }

  if (id) {
    useEffect(() => {
      getCommunity();
      getTopics();
    }, []);
  }

  const onSubmit = (ev) => {
    ev.preventDefault();

    if (!imageChange) {
      const formData = new FormData();
      formData.append("_method", "PUT");
      formData.append('name', community.name);
      formData.append('description', community.description);

      topics.map((topic, index) => {
        formData.append(`subtopics[${index}]`, topic)
      })

      toast.promise(axiosClient.post(`communities/${id}`, formData), {
        loading: 'Updating community information',
        success: () => {
          getTopics();
          return <b>Community Updated</b>
        },
        error: (err) => {
          return `${err.response.data.message}`
        },
      },

      )
    }
    else if (imageChange) {

      const formData = new FormData();
      formData.append("_method", "PUT");
      formData.append('name', community.name);
      formData.append('description', community.description);
      formData.append('subtopics', topics);
      formData.append('community_photo', community.community_photo);
      toast.promise(axiosClient.post(`communities/${id}`, formData), {
        loading: 'Updating community information',
        success: () => {
          getTopics();
          return <b>Community Updated</b>
        },
        error: (err) => {
          return `${err.response.data.message}`
        },
      },
      )
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

                <div className="community-inputs">
                  <div className="community-inputs__element">
                    <label>Community Name</label>
                    <input value={community.name} type="text" name="community-name" id="community-name" onChange={ev => setCommunity({ ...community, name: ev.target.value })} required />
                  </div>
                  <div className="community-inputs__element">
                    <label>Community Description</label>
                    <textarea value={community.description} name="community-name" onChange={ev => setCommunity({ ...community, description: ev.target.value })} rows={6} cols={20} required />
                  </div>
                  <div className="community-inputs__element">
                    <label>Add topics for community<br />(Use comma to separate topics)</label>
                    <input onChange={(ev) => handleTextareaChange(ev)} required />
                  </div>
                  <div><strong>Press topic to delete</strong></div>

                  <div className="topic-container">
                    {
                      displayTopics.map((topic, index) => (
                        <span onClick={() => handleDelete(topic, index)} className="topic-container__topic" key={index}>{topic}</span>
                      ))
                    }
                  </div>

                </div>
              </div>
              <div className="community-pic-container">
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
            <button className="community-form__button">Submit</button>
          </form>
        </div>
      }
    </div>
  )
}

export default EditCommunity;