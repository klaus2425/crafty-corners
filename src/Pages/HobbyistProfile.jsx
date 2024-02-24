import { useEffect } from "react";
import { useParams } from 'react-router-dom';
import axiosClient from "../axios-client";

const HobbyistProfile = () => {
  const id = useParams();
  const getUser = () => {
    axiosClient.get(`/users/${id}`)
      .then(res => {
        console.log(res.data);
      })
  }
  useEffect(() => {
    getUser();
  }, [])
  return (
    <div>
      <h1>hello</h1>
    </div>
  )
}

export default HobbyistProfile;