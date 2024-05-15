import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../context/ContextProvider";

const Mentor = (mentor) => {
    const { user } = useStateContext();
    const navigate = useNavigate()
    const queryClient = useQueryClient();

    const handleClick = () => {
        navigate(`/u/${mentor.id}/?uid=${user.id}`)
    }

    const handleLike = () => {
        if (mentor.liked_by_user) {

            toast.promise(axiosClient.post(`/unlike-mentor/${mentor.mentor_id}`), {
                    loading: 'Taking back star...',
                    success: () => {
                        queryClient.invalidateQueries({ queryKey: ['mentor-list'] });
                        return <b>Took back star</b>
                    },
                    error: (err) => {
                        return `${err.response.data.message}`
                    },
                },
            )
        } else {
            toast.promise(axiosClient.post(`/like-mentor/${mentor.mentor_id}`), {
                    loading: 'Giving a star...',
                    success: () => {
                        queryClient.invalidateQueries({ queryKey: ['mentor-list'] });
                        return <b>Star given</b>
                    },
                    error: (err) => {
                        return `${err.response.data.message}`
                    },
                },
            )
        }
    }


    return (
        <div className="mentor-item-card">
            <img src={mentor.img} onClick={handleClick}/>
            <span onClick={handleClick} className="mentor-item-card__likes">
        <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M8.22704 3.95608C8.89956 2.27951 9.23581 1.44122 9.78212 1.32504C9.92577 1.29449 10.0742 1.29449 10.2179 1.32504C10.7642 1.44122 11.1004 2.27951 11.773 3.95608C12.1554 4.90952 12.3466 5.38623 12.7044 5.71048C12.8048 5.80142 12.9137 5.88242 13.0297 5.95234C13.4433 6.20159 13.9596 6.24783 14.9921 6.3403C16.74 6.49684 17.6139 6.5751 17.8808 7.0734C17.936 7.1766 17.9736 7.28834 17.9919 7.40397C18.0804 7.96227 17.438 8.54679 16.153 9.71582L15.7962 10.0405C15.1954 10.587 14.8951 10.8603 14.7213 11.2013C14.6171 11.4059 14.5472 11.6262 14.5145 11.8535C14.4599 12.2323 14.5479 12.6287 14.7238 13.4216L14.7866 13.7049C15.1021 15.1268 15.2599 15.8377 15.0629 16.1872C14.8861 16.5011 14.5603 16.702 14.2004 16.7192C13.7997 16.7384 13.2352 16.2783 12.1061 15.3583C11.3622 14.7521 10.9903 14.4491 10.5774 14.3307C10.2001 14.2225 9.79993 14.2225 9.4226 14.3307C9.00971 14.4491 8.63776 14.7521 7.89389 15.3583C6.7648 16.2783 6.20026 16.7384 5.79961 16.7192C5.43972 16.702 5.11393 16.5011 4.93705 16.1872C4.74015 15.8377 4.89789 15.1268 5.21336 13.7049L5.27621 13.4216C5.45213 12.6287 5.54009 12.2323 5.4855 11.8535C5.45276 11.6262 5.38288 11.4059 5.27866 11.2013C5.10493 10.8603 4.80456 10.587 4.20382 10.0405L3.847 9.71582C2.56205 8.54679 1.91957 7.96227 2.00805 7.40397C2.02638 7.28834 2.06396 7.1766 2.11923 7.0734C2.38611 6.5751 3.26005 6.49684 5.00792 6.3403C6.04044 6.24783 6.55671 6.20159 6.97026 5.95234C7.08626 5.88242 7.19521 5.80142 7.29557 5.71048C7.65337 5.38623 7.8446 4.90952 8.22704 3.95608Z"
              fill="#222222" stroke="#222222" strokeWidth="2.09482"/>
        </svg>
        <span onClick={handleClick} className="mentor-likes-count">{mentor.like_counts}</span>
      </span>
            <span onClick={handleClick} className="mentor-name">{mentor.name}</span>
            <span onClick={handleClick}>{mentor.specialization}</span>
            <span onClick={handleClick} className="mentor-community"><strong>/{mentor.community}</strong></span>
            {
                mentor.id != user.id &&
                    <button onClick={handleLike} className={mentor.liked_by_user ? 'btn btn--orange' : 'btn'  }>
                        {mentor.liked_by_user ? 'Take back ' : 'Give a '}&  nbsp;
                        <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M8.22704 3.95608C8.89956 2.27951 9.23581 1.44122 9.78212 1.32504C9.92577 1.29449 10.0742 1.29449 10.2179 1.32504C10.7642 1.44122 11.1004 2.27951 11.773 3.95608C12.1554 4.90952 12.3466 5.38623 12.7044 5.71048C12.8048 5.80142 12.9137 5.88242 13.0297 5.95234C13.4433 6.20159 13.9596 6.24783 14.9921 6.3403C16.74 6.49684 17.6139 6.5751 17.8808 7.0734C17.936 7.1766 17.9736 7.28834 17.9919 7.40397C18.0804 7.96227 17.438 8.54679 16.153 9.71582L15.7962 10.0405C15.1954 10.587 14.8951 10.8603 14.7213 11.2013C14.6171 11.4059 14.5472 11.6262 14.5145 11.8535C14.4599 12.2323 14.5479 12.6287 14.7238 13.4216L14.7866 13.7049C15.1021 15.1268 15.2599 15.8377 15.0629 16.1872C14.8861 16.5011 14.5603 16.702 14.2004 16.7192C13.7997 16.7384 13.2352 16.2783 12.1061 15.3583C11.3622 14.7521 10.9903 14.4491 10.5774 14.3307C10.2001 14.2225 9.79993 14.2225 9.4226 14.3307C9.00971 14.4491 8.63776 14.7521 7.89389 15.3583C6.7648 16.2783 6.20026 16.7384 5.79961 16.7192C5.43972 16.702 5.11393 16.5011 4.93705 16.1872C4.74015 15.8377 4.89789 15.1268 5.21336 13.7049L5.27621 13.4216C5.45213 12.6287 5.54009 12.2323 5.4855 11.8535C5.45276 11.6262 5.38288 11.4059 5.27866 11.2013C5.10493 10.8603 4.80456 10.587 4.20382 10.0405L3.847 9.71582C2.56205 8.54679 1.91957 7.96227 2.00805 7.40397C2.02638 7.28834 2.06396 7.1766 2.11923 7.0734C2.38611 6.5751 3.26005 6.49684 5.00792 6.3403C6.04044 6.24783 6.55671 6.20159 6.97026 5.95234C7.08626 5.88242 7.19521 5.80142 7.29557 5.71048C7.65337 5.38623 7.8446 4.90952 8.22704 3.95608Z"
                                fill="#FFF" stroke="#FFF" strokeWidth="2.09482"/>
                        </svg>
                    </button>
            }

        </div>
    )
}

export default Mentor;