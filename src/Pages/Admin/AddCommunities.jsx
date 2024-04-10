import { useState, useRef } from "react";
import axiosClient from "../../axios-client";
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
const AddCommunities = () => {
    const [image, setImage] = useState();
    const handleChange = (ev) => {
        setImage(URL.createObjectURL(ev.target.files[0]));
    };
    const navigate = useNavigate();
    const communityNameRef = useRef();
    const communityDescriptionRef = useRef();
    const communityImageRef = useRef();
    const communityTopicsRef = useRef();

    const onSubmit = (ev) => {
        ev.preventDefault();

        const formData = new FormData();
        formData.append('name', communityNameRef.current.value);
        formData.append('description', communityDescriptionRef.current.value);
        formData.append('community_photo', communityImageRef.current.files[0]);

        toast.promise(axiosClient.post('/communities', formData), {
            loading: 'Adding Community',
            success: () => {
                navigate('/admin-communities');
                return <b>Community Added</b>
            },
            error: (err) => {
                console.log('error');
                return `${Object.values(err.response.data.errors)[0]}`
            },
        },
            {
                duration: 3000,
                position: "bottom-center",
                style: {
                    borderRadius: "100px",
                    border: 0,
                    boxShadow: "0 0px 20px rgb(0 0 0 / 0.1)",
                }
            }
        )
    }

    return (
        <form encType="multipart/form-data" onSubmit={onSubmit}>
            <div className="add-community-container">
                <h1>Add a New Community</h1>
                <div className="community-form">
                    <div className="community-input-label">
                        <div className="community-labels">
                            <label style={{ marginBottom: '1.1rem' }} htmlFor="community-name">Community Name</label>
                            <label style={{ marginBottom: '6.87rem' }} htmlFor="community-name">Community Description</label>
                            <label htmlFor="community-name">Community Topics</label>
                        </div>
                        <div className="community-inputs">
                            <input ref={communityNameRef} type="text" name="community-name" id="community-name" required />
                            <textarea ref={communityDescriptionRef} name="community-name" rows={6} cols={20} required />
                            <textarea ref={communityTopicsRef} name="community-name" rows={6} cols={20} required />
                        </div>
                    </div>
                    <div>
                        <div className="community-right">
                            <div className="upload-picture">
                                <img id='update-picture' src={image} />
                                <input ref={communityImageRef} id='upload-button' type="file" onChange={handleChange} />
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
    )
}

export default AddCommunities;