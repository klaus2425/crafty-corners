import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import axiosClient from '../axios-client';
import Skeleton from 'react-loading-skeleton';
import TimeAgo from 'javascript-time-ago'
import ImageModal from '../components/ImageModal';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import MembershipCheck from '../components/utils/Membership';
import { useStateContext } from '../context/ContextProvider';
import Loading from '../components/utils/Loading';
import EmojiPicker from 'emoji-picker-react';
import { useThemeContext } from '../context/ThemeProvider';

const ViewPost = () => {
  const ReportCommentsModal = lazy(() => import('../components/ReportCommentsModal'));
  const ReportModal = lazy(() => import('../components/ReportModal'));
  const { id } = useParams();
  const timeAgo = new TimeAgo('en-US');
  const { user } = useStateContext();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const params = new URLSearchParams(window.location.search);
  const uid = params.get('uid')
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loading, setLoading] = useState(true);
  const storagePostUrl = import.meta.env.VITE_API_POSTS_URL;
  const storageUserUrl = import.meta.env.VITE_API_STORAGE_URL;
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const commentRef = useRef();
  const navigate = useNavigate()
  const menuRef = useRef();
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);
  const emojiMenuRef = useRef(null);
  const emojiMenuRefIcon = useRef(null);
  const [reportOpen, setReportOpen] = useState(false);
  const [reportCommentOpen, setReportCommentOpen] = useState(false);
  const commentIdRef = useRef();
  const queryClient = useQueryClient();
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    axiosClient.post(`/share-post/${post.id}`)
    queryClient.setQueryData([`post-${id}`], (data) => {
      return { ...data, shares_count: data.shares_count + 1 }
    })
    notifyShare();
  }


  const handleEditPost = () => {
    navigate(`/edit-post/${post.id}`);
  }

  const { theme } = useThemeContext();

  const handleReport = () => {
    setReportOpen(true);
    setOpen(false);
  }

  const notifyShare = () => toast('Link Copied', {
    icon: '🔗',
  });

  const notifyComment = () => toast('Comment Posted');


  const likePost = () => {
    const success = axiosClient.post(`/like-post/${id}`)
    return success;

  }

  const unlikePost = () => {
    const success = axiosClient.post(`/unlike-post/${id}`)
    return success;
  }


  const handleLike = () => {

    if (!liked) {
      updateLikeMutation.mutate()
    }
    else {
      updateUnlikeMutation.mutate()
    }
  }


  const openLink = () => {
    const newWindow = window.open(post.link, "_blank", 'noopener,noreferrer');
    if (newWindow) newWindow.opener = null;
  }

  const postComment = (ev) => {
    ev.preventDefault();
    setIsButtonDisabled(true);
    if (commentRef.current.value != '') {
      const formData = new FormData();
      formData.append('content', commentRef.current.value);
      axiosClient.post(`/post/${id}/comment`, formData)
        .then(() => {
          notifyComment();
          useComments.refetch();
          commentRef.current.value = '';
          setIsButtonDisabled(false);

        })
        .catch((err) => {
          setIsButtonDisabled(false);
          toast.error(err.response.data.message)
        });
    }
    else setIsButtonDisabled(false);
  }

  const getComments = async () => {
    const fetchedData = await axiosClient.get(`post/${id}/comments`)
    return fetchedData.data.data;
  }

  const getThisPost = async () => {
    const fetchedData = await axiosClient.get(`/posts/${id}`)
    return fetchedData.data.data;
  }


  const useComments = useQuery({
    queryKey: [`comments-${id}`],
    queryFn: getComments,
  })


  const usePost = useQuery(
    {
      queryKey: [`post-${id}`],
      queryFn: getThisPost,
      retry: false
    }
  );


  const updateLikeMutation = useMutation({
    mutationFn: likePost,
    onSuccess: () => {
      queryClient.setQueryData([`post-${id}`], (data) => {
        return { ...data, likes_count: data.likes_count + 1, liked_by_user: true }
      })
    },
  })

  const updateUnlikeMutation = useMutation({
    mutationFn: unlikePost,
    onSuccess: () => {
      queryClient.setQueryData([`post-${id}`], (data) => {
        return { ...data, likes_count: data.likes_count - 1, liked_by_user: false }
      })
    },
  })

  const handleNotify = (val) => {
    axiosClient.post(`/posts/${id}`, { _method: 'PUT', notifiable: val })
      .then(() => {
      })
  }

  const liked = usePost?.data?.liked_by_user;
  const post = usePost?.data;
  const ago = usePost?.data && timeAgo.format(new Date(usePost.data?.created_at.replace(" ", "T")), 'twitter-now');
  const community = usePost?.data?.community;
  const postUser = usePost?.data?.user;

  useEffect(() => {
    const listener = (ev) => {
      if (!menuRef?.current?.contains(ev.target)) {
        setOpen(false)
      }
    }
    function handleClickOutside(event) {
      if (emojiMenuRef.current && !emojiMenuRef.current.contains(event.target) && emojiMenuRef.current && !emojiMenuRefIcon.current.contains(event.target)) {
        setIsEmojiOpen(false);
      }
    }
    document.addEventListener('click', handleClickOutside);
    document.addEventListener("mousedown", listener)
    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener("mousedown", listener)
    }
  }, [])

  const handleEmojiClick = (emoji) => {
    commentRef.current.value = commentRef.current.value + emoji.emoji

  }

  const deletePost = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        toast.promise(axiosClient.delete(`/posts/${usePost.data.id}`), {
          loading: 'Updating community information',
          success: () => {
            queryClient.invalidateQueries('posts')
            navigate('/home')
            return <b>Community Updated</b>
          },
          error: (err) => {
            return `${err.response.data.message}`
          },
        },
        )
      }
    });
  }

  const handleCommentClick = (comment_id) => {
    commentIdRef.current = comment_id;
    setReportCommentOpen(true);
  }
  console.log(usePost.data);

  return (
    !usePost.isLoading ?
      <div className='authenticated-container'>
        {
          reportOpen &&
          <Suspense>
            <ReportModal type={'post'} poster_id={post.user.id} postId={post.id} isOpen={reportOpen} setIsOpen={setReportOpen} />
          </Suspense>
        }
        {
          reportCommentOpen &&
          <Suspense>
            <ReportCommentsModal comment_id={commentIdRef.current} type={'comment'} reportOpen={reportCommentOpen} setIsOpen={setReportCommentOpen} />
          </Suspense>
        }
        <div className="feed">
          <div className='section-header'>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M5 2C3.34315 2 2 3.34315 2 5V19C2 20.6569 3.34315 22 5 22H13V17L13 16.9384C12.9999 16.2843 12.9999 15.6965 13.0638 15.2208C13.1337 14.7015 13.2958 14.1687 13.7322 13.7322C14.1687 13.2958 14.7015 13.1337 15.2208 13.0638C15.6966 12.9999 16.2843 12.9999 16.9384 13L17 13H22V5C22 3.34315 20.6569 2 19 2H5ZM21.7305 15H17C16.2646 15 15.8137 15.0021 15.4873 15.046C15.2005 15.0846 15.1526 15.1394 15.1469 15.1459L15.1464 15.1464L15.1459 15.1469C15.1394 15.1526 15.0846 15.2005 15.046 15.4873C15.0021 15.8137 15 16.2646 15 17V21.7305C15.324 21.5831 15.6222 21.3778 15.8787 21.1213L21.1213 15.8787C21.3778 15.6222 21.5831 15.324 21.7305 15Z" fill="#222222" />
            </svg>
            <h3>Post</h3>
          </div>
          <div className="post">
            <div className="post-header" id="posts">
              <div className="left">
                {loadingProfile && <Skeleton circle className="post-image" />}
                <img className={loadingProfile ? 'hide' : 'post-image'} src={`${storageUserUrl}${postUser?.profile_picture}`} alt="" onLoad={() => setLoadingProfile(false)} />
                <div className='post-user'>
                  <h4>{postUser?.first_name}</h4>
                  <span id='post-time'>{ago} </span>
                </div>
                {
                  uid == usePost.data.user.id ?
                    (usePost.data.notifiable ?
                      <svg onClick={() => handleNotify('false')} className='notification-bell' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.44784 7.96942C6.76219 5.14032 9.15349 3 12 3V3C14.8465 3 17.2378 5.14032 17.5522 7.96942L17.804 10.2356C17.8072 10.2645 17.8088 10.279 17.8104 10.2933C17.9394 11.4169 18.3051 12.5005 18.8836 13.4725C18.8909 13.4849 18.8984 13.4973 18.9133 13.5222L19.4914 14.4856C20.0159 15.3599 20.2782 15.797 20.2216 16.1559C20.1839 16.3946 20.061 16.6117 19.8757 16.7668C19.5971 17 19.0873 17 18.0678 17H5.93223C4.91268 17 4.40291 17 4.12434 16.7668C3.93897 16.6117 3.81609 16.3946 3.77841 16.1559C3.72179 15.797 3.98407 15.3599 4.50862 14.4856L5.08665 13.5222C5.10161 13.4973 5.10909 13.4849 5.11644 13.4725C5.69488 12.5005 6.06064 11.4169 6.18959 10.2933C6.19123 10.279 6.19283 10.2645 6.19604 10.2356L6.44784 7.96942Z" stroke="#33363F" strokeWidth="2" />
                        <path d="M8 17C8 17.5253 8.10346 18.0454 8.30448 18.5307C8.5055 19.016 8.80014 19.457 9.17157 19.8284C9.54301 20.1999 9.98396 20.4945 10.4693 20.6955C10.9546 20.8965 11.4747 21 12 21C12.5253 21 13.0454 20.8965 13.5307 20.6955C14.016 20.4945 14.457 20.1999 14.8284 19.8284C15.1999 19.457 15.4945 19.016 15.6955 18.5307C15.8965 18.0454 16 17.5253 16 17" stroke="#33363F" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                      :
                      <svg onClick={() => handleNotify('true')} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.44784 7.96942C6.76219 5.14032 9.15349 3 12 3V3C14.8465 3 17.2378 5.14032 17.5522 7.96942L17.804 10.2356C17.8072 10.2645 17.8088 10.279 17.8104 10.2933C17.9394 11.4169 18.3051 12.5005 18.8836 13.4725C18.8909 13.4849 18.8984 13.4973 18.9133 13.5222L19.4914 14.4856C20.0159 15.3599 20.2782 15.797 20.2216 16.1559C20.1839 16.3946 20.061 16.6117 19.8757 16.7668C19.5971 17 19.0873 17 18.0678 17H5.93223C4.91268 17 4.40291 17 4.12434 16.7668C3.93897 16.6117 3.81609 16.3946 3.77841 16.1559C3.72179 15.797 3.98407 15.3599 4.50862 14.4856L5.08665 13.5222C5.10161 13.4973 5.10909 13.4849 5.11644 13.4725C5.69488 12.5005 6.06064 11.4169 6.18959 10.2933C6.19123 10.279 6.19283 10.2645 6.19604 10.2356L6.44784 7.96942Z" stroke="#FF5C5C" strokeWidth="2" />
                        <path d="M8 17C8 17.5253 8.10346 18.0454 8.30448 18.5307C8.5055 19.016 8.80014 19.457 9.17157 19.8284C9.54301 20.1999 9.98396 20.4945 10.4693 20.6955C10.9546 20.8965 11.4747 21 12 21C12.5253 21 13.0454 20.8965 13.5307 20.6955C14.016 20.4945 14.457 20.1999 14.8284 19.8284C15.1999 19.457 15.4945 19.016 15.6955 18.5307C15.8965 18.0454 16 17.5253 16 17" stroke="#FF5C5C" strokeWidth="2" strokeLinecap="round" />
                        <path d="M3.82849 19.6715L19.5 4.00002" stroke="#FF5C5C" strokeWidth="2" strokeLinecap="round" />
                      </svg>)
                    :
                    null
                }
              </div>
              <div className="right">
                <span>/{community?.name}</span>
                <div className="flair">
                  <span className="flair__text">
                    {post.subtopics}
                  </span>
                </div>
              </div>
            </div>
            <span className="post-title">{post.title}</span>
            {
              post?.post_type === 'image' ?
                <div className="post-content">
                  {loading ? <Skeleton className="post-image" /> : null}
                  <ImageModal isOpen={isOpen} setIsOpen={setIsOpen} image={`${storagePostUrl}${post.image}`} />
                  <img className={loading ? 'hide' : 'post-image'} onClick={() => setIsOpen(true)} src={`${storagePostUrl}${post.image}`} alt="" onLoad={() => setLoading(false)} />
                </div>
                :
                post?.post_type === 'video' ?
                  <div className="post-content">
                    <video controls className='post-video' src={`${storagePostUrl}${post.video}`} typeof='video/mp4' />
                  </div>
                  :
                  post?.post_type === 'text' ?
                    <div className="post-content">
                      <p className='post-text'>{post.content || <Skeleton containerClassName='post-text' count={5} />}</p>
                    </div>
                    :
                    <>
                      <div className="post-content">
                        <p className='post-text'>{post.content || <Skeleton containerClassName='post-text' count={5} />}</p>
                      </div>
                      <div className="link-button-container">
                        <p>{post.content && `Link to ${post.link}`}</p>
                        <button onClick={() => openLink()} className='orange-button'>Open Link</button>
                      </div>
                    </>


            }

            <div className="post-footer">
              <div className="footer-item">
                <svg onClick={handleLike} className={liked ? 'heart-filled' : "heart"} xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
                  <path d="M6.30508 19.7033L16.1546 28.9559C16.4939 29.2746 16.6635 29.434 16.8636 29.4732C16.9536 29.4909 17.0463 29.4909 17.1364 29.4732C17.3364 29.434 17.506 29.2746 17.8453 28.9559L27.6948 19.7033C30.4661 17.1 30.8026 12.816 28.4719 9.81193L28.0336 9.24707C25.2453 5.65332 19.6486 6.25602 17.6894 10.361C17.4127 10.9409 16.5873 10.9409 16.3105 10.361C14.3513 6.25602 8.75457 5.65332 5.96632 9.24706L5.52806 9.81193C3.1973 12.816 3.53383 17.1 6.30508 19.7033Z" stroke="#677186" strokeWidth="2.83333" />
                </svg>
                <span className="count">{post?.likes_count}</span>
              </div>
              <div className="footer-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none">
                  <path d="M7.03935 10.4096L7.68904 10.7407V10.7407L7.03935 10.4096ZM7.68279 27.3172L8.19839 27.8328H8.19839L7.68279 27.3172ZM21.4375 24.0625V24.7917V24.0625ZM26.0487 23.5857L25.7177 22.936H25.7177L26.0487 23.5857ZM27.9607 21.6737L27.311 21.3427L27.9607 21.6737ZM27.9607 10.4096L27.311 10.7407V10.7407L27.9607 10.4096ZM26.0487 8.49768L25.7177 9.14737L25.7177 9.14737L26.0487 8.49768ZM8.95129 8.49768L9.28233 9.14737H9.28233L8.95129 8.49768ZM10.5104 24.4896L11.026 25.0052L10.5104 24.4896ZM11.5416 24.0625V24.7917V24.0625ZM7.29167 15.0208C7.29167 13.7837 7.29223 12.8997 7.34885 12.2067C7.40477 11.5223 7.51172 11.0887 7.68904 10.7407L6.38965 10.0786C6.09013 10.6664 5.95865 11.3133 5.89536 12.088C5.83277 12.8541 5.83333 13.8078 5.83333 15.0208H7.29167ZM7.29167 16.7708V15.0208H5.83333V16.7708H7.29167ZM5.83333 16.7708V24.0625H7.29167V16.7708H5.83333ZM5.83333 24.0625V26.8532H7.29167V24.0625H5.83333ZM5.83333 26.8532C5.83333 28.0875 7.32563 28.7056 8.19839 27.8328L7.16719 26.8016C7.17142 26.7974 7.18684 26.7867 7.20887 26.7829C7.22692 26.7797 7.23947 26.7828 7.24665 26.7858C7.25384 26.7888 7.2649 26.7955 7.27545 26.8104C7.28833 26.8287 7.29167 26.8472 7.29167 26.8532H5.83333ZM8.19839 27.8328L11.026 25.0052L9.99477 23.974L7.16719 26.8016L8.19839 27.8328ZM21.4375 23.3333L11.5416 23.3333L11.5416 24.7917L21.4375 24.7917V23.3333ZM25.7177 22.936C25.3697 23.1133 24.9361 23.2202 24.2516 23.2762C23.5587 23.3328 22.6746 23.3333 21.4375 23.3333V24.7917C22.6506 24.7917 23.6042 24.7922 24.3704 24.7296C25.145 24.6664 25.7919 24.5349 26.3797 24.2353L25.7177 22.936ZM27.311 21.3427C26.9614 22.0287 26.4037 22.5864 25.7177 22.936L26.3797 24.2353C27.3402 23.746 28.121 22.9652 28.6103 22.0047L27.311 21.3427ZM27.7083 17.0625C27.7083 18.2996 27.7078 19.1837 27.6511 19.8766C27.5952 20.5611 27.4883 20.9947 27.311 21.3427L28.6103 22.0047C28.9099 21.4169 29.0413 20.77 29.1046 19.9954C29.1672 19.2292 29.1667 18.2756 29.1667 17.0625H27.7083ZM27.7083 15.0208V17.0625H29.1667V15.0208H27.7083ZM27.311 10.7407C27.4883 11.0887 27.5952 11.5223 27.6511 12.2067C27.7078 12.8997 27.7083 13.7837 27.7083 15.0208H29.1667C29.1667 13.8078 29.1672 12.8541 29.1046 12.088C29.0413 11.3133 28.9099 10.6664 28.6103 10.0786L27.311 10.7407ZM25.7177 9.14737C26.4037 9.49691 26.9614 10.0547 27.311 10.7407L28.6103 10.0786C28.121 9.11818 27.3402 8.33734 26.3797 7.84799L25.7177 9.14737ZM21.4375 8.75C22.6746 8.75 23.5587 8.75057 24.2516 8.80719C24.9361 8.86311 25.3697 8.97006 25.7177 9.14737L26.3797 7.84799C25.7919 7.54846 25.145 7.41699 24.3704 7.3537C23.6042 7.2911 22.6506 7.29167 21.4375 7.29167V8.75ZM13.5625 8.75H21.4375V7.29167H13.5625V8.75ZM9.28233 9.14737C9.63033 8.97006 10.0639 8.86311 10.7484 8.80719C11.4413 8.75057 12.3254 8.75 13.5625 8.75V7.29167C12.3494 7.29167 11.3958 7.2911 10.6296 7.3537C9.855 7.41699 9.20811 7.54846 8.62026 7.84799L9.28233 9.14737ZM7.68904 10.7407C8.03858 10.0547 8.59632 9.49691 9.28233 9.14737L8.62026 7.84799C7.65985 8.33734 6.87901 9.11818 6.38965 10.0786L7.68904 10.7407ZM11.026 25.0052C11.1627 24.8685 11.3482 24.7917 11.5416 24.7917L11.5416 23.3333C10.9614 23.3333 10.405 23.5638 9.99477 23.974L11.026 25.0052Z" fill="#677186" />
                  <path d="M12.3958 13.8542L22.6041 13.8542" stroke="#677186" strokeWidth="1.45833" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12.3958 18.2292H19.6874" stroke="#677186" strokeWidth="1.45833" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="count">{useComments?.data?.length}</span>
              </div>
              <div className="footer-item">
                <svg onClick={() => handleShare()} xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd" d="M17.6348 3.34075C17.1454 3.42781 16.4515 3.65554 15.3404 4.0259L6.95621 6.82062C5.8875 7.17686 5.13347 7.42862 4.5911 7.64024C4.32286 7.7449 4.13604 7.82851 4.00613 7.89704C3.89612 7.95507 3.85656 7.98705 3.8542 7.9887C3.32996 8.4962 3.32996 9.33714 3.8542 9.84464C3.85657 9.84629 3.89613 9.87826 4.00613 9.9363C4.13604 10.0048 4.32286 10.0884 4.5911 10.1931C5.13347 10.4047 5.8875 10.6565 6.95621 11.0127C6.98075 11.0209 7.00508 11.029 7.02921 11.037C7.38232 11.1545 7.69234 11.2576 7.97775 11.4085C8.66553 11.7722 9.22789 12.3346 9.59163 13.0224C9.74256 13.3078 9.84568 13.6178 9.96312 13.9709C9.97115 13.9951 9.97924 14.0194 9.98742 14.0439C10.3437 15.1126 10.5954 15.8667 10.807 16.409C10.9117 16.6773 10.9953 16.8641 11.0638 16.994C11.1219 17.104 11.1538 17.1436 11.1555 17.1459C11.663 17.6702 12.5039 17.6702 13.0114 17.1459C13.0131 17.1436 13.0451 17.104 13.1031 16.994C13.1716 16.8641 13.2552 16.6773 13.3599 16.409C13.5715 15.8667 13.8233 15.1126 14.1795 14.0439L16.9742 5.65974C17.3446 4.54868 17.5723 3.85476 17.6594 3.36534C17.6612 3.35516 17.6629 3.34524 17.6645 3.3356C17.6549 3.33722 17.645 3.33894 17.6348 3.34075ZM17.9693 3.3109C17.969 3.31113 17.9648 3.31078 17.9573 3.30914C17.9658 3.30984 17.9696 3.31066 17.9693 3.3109ZM17.691 3.0428C17.6894 3.03536 17.689 3.03111 17.6892 3.03084C17.6895 3.03058 17.6903 3.03429 17.691 3.0428ZM17.1823 0.797347C17.894 0.670741 18.8686 0.63304 19.6179 1.38228C20.3671 2.13152 20.3294 3.10609 20.2028 3.81779C20.0784 4.51717 19.7859 5.3944 19.4558 6.38423L19.425 6.47666L16.6303 14.8608L16.6181 14.8974C16.2768 15.9214 16.0047 16.7377 15.7665 17.348C15.5427 17.9218 15.2773 18.5164 14.8775 18.9324C13.3527 20.5191 10.8142 20.5191 9.28942 18.9324C8.88968 18.5164 8.62426 17.9218 8.4004 17.348C8.16225 16.7376 7.89016 15.9214 7.54881 14.8973L7.53666 14.8608C7.38114 14.3943 7.34611 14.3022 7.30798 14.2301C7.18674 14.0009 6.99929 13.8134 6.77003 13.6922C6.69793 13.654 6.60585 13.619 6.13929 13.4635L6.10277 13.4513C5.07872 13.11 4.26248 12.8379 3.6521 12.5997C3.07836 12.3759 2.48372 12.1105 2.06774 11.7107C0.481001 10.1859 0.481001 7.6474 2.06774 6.12262C2.48372 5.72288 3.07836 5.45746 3.6521 5.23361C4.26249 4.99545 5.07875 4.72337 6.10282 4.38201L6.13929 4.36986L14.5235 1.57513L14.616 1.54429C15.6058 1.21425 16.483 0.921757 17.1823 0.797347Z" fill="#677186" />
                </svg>
                <span className="count" style={{ marginLeft: '0.25rem' }}>{post?.shares_count}</span>
              </div>
              <div className="footer-item dropdown-parent">
                <FontAwesomeIcon icon={faEllipsis} onClick={() => setOpen(!open)} />
                {
                  open && <div ref={menuRef} className="ellipsis-dropdown">

                    <ul>
                      {
                        user?.id != postUser.id &&
                        <li onClick={handleReport} >
                          Report Post
                        </li>
                      }
                      {
                        user?.id == postUser.id &&
                        <li onClick={handleEditPost}>
                          Edit Post
                        </li>
                      }
                      {
                        user?.id == postUser.id ?
                          <li onClick={deletePost} >
                            Delete Post
                          </li>
                          :
                          null
                      }
                    </ul>
                  </div>

                }
              </div>
            </div>
            <div></div>
            <div className='write-comment-section'>
              <textarea ref={commentRef} type="text" placeholder='What are your thoughts?' />
              <div ref={emojiMenuRef}>
                <EmojiPicker
                  className='emoji-picker'
                  onEmojiClick={handleEmojiClick}
                  open={isEmojiOpen}
                  lazyLoadEmojis={true}
                  theme={theme == 'light-theme' ? 'light' : 'dark'}
                  emojiStyle='native'
                />
              </div>
              <svg ref={emojiMenuRefIcon} onClick={() => setIsEmojiOpen(true)} className='emoji-icon' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="9.5" stroke="#222222" stroke-linecap="round" />
                <circle cx="9" cy="9" r="1" fill="#222222" stroke="#222222" stroke-linecap="round" />
                <circle cx="15" cy="9" r="1" fill="#222222" stroke="#222222" stroke-linecap="round" />
                <path d="M15 15.5C15 16.8807 13.6569 18 12 18C10.3431 18 9 16.8807 9 15.5C9 14.1193 10.3431 13 12 13C13.6569 13 15 14.1193 15 15.5Z" fill="#222222" />
              </svg>
            </div>
            <div className='post-footer'>
              <form>
                <button className="purple-button" onClick={(ev) => postComment(ev)} disabled={isButtonDisabled}>
                  Comment
                </button>
              </form>
            </div>
          </div>
          <div className='section-comments'>
            <hr />
            <svg className='section-icon' width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M3 10.4C3 8.15979 3 7.03969 3.43597 6.18404C3.81947 5.43139 4.43139 4.81947 5.18404 4.43597C6.03969 4 7.15979 4 9.4 4H14.6C16.8402 4 17.9603 4 18.816 4.43597C19.5686 4.81947 20.1805 5.43139 20.564 6.18404C21 7.03969 21 8.15979 21 10.4V11.6C21 13.8402 21 14.9603 20.564 15.816C20.1805 16.5686 19.5686 17.1805 18.816 17.564C17.9603 18 16.8402 18 14.6 18H7.41421C7.149 18 6.89464 18.1054 6.70711 18.2929L4.70711 20.2929C4.07714 20.9229 3 20.4767 3 19.5858V18V13V10.4ZM9 8C8.44772 8 8 8.44772 8 9C8 9.55228 8.44772 10 9 10H15C15.5523 10 16 9.55228 16 9C16 8.44772 15.5523 8 15 8H9ZM9 12C8.44772 12 8 12.4477 8 13C8 13.5523 8.44772 14 9 14H12C12.5523 14 13 13.5523 13 13C13 12.4477 12.5523 12 12 12H9Z" fill="#222222" />
            </svg>
            <hr />
          </div>
          <div className="comments-container">
            {useComments.data && useComments?.data.map((c) => {
              return c.commenter.id != user.id ? (
                <div key={c.id} onClick={() => handleCommentClick(c.id)} className="comment-card comment-card--pointer">
                  <img className='user-img-comment' src={`${storageUserUrl}${c.commenter.profile_picture}`} />
                  <div className="name-comment">
                    <div className="name-time">{c.commenter.first_name} <span>{timeAgo.format(new Date(c.created_at.replace(' ', 'T')), 'twitter-now')} </span></div>
                    {c.content}
                  </div>
                </div>
              )
                :
                <div key={c.id} className="comment-card">
                  <img className='user-img-comment' src={`${storageUserUrl}${c.commenter.profile_picture}`} />
                  <div className="name-comment">
                    <div className="name-time">{c.commenter.first_name} <span>{timeAgo.format(new Date(c.created_at.replace(' ', 'T')), 'twitter-now')} </span></div>
                    {c.content}
                  </div>
                </div>
            })}
          </div>
        </div>
        <div className="recommended">
          <div className="card" id='side-community-card'>
            <div className='top'>
              <span onClick={() => navigate(`/c/${community.name}`, { state: { id: `${community.id}` } })} className='side-community-name'>/{community.name}</span>
              <MembershipCheck isMember={community.is_user_member} community_id={community.id} user_id={uid} />
            </div>
            <span className='side-community-description'>{community.description}</span>
            <span className='bottom'><strong>{community.members_count}</strong> Members</span>
          </div>
        </div>
      </div>
      :
      <div className="authenticated-container">
        <div className="feed">
          <Loading />
        </div>
        <div className="recommended"></div>
      </div>
  )




}

export default ViewPost;