import { useEffect, useState, useRef } from "react";

const AddCommunities = () => {
    const [image, setImage] = useState();
    const handleChange = (ev) => {
        setImage(URL.createObjectURL(ev.target.files[0]));
    };

    const communityNameRef = useRef();
    const communityDescriptionRef = useRef();
    const communityImageRef = useRef();

    const onSubmit = (ev) => {
        ev.preventDefault();

        const formData = new FormData();
        formData.append('name', communityNameRef);
        formData.append('description', communityDescriptionRef);
        formData.append('image', communityImageRef)

    }

    return (
        <form encType="multipart/form-data" onSubmit={onSubmit}>
            <div className="add-community-container">
                <h1>Add a New Community</h1>
                <div className="community-form">
                    <div className="community-labels">
                        <label htmlFor="community-name">Community Name</label>
                        <label htmlFor="community-name">Community Description</label>
                    </div>
                    <div className="community-inputs">
                        <input ref={communityNameRef} type="text" name="community-name" id="community-name" />
                        <textarea ref={communityDescriptionRef}  name="community-name" rows={6} cols={20} />
                    </div>

                    <div>
                    <div className="community-right">
                        <div className="upload-picture">
                                    <img id='update-picture'src={image}/>
                                    <input ref={communityImageRef}id='upload-button' type="file" onChange={handleChange} />
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

export  default AddCommunities;