import { faPencil } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react';

const EditProfile =  () => {

    const [image, setImage] = useState();
    if (!image) {setImage('/avatar.jpg')}
    const handleChange = (e) => {
        setImage(URL.createObjectURL(e.target.files[0]));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(image);
    }

    return (
        <div className="authenticated-container">
            <div className="feed">
            <div className='section-header'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none">
                        <path d="M28.7693 29.8187C28.1046 27.9581 26.6399 26.3141 24.6024 25.1415C22.5649 23.9689 20.0684 23.3333 17.5002 23.3333C14.9319 23.3333 12.4355 23.9689 10.3979 25.1415C8.36043 26.3141 6.89574 27.9581 6.23103 29.8187" stroke="#677186" stroke-width="2.91667" stroke-linecap="round"/>
                        <circle cx="17.4998" cy="11.6667" r="5.83333" stroke="#677186" stroke-width="2.91667" stroke-linecap="round"/>
                    </svg>
                    <h3>Edit Profile</h3>
            </div>
                <div className="card">
                    <form>
                        <div className="edit-card">
                            <div className='edit-header'>
                                <FontAwesomeIcon icon={faPencil} />
                                <h1>Update your Profile</h1>
                            </div>
                            <div className="upload-picture">
                                <img id='update-picture'src={image}/>
                                <input id='upload-button' type="file" onChange={handleChange} />
                            </div>

                                <div className="input-row-container">
                                    <div className="field-holder">
                                        <input type="text" required/>
                                        <label >Username</label>
                                    </div>
                                    <div className="field-holder">
                                        <input  type="password" required/>
                                        <label className="label">Password</label>
                                    </div>
                                    <div className="field-holder">
                                        <input  type="text" required/>
                                        <label className="label">Email Address</label>
                                    </div>
                                </div>
                                <div className="input-row-container"> 
                                    <div className="field-holder">
                                        <input  type="text" required/>
                                        <label>First Name</label>
                                    </div>
                                    <div className="field-holder">
                                        <input  type="text" required/>
                                        <label>Middle Name</label>
                                    </div>
                                    <div className="field-holder">
                                        <input  type="text" required/>
                                        <label>Last Name</label>
                                    </div>
                                </div>
                                <div className="field-holder">
                                        <input id='input-birthday' type="date" />
                                        <label>Birthday</label>
                                </div>
                                <div className="field-holder">
                                        <input id="street-address" type="text" required/>
                                        <label>Street Address</label>
                                </div>
                                <div className="input-row-container">
                                    <div className="field-holder">
                                            <input type="text" required/>
                                            <label>Municipality</label>
                                    </div>
                                    <div className="field-holder">
                                            <input type="text" required/>
                                            <label>Province</label>
                                    </div>
                                </div>
                        </div>
                        <div onSubmit={handleSubmit} className="button-section">
                            <button>Update</button>
                        </div>
                       
                    </form>
                </div>
            </div>
            <div className="recommended">
                 section
            </div>
        </div>
    )
}

export default EditProfile;