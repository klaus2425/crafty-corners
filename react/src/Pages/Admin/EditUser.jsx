import { useEffect, useState } from "react";
import axiosClient from "../../axios-client";

const EditUser = () => {
    
    const[user, setUser] = useState({});

    useEffect(() => {
        getUser();
    });

    const getUser = () => {
        axiosClient.get('/users/')
          .then(({ data }) => {
            setUser(data.data);
          })
          .catch(() => {
          })
    }

    
    return (
        <div className="edit-user-container">
            User Details
        </div>
    )
}

export default EditUser;