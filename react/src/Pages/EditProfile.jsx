import { faPencil } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axiosClient from "../axios-client";
import { useState, useEffect } from 'react';
import { useStateContext } from '../context/ContextProvider'

const EditProfile =  () => {
    const [image, setImage] = useState();
    const storageBaseUrl = import.meta.env.VITE_API_STORAGE_URL;
    if (!image) {setImage('/avatar.jpg')}
    const handleChange = (ev) => {
        setImage(URL.createObjectURL(ev.target.files[0]));
        setCurrentUser({...currentUser, profile_picture: ev.target.files[0]})
        
    };
    const handleSubmit = (ev) => {
        ev.preventDefault();
        console.log(currentUser);
        axiosClient.put(`/users/${currentUser.id}`, currentUser)
        .then(() => {
            console.log('Successful Update');
            navigate('/EditProfile');
        })
        .catch(err => {
            const response = err.response;
            if (response && response.status === 422) {
              console.log(response.data.errors);
            }
          })
       
    }
    const [currentUser, setCurrentUser] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axiosClient.get('/user')
        .then(({data}) => {
            setLoading(false);
            setCurrentUser(data);
            setImage(storageBaseUrl+data.profile_picture)

        })
        .catch(() =>{
            setLoading(false);
        });
    }, []);

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
                    {loading && (
                        <div className="loading">
                            Loading...
                        </div>
                    )}

                    {!loading && (
                    <form>
                        <div className="edit-card">
                            <div className='edit-header'>
                                <FontAwesomeIcon icon={faPencil} />
                                <h1>Update your Profile</h1>
                            </div>
                            <div className="upload-picture">
                                <img id='update-picture'src={image}/>
                                <input id='upload-button' type="file" onChange={handleChange} />
                                <label for='upload-button'>Upload File</label>
                            </div>


                                <div className="input-row-container"> 
                                    <div className="field-holder">
                                        <input type="text" value={currentUser.first_name}  onChange={ev => setCurrentUser({...currentUser, first_name: ev.target.value})} required/>
                                        <label>First Name</label>
                                    </div>
                                    <div className="field-holder">
                                        <input  type="text" value={currentUser.middle_name} onChange={ev => setCurrentUser({...currentUser, middle_name: ev.target.value})} required/>
                                        <label>Middle Name</label>
                                    </div>
                                    <div className="field-holder">
                                        <input  type="text" value={currentUser.last_name} onChange={ev => setCurrentUser({...currentUser, last_name: ev.target.value})} required/>
                                        <label>Last Name</label>
                                    </div>
                                </div>
                                <div className="field-holder">
                                        <input id='input-birthday' type="date" value={currentUser.birthday} onChange={ev => setCurrentUser({...currentUser, birthday: ev.target.value})} />
                                        <label>Birthday</label>
                                </div>
                                <div className="field-holder">
                                        <input id="street-address" type="text" value={currentUser.street_address} onChange={ev => setCurrentUser({...currentUser, street_address: ev.target.value})} required/>
                                        <label>Street Address</label>
                                </div>
                                <div className="input-row-container">
                                    <div className="field-holder">
                                            <input type="text" value={currentUser.municipality} onChange={ev => setCurrentUser({...currentUser, municipality: ev.target.value})} required/>
                                            <label>Municipality</label>
                                    </div>
                                    <div className="field-holder">
                                            <input type="text" value={currentUser.province} onChange={ev => setCurrentUser({...currentUser, province: ev.target.value})}required/>
                                            <label>Province</label>
                                    </div>
                                </div>
                        </div>
                        <div className="button-section">
                            <button onClick={handleSubmit}>Update</button>
                        </div>
                       
                    </form>
                    )}
                </div>
            </div>
            
            <div className="recommended">
                 section
            </div>
        </div>
    )
}

export default EditProfile;