import { faPencil } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axiosClient from "../axios-client";
import { useState, useEffect, useRef } from 'react';
import { useStateContext } from "../context/ContextProvider";

import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';


const AccountSettings = () => {
    const passwordRef = useRef();
    const currentPasswordRef = useRef();
    const [image, setImage] = useState();
    const storageBaseUrl = import.meta.env.VITE_API_STORAGE_URL;
    const { user } = useStateContext();
    if (!image) { setImage('/avatar.jpg') }


    const getUser = () => {
        setLoading(true);
        axiosClient.get('/user')
            .then(({ data }) => {
                setLoading(false);
                setCurrentUser(data);
                setImage(storageBaseUrl + data.profile_picture)
                if (data.type === 'mentor') {
                    getMentorships()
                }
            })
            .catch(() => {
                setLoading(false);
            });
    }



    const onEmailSubmit = (ev) => {
        ev.preventDefault();

        const formData = new FormData();

        formData.append("_method", "PUT");
        formData.append('email', currentUser.email);

        axiosClient.post(`users/${currentUser.id}`, formData)
            .then((res) => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Email changed successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                getUser();
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                }
            });
    };

    const getMentorships = async () => {
        const fetchedData = await axiosClient.get('/mentor')
        return fetchedData.data.data;
    }
    const mentorship = useQuery({
        queryKey: ['mentor-settings'],
        queryFn: getMentorships, 
        enabled: user.type === 'mentor',
    })

    const handleRetire = (community_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, remove it"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosClient.post(`mentor/retire-mentorship/${community_id}`)
                    .then(() => {
                        mentorship.refetch();
                        toast.success('Mentor status removed');
                    })
            }
        });

    }

    const onPhoneSubmit = (ev) => {
        ev.preventDefault();

        const formData = new FormData();

        formData.append("_method", "PUT");
        formData.append('phone_number', currentUser.phone_number);

        axiosClient.post(`users/${currentUser.id}`, formData)
            .then((res) => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Phone number changed successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                getUser();
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                }
            });
    };


    const onPasswordSubmit = (ev) => {
        ev.preventDefault();
        const formData = new FormData();
        formData.append('current_password', currentPasswordRef.current.value);
        formData.append('new_password', passwordRef.current.value);
        axiosClient.post(`change-password/`, formData)
            .then((res) => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Password changed successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                getUser();

            })
            .catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                    console.error(response.data.message);
                }
            });
    };


    const [currentUser, setCurrentUser] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getUser();
    }, []);

    return (
        <div className="authenticated-container">
            <div className="acc-settings-feed">
                <div className='section-header'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none">
                        <path d="M28.7693 29.8187C28.1046 27.9581 26.6399 26.3141 24.6024 25.1415C22.5649 23.9689 20.0684 23.3333 17.5002 23.3333C14.9319 23.3333 12.4355 23.9689 10.3979 25.1415C8.36043 26.3141 6.89574 27.9581 6.23103 29.8187" stroke="#677186" strokeWidth="2.91667" strokeLinecap="round" />
                        <circle cx="17.4998" cy="11.6667" r="5.83333" stroke="#677186" strokeWidth="2.91667" strokeLinecap="round" />
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
                        <div>
                            <div className="edit-card">
                                <div className='edit-header'>
                                    <FontAwesomeIcon icon={faPencil} />
                                    <h1> Account Settings</h1>
                                </div>
                                <div className='input-container'>
                                    <div className="input-col-container">
                                        <form onSubmit={onPhoneSubmit}>
                                            <div className="field-holder">
                                                <input type="number" value={currentUser.phone_number} onChange={ev => setCurrentUser({ ...currentUser, phone_number: ev.target.value })} required />
                                                <label>Phone Number</label>
                                            </div>
                                            <button className='purple-button'>Change Phone Number</button>
                                        </form>
                                    </div>
                                    <div className="input-col-container">
                                        <form onSubmit={onPasswordSubmit}>
                                            <span className='change-text'>Change Password</span>
                                            <div className="field-holder">
                                                <input type="Password" ref={currentPasswordRef} required />
                                                <label>Current Password</label>
                                            </div>
                                            <div className="field-holder">
                                                <input type="Password" ref={passwordRef} required />
                                                <label>New Password</label>
                                            </div>
                                            <button className='purple-button'>Change Password</button>
                                        </form>
                                    </div>
                                    <div>
                                    </div>
                                </div>

                                {
                                    user && user.type === 'mentor' ?
                                        <div className='mentor-settings'>
                                            <strong>Mentorship</strong>
                                            {
                                                mentorship ?
                                                    mentorship?.data.map(ms => (
                                                        <div key={ms.id} className='mentor-community-settings'>
                                                            <span><strong>Community:</strong> {ms.community.name}</span>
                                                            <button onClick={() => handleRetire(ms.community.id)} className='purple-button'>Retire</button>
                                                        </div>
                                                    ))
                                                    :
                                                    null
                                            }
                                        </div>

                                        :
                                        null
                                }

                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="recommended">
            </div>
        </div>
    )
}

export default AccountSettings;