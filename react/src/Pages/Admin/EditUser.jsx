import { useEffect, useState } from "react";
import {useNavigate, useParams} from "react-router-dom";
import axiosClient from "../../axios-client";

const EditUser = () => {
    let {id} = useParams();
    const[user, setUser] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const [loading, setLoading] = useState(false);
    console.log(id);
    const [image, setImage] = useState();

    if(id) {
        useEffect(() => {
            axiosClient.get(`/users/${id}`)
                  .then(({ data }) => {
                    setUser(data);
                    console.log(data);
                  })
                  .catch(() => {
                  })
        });
    }

    const handleChange = (ev) => {
        setImage(URL.createObjectURL(ev.target.files[0]));
        setImageChange(true);
        setCurrentUser({...currentUser, profile_picture: ev.target.files[0]})
    };

    const onSubmit = (ev) => {
        ev.preventDefault();

        if(!imageChange) {
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
            axiosClient.post(`users/${currentUser.id}`, formData)
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
            for (const key in currentUser) {
                formData.append(key, currentUser[key]);
                console.log(currentUser[key]);
              }
        
            axiosClient.post(`users/${currentUser.id}`, formData)
                .then((res) => {
                    console.log(res.data); 
                    window.location.reload();
                })
                .catch(err => {
                const response = err.response;
                setLoading(false);
                setCurrentUser(data);
                setImage(storageBaseUrl+data.profile_picture)
            })
            .catch(() =>{
                setLoading(false);
            });
        }

        
    };
    
    return (
        <div className="edit-user-container">
            <form enctype="multipart/form-data" onSubmit={onSubmit}>
                        
                        <div className="edit-card">
                            <div className='edit-header'>
                                User Details
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
                            <button type='submit'>Update</button>
                        </div>
                       
                    </form>
                            
        </div>
    )
}

export default EditUser;