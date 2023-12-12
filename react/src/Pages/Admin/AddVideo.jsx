import Swal from 'sweetalert2';
import { useState, useEffect } from 'react'
import axiosClient from '../../axios-client';
import { useStateContext } from '../../context/ContextProvider'


const AddVideo = () => {
    const [communities, setCommunities] = useState([]);
    const {user} = useStateContext();

    const getCommunities = () => {
        axiosClient.get('/communities').then(({ data }) => {
            setCommunities(data.data);
        }).catch(err => {
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
    const onSubmit = () => {
        return null;
    }

    return(
        
        <div className="add-article-container">
            <h2>Add a Video</h2>
            <form onSubmit={onSubmit}>
                <div className="article-form">
                    <div className="article-input">
                        <label>Video Title:</label>
                        <input type="text" />
                    </div>
                    <div className="article-input">
                        <label>Video Creator:</label>
                        <input type="text" />
                    </div>
                    <div className="article-input">
                        <label>Description:</label>
                        <input type="textarea" />
                    </div>
                    <div className="article-input">
                        <label>Link:</label>
                        <input type="textarea" />
                    </div>
                    <div className="article-input">
                        <label>Community:</label>
                        <select name="communities">
                            
                            {communities.map((community) => (
                                <option value={community.id}>{community.name}</option>      
                            ))}
                        </select>
                    </div>
                    <button className='purple-button'>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default AddVideo;