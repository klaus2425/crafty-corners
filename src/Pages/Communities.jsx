import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import Swal from 'sweetalert2';
import Loading from "../components/utils/Loading";
import { useStateContext } from "../context/ContextProvider";


const Communities = () => {

    const [communities, setCommunities] = useState([]);
    const storageBaseUrl= import.meta.env.VITE_API_COMMUNITIES_URL;
    const [loading, setLoading] = useState(false);
    const {user} = useStateContext();
    
    const joinCommunity = (id) => {
      const formData = new FormData();
      formData.append('community_id', id);
      formData.append('user_id', user.id);
      
      axiosClient.post('/join-community', formData)
      .then(({data}) => {
      })
      .catch(err => {
        const response  = err.response;
        Swal.fire({
          title: "Error",
          text: `${Object.values(response.data)[0]}`,
          icon: "warning"
        });
      })
    }

    const getCommunities = () => {
        setLoading(true);
        axiosClient.get('/communities')
        .then(res => {
            setLoading(false);
            setCommunities(res.data.data);
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
        })
    }

    useEffect(() => {
        getCommunities();
    }, [])
    return (
      <div className="authenticated-container">
              <div className="feed">
                  <div className='section-header'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="9" r="4" fill="#33363F"/>
                        <circle cx="17" cy="9" r="3" fill="#33363F"/>
                        <circle cx="7" cy="9" r="3" fill="#33363F"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M17.5685 18H19.895C20.4867 18 20.9403 17.4901 20.7966 16.9162C20.4284 15.4458 19.448 13 17 13C16.114 13 15.4201 13.3205 14.8781 13.7991C16.3858 14.7773 17.1654 16.4902 17.5685 18Z" fill="#33363F"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.12197 13.7991C8.57989 13.3205 7.88609 13 7 13C4.55208 13 3.57166 15.4458 3.20343 16.9162C3.05971 17.4901 3.51335 18 4.10498 18H6.43155C6.83464 16.4902 7.61422 14.7773 9.12197 13.7991Z" fill="#33363F"/>
                        <path d="M12 14C15.7087 14 16.6665 17.301 16.9139 19.0061C16.9932 19.5526 16.5523 20 16 20H8C7.44772 20 7.00684 19.5526 7.08614 19.0061C7.33351 17.301 8.29134 14 12 14Z" fill="#33363F"/>
                    </svg>
                    <h3>Communities</h3>
                  </div>
                  <div className="list-card">
                     <div className="card-search">
                        <input className="search" type="text" placeholder="Search Communities" />
                        <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
                          <circle cx="15.583" cy="15.5833" r="8.5" stroke="#677186" stroke-width="1.41667"/>
                          <path d="M15.583 11.3333C15.0249 11.3333 14.4722 11.4432 13.9566 11.6568C13.441 11.8704 12.9725 12.1835 12.5778 12.5781C12.1832 12.9728 11.8701 13.4413 11.6565 13.9569C11.4429 14.4725 11.333 15.0252 11.333 15.5833" stroke="#677186" stroke-width="1.41667" strokeLinecap="round"/>
                          <path d="M28.333 28.3333L24.083 24.0833" stroke="#677186" stroke-width="1.41667" strokeLinecap="round"/>
                        </svg>
                     </div>
                    {loading ? <Loading /> :
                      <div className="list-card-items">
                        { communities.map(c => (
                           <div className="list-card-item">
                           <div className="list-card-item-image">
                             <img src={storageBaseUrl+c.community_photo} alt="" />
                           </div>
                           <div className="list-card-item-text">
                             <text>{c.name}</text>
                             <p>{c.description}</p>
                           </div>
                           <div className="list-card-item-time">
                             <button className="purple-button">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M12 6L12 18" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>
                                    <path d="M18 12L6 12" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>
                                </svg>
                                <span onClick={() => joinCommunity(c.id)} className="com-button-text">Join</span>
                             </button>
                           </div>
                         </div> 
                        ))}
                      </div>
                      }
                  </div>
                 
              </div>
              <div className="recommended">
              </div>
          </div>
    )
  }
  
  export default Communities;