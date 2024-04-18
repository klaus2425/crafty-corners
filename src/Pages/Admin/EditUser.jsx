import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from 'sweetalert2';
import axiosClient from "../../axios-client";
import Loading from "../../components/utils/Loading";

const EditUser = () => {
    const { id } = useParams();
    const storageBaseUrl = import.meta.env.VITE_API_STORAGE_URL;
    const [e_user, setE_User] = useState({});
    // const [imageChange, setImageChange] = useState(false);
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState();



    if (!image) { setImage('/avatar.jpg') }

    const getUser = () => {
        setLoading(true);
        axiosClient.get(`/users/${id}`)
            .then(({ data }) => {
                setE_User(data.data);
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
        }, []);
    }


    // const onSubmit = (ev) => {
    //     ev.preventDefault();
    //     if (!imageChange) {
    //         const formData = new FormData();
    //         formData.append("_method", "PUT");
    //         formData.append('user_name', e_user.user_name)
    //         formData.append('first_name', e_user.first_name);
    //         formData.append('middle_name', e_user.middle_name);
    //         formData.append('last_name', e_user.last_name);
    //         formData.append('email', e_user.email);
    //         formData.append('password', e_user.password);
    //         formData.append('gender', e_user.gender);
    //         formData.append('phone_number', e_user.phone_number);
    //         axiosClient.post(`users/${id}`, formData)
    //             .then(() => {
    //                 Swal.fire({
    //                     position: "top-end",
    //                     icon: "success",
    //                     title: "Changes applied",
    //                     showConfirmButton: false,
    //                     timer: 1500
    //                 });
    //                 getUser();
    //             })
    //             .catch(err => {
    //                 const response = err.response;
    //                 if (response && response.status === 422) {
    //                     Swal.fire({
    //                         title: "Error",
    //                         text: `${Object.values(response.data.errors)[0]}`,
    //                         icon: "warning"
    //                     });
    //                 }
    //             });
    //     }
    //     else {
    //         const formData = new FormData();
    //         formData.append("_method", "PUT");
    //         for (const key in e_user) {
    //             formData.append(key, e_user[key]);
    //         }

    //         axiosClient.post(`users/${id}`, formData)
    //             .then((res) => {
    //                 Swal.fire({
    //                     position: "top-end",
    //                     icon: "success",
    //                     title: "Changes applied",
    //                     showConfirmButton: false,
    //                     timer: 1500
    //                 });
    //                 getUser();
    //             })
    //             .catch(err => {
    //                 const response = err.response;
    //                 if (response && response.status === 422) {
    //                     Swal.fire({
    //                         title: "Error",
    //                         text: `${Object.values(response.data.errors)[0]}`,
    //                         icon: "warning"
    //                     });
    //                 }
    //                 setLoading(false);
    //                 setE_User(data);
    //                 setImage(storageBaseUrl + data.profile_picture)
    //             })
    //             .catch((err) => {
    //                 setLoading(false);
    //                 const response = err.response;
    //                 if (response && response.status === 422) {
    //                     Swal.fire({
    //                         title: "Error",
    //                         text: `${Object.values(response.data.errors)[0]}`,
    //                         icon: "warning"
    //                     });
    //                 }

    //             });
    //     }
    // };

    return (

        <div className="edit-user-container">

            {loading && (
                <Loading />
            )}
            {!loading &&
                <div>
                    <h1>User Profile</h1>
                    <form className="edit-form" encType="multipart/form-data" >
                        <div className="edit-left">
                            <div className="edit-labels">
                                <label>Username</label>
                                <label>First Name</label>
                                <label>Middle Name</label>
                                <label>Last Name</label>
                                <label>Student ID</label>
                                <label>Program</label>
                                <label>Email Address</label>
                                <label>Phone Number</label>
                                <label>Gender</label>
                            </div>
                            <div className="edit-inputs">
                                <input type="text" value={e_user.user_name} disabled />
                                <input type="text" value={e_user.first_name} disabled />
                                <input type="text" value={e_user.middle_name}  disabled/>
                                <input type="text" value={e_user.last_name} disabled/>
                                <input type="text" value={e_user.student_id} disabled/>
                                <input type="text" value={e_user.program} disabled/>
                                <input type="email" readOnly value={e_user.email}  disabled/>
                                <input type="number" value={e_user.phone_number} disabled/>
                                <input type="text" value={e_user.gender} disabled />
                
                            </div>
                        </div>
                        <div className="edit-right">
                            <div className="upload-picture">
                                <img id='update-picture' src={image} />
                            </div>
                        </div>
                    </form>
                    {/* <div className="admin-user-posts">
                        <h1>User Posts</h1>
                        {userPosts &&
                            userPosts.map(p => (
                                <div key={p.id} className="admin-posts">
                                <AdminPosts getCommunity={getUserPosts} community={p.community} post={p} user={e_user}/>
                                </div>
                            ))
                        }
                    </div> */}
                </div>
            }


        </div>
    )
}

export default EditUser;