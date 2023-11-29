import { useEffect, useState } from "react";

const AddCommunities = () => {
    const [image, setImage] = useState();
    const handleChange = (ev) => {
        setImage(URL.createObjectURL(ev.target.files[0]));
        setImageChange(true);
        setUser({...user, profile_picture: ev.target.files[0]})
    };

    return (
        <div className="add-community-container">
            <h1>Add a New Community</h1>
            <div className="community-form">
                <div className="community-labels">
                    <label htmlFor="community-name">Community Name</label>
                    <label htmlFor="community-name">Community Description</label>
                </div>
                <div className="community-inputs">
                    <input type="text" name="community-name" id="community-name" />
                    <textarea  name="community-name" rows={6} cols={20} />
                </div>

                <div>
                <div className="community-right">
                    <div className="upload-picture">
                                <img id='update-picture'src={image}/>
                                <input id='upload-button' type="file" onChange={handleChange} />
                                <label htmlFor='upload-button'>Upload File</label>
                                <span className="edit-text">File size: maximum 1 MB</span>
                                <span className="edit-text">File extension: .JPEG, .PNG, .JPG</span>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export  default AddCommunities;