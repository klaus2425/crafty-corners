import { useEffect, useState } from "react";
import {useNavigate, useParams} from "react-router-dom";
import axiosClient from "../../axios-client";

const EditUser = () => {
    let {id} = useParams();
    const storageBaseUrl = import.meta.env.VITE_API_STORAGE_URL;
    const[user, setUser] = useState({});
    const [imageChange, setImageChange] = useState(false);
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState();
    if (!image) {setImage('/avatar.jpg')}

    if(id) {
        useEffect(() => {
            axiosClient.get(`/users/${id}`)
                  .then(({ data }) => {
                    setUser(data);
                    console.log(data);
                   setImage(storageBaseUrl+data.profile_picture)
                  })
                  .catch(() => {
                  })
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
            formData.append('first_name', user.first_name);
            formData.append('middle_name', user.middle_name);
            formData.append('last_name', user.last_name); 
            formData.append('email', user.email); 
            formData.append('password', user.password); 
            formData.append('birthday', user.birthday); 
            formData.append('street_address', user.street_address); 
            formData.append('municipality', user.municipality); 
            formData.append('province', user.province); 
            axiosClient.post(`users/${id}`, formData)
                .then((res) => {
                    console.log(res.data); 
                    window.location.reload();
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
            for (const key in user) {
                formData.append(key, user[key]);
                console.log(user[key]);
              }
        
            axiosClient.post(`users/${id}`, formData)
                .then((res) => {
                    console.log(res.data); 
                    window.location.reload();
                })
                .catch(err => {
                const response = err.response;
                setLoading(false);
                setUser(data);
                setImage(storageBaseUrl+data.profile_picture)
            })
            .catch(() =>{
                setLoading(false);
            });
        }

        
    };
    
    return (
        <div className="edit-user-container">
            <form className="edit-form" encType="multipart/form-data" onSubmit={onSubmit}>
                <div className="edit-left">
                    <div className="edit-labels">
                        <label>Username</label>
                        <label>First Name</label>
                        <label>Middle Name</label>
                        <label>Last Name</label>
                        <label>Email Address</label>
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
                        <input type="text" value={user.email} onChange={ev => setUser({...user, email: ev.target.value})}/>
                        <input type="date" value={user.birthday} onChange={ev => setUser({...user, birthday: ev.target.value})}/>
                        <input type="text" value={user.gender} onChange={ev => setUser({...user, gender: ev.target.value})}/>
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
                    </div>
                </div>   
            </form>
                            
        </div>
    )
}

export default EditUser;