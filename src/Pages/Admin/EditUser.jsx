import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../../axios-client";
import Swal from 'sweetalert2';
import Loading from "../../components/utils/Loading";
import { useStateContext } from "../../context/ContextProvider";
import { AdminPosts } from "../../components/Post";

const EditUser = () => {
    let { id } = useParams();
    const storageBaseUrl = import.meta.env.VITE_API_STORAGE_URL;
    const [e_user, setE_User] = useState({});
    const [imageChange, setImageChange] = useState(false);
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState();
    const [userPosts, setUserPosts] = useState([]);
    
    const getPosts = () => {
        axiosClient.get('/posts')
            .then(res => {
                const posts = res.data.posts;
                const filteredData = posts.filter(item => item.user.id == id );
                console.log(filteredData);
                setUserPosts(filteredData);
            })
    }

    const { setUser } = useStateContext();
    if (!image) { setImage('/avatar.jpg') }

    const getUser = () => {
        setLoading(true);
        axiosClient.get(`/users/${id}`)
            .then(({ data }) => {
                setE_User(data.data);
                setUser(data.data)
                setLoading(false);
                setImage(storageBaseUrl + data.data.profile_picture);
            })
            .catch((err) => {
                setLoading(false);
                const response = err.response;
                Swal.fire({
                    title: "Error",
                    text: `${Object.values(response.data)[0]}`,
                    icon: "warning"
                });
            })
    }

    if (id) {
        useEffect(() => {
            getUser();
            getPosts();
        }, []);
    }

    const handleChange = (ev) => {
        setImage(URL.createObjectURL(ev.target.files[0]));
        setImageChange(true);
        setE_User({ ...e_user, profile_picture: ev.target.files[0] })
    };

    const onSubmit = (ev) => {
        ev.preventDefault();
        if (!imageChange) {
            const formData = new FormData();
            formData.append("_method", "PUT");
            formData.append('user_name', e_user.user_name)
            formData.append('first_name', e_user.first_name);
            formData.append('middle_name', e_user.middle_name);
            formData.append('last_name', e_user.last_name);
            formData.append('email', e_user.email);
            formData.append('password', e_user.password);
            formData.append('birthday', e_user.birthday);
            formData.append('gender', e_user.gender);
            formData.append('phone_number', e_user.phone_number);
            axiosClient.post(`users/${id}`, formData)
                .then(() => {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Changes applied",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    getUser();
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
            const formData = new FormData();
            formData.append("_method", "PUT");
            for (const key in e_user) {
                formData.append(key, e_user[key]);
            }

            axiosClient.post(`users/${id}`, formData)
                .then((res) => {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Changes applied",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    console.log(res.data);
                    getUser();
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
                    setLoading(false);
                    setE_User(data);
                    setImage(storageBaseUrl + data.profile_picture)
                })
                .catch((err) => {
                    setLoading(false);
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


    };

    return (

        <div className="edit-user-container">

            {loading && (
                <Loading />
            )}
            {!loading &&
                <div>
                    <h1>User Profile</h1>
                    <form className="edit-form" encType="multipart/form-data" onSubmit={onSubmit}>
                        <div className="edit-left">
                            <div className="edit-labels">
                                <label>Username</label>
                                <label>First Name</label>
                                <label>Middle Name</label>
                                <label>Last Name</label>
                                <label>Email Address</label>
                                <label>Phone Number</label>
                                <label>Birthday</label>
                                <label>Gender</label>
                            </div>
                            <div className="edit-inputs">
                                <input type="text" value={e_user.user_name} onChange={ev => setE_User({ ...e_user, user_name: ev.target.value })} />
                                <input type="text" value={e_user.first_name} onChange={ev => setE_User({ ...e_user, first_name: ev.target.value })} />
                                <input type="text" value={e_user.middle_name} onChange={ev => setE_User({ ...e_user, middle_name: ev.target.value })} />
                                <input type="text" value={e_user.last_name} onChange={ev => setE_User({ ...e_user, last_name: ev.target.value })} />
                                <input type="email" value={e_user.email} onChange={ev => setE_User({ ...e_user, email: ev.target.value })} />
                                <input type="number" value={e_user.phone_number} onChange={ev => setE_User({ ...e_user, phone_number: ev.target.value })} />
                                <input type="date" value={e_user.birthday} onChange={ev => setE_User({ ...e_user, birthday: ev.target.value })} />
                                <div className="gender-container">
                                    <input type="radio" name="gender" value="Male" checked={e_user.gender === 'Male'} onChange={ev => setE_User({ ...e_user, gender: ev.target.value })} required /> Male
                                    <input type="radio" name="gender" value="Female" checked={e_user.gender === 'Female'} onChange={ev => setE_User({ ...e_user, gender: ev.target.value })} /> Female
                                    <input type="radio" name="gender" value="Other" checked={e_user.gender === 'Other'} onChange={ev => setE_User({ ...e_user, gender: ev.target.value })} /> Other
                                </div>
                                <button type="submit">Save</button>
                            </div>
                        </div>
                        <div className="edit-right">
                            <div className="upload-picture">
                                <img id='update-picture' src={image} />
                                <input id='upload-button' type="file" onChange={handleChange} />
                                <label htmlFor='upload-button'>Upload File</label>
                                <span className="edit-text">File size: maximum 1 MB</span>
                                <span className="edit-text">File extension: .JPEG, .PNG, .JPG</span>
                            </div>
                        </div>
                    </form>
                    <div className="admin-user-posts">
                        <h1>User Posts</h1>
                        {userPosts && 
                            userPosts.map(p => {
                                <AdminPosts post={p}/>
                        })
                        }
                    </div>
                </div>
            }


        </div>
    )
}

export default EditUser;