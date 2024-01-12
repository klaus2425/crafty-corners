import { faPencil } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axiosClient from "../axios-client";
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useStateContext } from "../context/ContextProvider";
import Loading from '../components/utils/Loading';


const EditProfile = () => {

    const [image, setImage] = useState();
    const { user, setUser } = useStateContext();
    const [imageChange, setImageChange] = useState(false);
    const storageBaseUrl = import.meta.env.VITE_API_STORAGE_URL;


    if (!image) { setImage('/avatar.jpg') }

    const handleChange = (ev) => {
        setImage(URL.createObjectURL(ev.target.files[0]));
        setImageChange(true);
        setCurrentUser({ ...currentUser, profile_picture: ev.target.files[0] })
    };

    const getUser = () => {
        setLoading(true);
        axiosClient.get('/user')
            .then(({ data }) => {
                setLoading(false);
                setCurrentUser(data);
                setUser(data);
                setImage(storageBaseUrl + data.profile_picture);
            })
            .catch(() => {
                setLoading(false);
            });
    }

    const onSubmit = (ev) => {
        ev.preventDefault();

        if (!imageChange) {
            const formData = new FormData();

            formData.append("_method", "PUT");
            formData.append('first_name', currentUser.first_name);
            formData.append('middle_name', currentUser.middle_name);
            formData.append('last_name', currentUser.last_name);
            formData.append('email', currentUser.email);
            formData.append('password', currentUser.password);
            formData.append('birthday', currentUser.birthday);
            formData.append('street_address', currentUser.street_address);
            formData.append('municipality', currentUser.municipality);
            formData.append('province', currentUser.province);
            formData.append('gender', currentUser.gender);
            axiosClient.post(`users/${currentUser.id}`, formData)
                .then((res) => {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your profile has been updated",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    getUser();
                })
                .catch(err => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        console.log(response);
                    }
                });
        }
        else {
            const formData = new FormData();

            formData.append("_method", "PUT");
            for (const key in currentUser) {
                formData.append(key, currentUser[key]);
            }

            axiosClient.post(`users/${currentUser.id}`, formData)
                .then((res) => {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your profile has been updated",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    getUser();
                    setImageChange(false);

                })
                .catch(err => {
                    const response = err.response;
                    Swal.fire({
                        title: "Error",
                        text: `${Object.values(response.data.errors)[0]}`,
                        icon: "warning"
                    });
                    setLoading(false);
                    setImageChange(false);
                    setImage(storageBaseUrl + data.profile_picture)
                    getUser();

                })

        }


    };


    const [currentUser, setCurrentUser] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getUser();
    }, []);




    return (
        <div className="authenticated-container">
            <div className="feed">
                <div className='section-header'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none">
                        <path d="M28.7693 29.8187C28.1046 27.9581 26.6399 26.3141 24.6024 25.1415C22.5649 23.9689 20.0684 23.3333 17.5002 23.3333C14.9319 23.3333 12.4355 23.9689 10.3979 25.1415C8.36043 26.3141 6.89574 27.9581 6.23103 29.8187" stroke="#677186" strokeWidth="2.91667" strokeLinecap="round" />
                        <circle cx="17.4998" cy="11.6667" r="5.83333" stroke="#677186" strokeWidth="2.91667" strokeLinecap="round" />
                    </svg>
                    <h3>Edit Profile</h3>
                </div>
                <div className="card">
                    <div className="edit-card">
                        <div className='edit-header'>

                            <h1><FontAwesomeIcon icon={faPencil} /> Update your Profile</h1>
                        </div>
                        {loading ? <Loading /> :

                            <form encType="multipart/form-data" onSubmit={onSubmit}>


                                <div className="upload-picture">
                                    <img id='update-picture' src={image} />
                                    <input id='upload-button' type="file" onChange={handleChange} />
                                    <label htmlFor='upload-button'>Upload File</label>
                                </div>
                                <div className='input-container'>
                                    <div className="input-col-container">
                                        <div className="field-holder">
                                            <input type="text" value={currentUser.first_name} onChange={ev => setCurrentUser({ ...currentUser, first_name: ev.target.value })} required />
                                            <label>First Name</label>
                                        </div>
                                        <div className="field-holder">
                                            <input type="text" value={currentUser.middle_name} onChange={ev => setCurrentUser({ ...currentUser, middle_name: ev.target.value })} required />
                                            <label>Middle Name</label>
                                        </div>
                                        <div className="field-holder">
                                            <input type="text" value={currentUser.last_name} onChange={ev => setCurrentUser({ ...currentUser, last_name: ev.target.value })} required />
                                            <label>Last Name</label>
                                        </div>
                                        <div className="field-holder">
                                            <input id='input-birthday' type="date" value={currentUser.birthday} onChange={ev => setCurrentUser({ ...currentUser, birthday: ev.target.value })} />
                                            <label>Birthday</label>
                                        </div>

                                    </div>


                                    <div className="input-col-container">

                                        <div className="gender-field-holder">
                                            <div className="gender-label">
                                                Gender
                                            </div>
                                            <div className="gender-inputs">
                                                <div className="gender-container">
                                                    <div className='gender-radio'>
                                                        <input type="radio" name="gender" value="Male" checked={currentUser.gender === 'Male'} onChange={ev => setCurrentUser({ ...currentUser, gender: ev.target.value })} required />
                                                        <span>Male</span>

                                                    </div>
                                                    <div className='gender-radio'>
                                                        <input type="radio" name="gender" value="Female" checked={currentUser.gender === 'Female'} onChange={ev => setCurrentUser({ ...currentUser, gender: ev.target.value })} />
                                                        <span>Female</span>

                                                    </div>
                                                    <div className='gender-radio'>
                                                        <input type="radio" name="gender" value="Other" checked={currentUser.gender === 'Other'} onChange={ev => setCurrentUser({ ...currentUser, gender: ev.target.value })} />
                                                        <span>Other</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="field-holder">
                                            <textarea id="street-address" type="text" value={currentUser.street_address} onChange={ev => setCurrentUser({ ...currentUser, street_address: ev.target.value })} required />
                                            <label>Street Address</label>
                                        </div>
                                        <div className="field-holder">
                                            <input type="text" value={currentUser.municipality} onChange={ev => setCurrentUser({ ...currentUser, municipality: ev.target.value })} required />
                                            <label>Municipality</label>
                                        </div>
                                        <div className="field-holder">
                                            <input type="text" value={currentUser.province} onChange={ev => setCurrentUser({ ...currentUser, province: ev.target.value })} required />
                                            <label>Province</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="button-section">
                                    <button className='green-buttton' type='submit'>Update</button>
                                </div>

                            </form>
                        }
                    </div>

                </div>
            </div>

            <div className="recommended">
            </div>
        </div>
    )
}

export default EditProfile;