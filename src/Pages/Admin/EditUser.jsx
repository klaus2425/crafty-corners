import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../../axios-client";
import Swal from 'sweetalert2';
import Loading from "../../components/utils/Loading";

const EditUser = () => {
    let {id} = useParams();
    const storageBaseUrl = import.meta.env.VITE_API_STORAGE_URL;
    const[user, setUser] = useState({});
    const [imageChange, setImageChange] = useState(false);
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState();
    if (!image) {setImage('/avatar.jpg')}

    const getUser = () => {
        setLoading(true);
        axiosClient.get(`/users/${id}`)
        .then(({ data }) => {
            setUser(data.data);
            setLoading(false);
            setImage(storageBaseUrl+data.data.profile_picture);
        })
        .catch((err) => {
            setLoading(false);
            const response  = err.response;
            Swal.fire({
            title: "Error",
            text: `${Object.values(response.data)[0]}`,
            icon: "warning"
        });
        })
    }

    if(id) {
        useEffect(() => {
            getUser();
        }, []);
    }

    const handleChange = (ev) => {
        setImage(URL.createObjectURL(ev.target.files[0]));
        setImageChange(true);
        setUser({...user, profile_picture: ev.target.files[0]})
    };

    const onSubmit = (ev) => {
        ev.preventDefault();
        if(!imageChange) {
            const formData = new FormData();
            formData.append("_method", "PUT");
            formData.append('user_name', user.user_name)
            formData.append('first_name', user.first_name);
            formData.append('middle_name', user.middle_name);
            formData.append('last_name', user.last_name); 
            formData.append('email', user.email); 
            formData.append('password', user.password); 
            formData.append('birthday', user.birthday); 
            formData.append('street_address', user.street_address); 
            formData.append('municipality', user.municipality); 
            formData.append('province', user.province);
            formData.append('gender', user.gender);
            formData.append('phone_number', user.phone_number);
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
            for (const key in user) {
                formData.append(key, user[key]);
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
                setUser(data);
                setImage(storageBaseUrl+data.profile_picture)
            })
            .catch((err) =>{
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
                        <label>Street Address</label>
                        <label>Municipality</label>
                        <label>Province</label>
                    </div>
                    <div className="edit-inputs">
                        <input type="text" value={user.user_name} onChange={ev => setUser({...user, user_name: ev.target.value})}/>
                        <input type="text" value={user.first_name} onChange={ev => setUser({...user, first_name: ev.target.value})}/>
                        <input type="text" value={user.middle_name} onChange={ev => setUser({...user, middle_name: ev.target.value})}/>
                        <input type="text" value={user.last_name} onChange={ev => setUser({...user, last_name: ev.target.value})}/>
                        <input type="email" value={user.email} onChange={ev => setUser({...user, email: ev.target.value})}/>
                        <input type="number" value={user.phone_number} onChange={ev => setUser({...user, phone_number: ev.target.value})}/>
                        <input type="date" value={user.birthday} onChange={ev => setUser({...user, birthday: ev.target.value})}/>
                        <div className="gender-container">
                            <input type="radio" name="gender" value="Male" checked={user.gender === 'Male'} onChange={ev => setUser({...user, gender: ev.target.value})} required/> Male
                            <input type="radio" name="gender" value="Female" checked={user.gender === 'Female'} onChange={ev => setUser({...user, gender: ev.target.value})}/> Female
                            <input type="radio" name="gender" value="Other" checked={user.gender === 'Other'} onChange={ev => setUser({...user, gender: ev.target.value})}/> Other
                        </div>
                        <input type="text" value={user.street_address} onChange={ev => setUser({...user, street_address: ev.target.value})}/>
                        <input type="text" value={user.municipality} onChange={ev => setUser({...user, municipality: ev.target.value})}/>
                        <input type="text" value={user.province} onChange={ev => setUser({...user, province: ev.target.value})}/>
                        
                        <button type="submit">Save</button>
                    </div>
                </div>
                <div className="edit-right">
                    <div className="upload-picture">
                                <img id='update-picture'src={image}/>
                                <input id='upload-button' type="file" onChange={handleChange} />
                                <label htmlFor='upload-button'>Upload File</label>
                                <span className="edit-text">File size: maximum 1 MB</span>
                                <span className="edit-text">File extension: .JPEG, .PNG, .JPG</span>
                    </div>
                </div>   
            </form>
                <div className="admin-user-posts">
                    <h1>User Posts</h1>     
                </div>     
            </div>
            }
          
          
        </div>
    )
}

export default EditUser;