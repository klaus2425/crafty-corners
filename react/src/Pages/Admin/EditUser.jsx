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
                <div className="left">

                </div>
                <div>
                        
                </div>   
            </form>
                            
        </div>
    )
}

export default EditUser;