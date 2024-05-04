import { faPencil } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axiosClient from "../axios-client";
import { useEffect, useState } from 'react';
import { useStateContext } from "../context/ContextProvider";
import Loading from '../components/utils/Loading';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';
import ReactSelect from 'react-select';

const EditProfile = () => {

    const [image, setImage] = useState();
    const { setUser } = useStateContext();
    const [imageChange, setImageChange] = useState(false);
    const storageBaseUrl = import.meta.env.VITE_API_STORAGE_URL;
    const queryClient = useQueryClient();

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
            formData.append('sex', currentUser.sex);

            toast.promise(axiosClient.post(`users/${currentUser.id}`, formData), {
                loading: 'Updating Profile',
                success: () => {
                    queryClient.invalidateQueries({ queryKey: ['user'] });
                    return <b>Profile Updated</b>
                },
                error: (err) => {
                    return `${Object.values(err.response.data.errors)[0]}`
                },
            },
            )
        }
        else {
            const formData = new FormData();

            formData.append("_method", "PUT");
            for (const key in currentUser) {
                formData.append(key, currentUser[key]);
            }
            toast.promise(axiosClient.post(`users/${currentUser.id}`, formData), {
                loading: 'Updating Profile',
                success: () => {
                    queryClient.invalidateQueries({queryKey: ['user']});
                    return <b>Profile Updated</b>
                },
                error: (err) => {
                    setImageChange(false);
                    return `${Object.values(err.response.data.errors)[0]}`
                },
            },)
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
                                    <input id='upload-button' type="file" accept="image/*" onChange={handleChange} />
                                    <label htmlFor='upload-button'>Upload File</label>
                                </div>
                                <div className='input-container'>
                                    <div className="input-col-container">
                                        <div className="field-holder">
                                            <label>First Name</label>
                                            <input type="text" value={currentUser.first_name} onChange={ev => setCurrentUser({ ...currentUser, first_name: ev.target.value })} required />
                                        </div>
                                        <div className="field-holder">
                                            <label>Middle Name</label>
                                            <input type="text" value={currentUser.middle_name} onChange={ev => setCurrentUser({ ...currentUser, middle_name: ev.target.value })} required />
                                        </div>

                                    </div>
                                    <div className="input-col-container">
                                        <div className="field-holder">
                                            <label>Last Name</label>
                                            <input type="text" value={currentUser.last_name} onChange={ev => setCurrentUser({ ...currentUser, last_name: ev.target.value })} required />
                                        </div>
                                        <div className="field-holder">
                                            <label>Sex</label>
                                            <ReactSelect
                                                className="react-select-container"
                                                classNamePrefix="react-select"
                                                options={[{ value: 'Male', label: 'Male' }, { value: 'Female', label: 'Female' }]}
                                                onChange={(value) => setCurrentUser({ ...currentUser, sex: value.value })}
                                                value={{ value: currentUser.sex, label: currentUser.sex }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="button-section">
                                    <button className='purple-button' type='submit'>Update</button>
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