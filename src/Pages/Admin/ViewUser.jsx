import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from 'sweetalert2';
import axiosClient from "../../axios-client";
import Loading from "../../components/utils/Loading";

const ViewUser = () => {
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
                                <label>Sex</label>
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
                                <input type="text" value={e_user.sex} disabled />
                
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

export default ViewUser;