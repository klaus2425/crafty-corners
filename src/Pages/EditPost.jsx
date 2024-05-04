import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Loading from "../components/utils/Loading";
import TimeAgo from 'javascript-time-ago'
import toast from "react-hot-toast";
import { lazy, Suspense, useRef, useState } from "react";

export const EditPost = () => {
  const { id } = useParams();
  const ImageModal = lazy(() => import('../components/ImageModal'));
  const storagePostUrl = import.meta.env.VITE_API_POSTS_URL;
  const storageUserUrl = import.meta.env.VITE_API_STORAGE_URL;
  const timeAgo = new TimeAgo('en-US');
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data, isLoading } = useQuery({
    queryKey: [`edit-post-${id}`],
    queryFn: () => axiosClient.get(`/posts/${id}`).then(({ data }) => (data.data))
  });
  const ago = data && timeAgo.format(new Date(data?.created_at.replace(" ", "T")), 'twitter-now');
  const user = data && data.user;
  const community = data && data.community;
  const titleRef = useRef();
  const [isOpen, setIsOpen] = useState(false);

  const onSubmit = () => {
    const formData = new FormData();
    formData.append('_method', 'PUT')
    formData.append('title', titleRef.current.value);
    toast.promise(axiosClient.post(`/posts/${id}`, formData),
      {
        loading: 'Editing post',
        success: () => {
          queryClient.invalidateQueries({ queryKey: [`post-${id}`, `posts`] })
          navigate(`/p/${id}?uid=user.id`)
          return <b>Success</b>
        },
        error: (err) => {
          return `${err.response.data.message}`
        },
      },
    )
  }


  return !isLoading ?
    <div className="authenticated-container">
      <div className="feed">


        <div className="section-header">
        </div>
        <div className="post">
          <div className="post-header" id="posts">
            <div className="left">
              <img className={'post-image'} src={`${storageUserUrl}${user.profile_picture}`} alt="" />
              <div className='post-user'>
                <h4>{data.user.first_name}</h4>
                <span id='post-time'>{ago} ago</span>
              </div>
            </div>
            <div className="right">
              <span>/{community.name}</span>
            </div>
          </div>
          <input ref={titleRef} className="edit-title-input" type="text" placeholder={data.title} />
          {
            data.post_type === 'image' &&
            <div className="post-content">
              {
                isOpen &&
                <Suspense>
                  <ImageModal isOpen={isOpen} setIsOpen={setIsOpen} image={`${storagePostUrl}${data.image}`} />
                </Suspense>
              }
              <img onClick={() => setIsOpen(true)} className={'post-image'} src={`${storagePostUrl}${data.image}`} />
            </div>
          }
          {
            data.post_type === 'video' &&
            <div className="post-content">
              <video controls className='post-image' src={`${storagePostUrl}${data.video}`} alt="" />
            </div>
          }
          {
            data.post_type === 'text' &&
            <div className="post-content">
              <p className='post-text'>{data.content}</p>
            </div>
          }
          {
            data.post_type === 'link' &&
            <div className="post-content">
              <p className='post-text'>{post.content}</p>
            </div>
          }
          <div onClick={onSubmit} className="btn btn--purple" style={{ alignSelf: "flex-end" }}>Submit</div>
        </div>
      </div>
      <div className="recommended">
      </div>
    </div>
    :
    <div className="authenticated-container">
      <div className="feed">
        <Loading />
      </div>
      <div className="recommended">

      </div>
    </div>

}



export default EditPost;