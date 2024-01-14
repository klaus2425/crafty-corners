import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import axiosClient from '../axios-client';


const ViewPost = () => {
  const {id} = useParams();

  const getPost = () => {
    axiosClient.get(`/posts/${29}`)
    .then(res => {
      console.log(res.data);
    })
  }

  useEffect(() => {
    getPost();
  })

  return (
    <div>
      hello
    </div>
  )
}

export default ViewPost;