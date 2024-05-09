import { Link } from "react-router-dom";
import axiosClient from "../../axios-client";
import Loading from "../../components/utils/Loading";
import { useQuery } from '@tanstack/react-query';
import { useState } from "react";
import ReactSelect from "react-select";

const MentorApplicants = () => {
    const storageBaseUrl = import.meta.env.VITE_API_STORAGE_URL;
    const [statusFilterKey, setStatusFilterKey] = useState({value: null, label: 'Select Status'});

    const getMentors = async () => {
        const fetchedData = await axiosClient.get('/mentorship-applications');
        return fetchedData.data.data
    }

    const useApplicants = useQuery({
        queryKey: ['mentor-applicants'],
        queryFn: getMentors,
    })
    const options = [
        {value: "approved", label: "Approved"},
        {value: "revoked", label: "Revoked"},
        {value: "pending", label: "Pending"}

    ];
    const handleSelectChangeStatus = (value) => {
        setStatusFilterKey(value)
    }

    const handleClear = () => {
        setStatusFilterKey({value: null, label: 'Select Status'})
    }

    return (
        <div className="communities-container">
            <div className="top-section">
                <div><h1>Community Mentors</h1></div>
            </div>
            <div className="filters">
                <span><strong>Filters:</strong></span>
                <ReactSelect
                    value={statusFilterKey}
                    placeholder="Report reason"
                    className="react-select-container"
                    classNamePrefix="react-select"
                    options={options}
                    onChange={handleSelectChangeStatus}
                />
                <button onClick={handleClear} className="btn btn--purple">Clear</button>
            </div>
            <div className='users-table'>
                {
                    !useApplicants.isLoading ?
                        useApplicants.data.filter(mentor => {
                            if (statusFilterKey.value !== null) {
                                return mentor.status === statusFilterKey.value;
                            } else {
                                return true;
                            }
                        }).map(a => (
                            <div key={a.id} className="community-item">
                                <div className="community-item-details">
                                    <div className="community-details-top">
                                        <span id='user-img-span'><img
                                            src={`${storageBaseUrl + a.user?.profile_picture}`} alt=""/></span>
                                        <span><strong>Full Name:  <br/> </strong> {a.user.first_name} {a.user.middle_name} {a.user.last_name}</span>
                                        <span><strong>Status:  <br/></strong> {a.status}</span>
                                        <span><strong>Community:  <br/></strong>{a.community.name}</span>
                                        <span><strong>Specialization:  <br/></strong>{a.specialization}</span>
                                    </div>
                                    <div className="buttons-community">
                                        <Link to={`/mentor-applicants/${a.id}`} className="orange-button">View
                                            Details</Link>
                                    </div>
                                </div>
                            </div>
                        ))
                        :
                        <Loading/>
                }
            </div>
        </div>
    )
}

export default MentorApplicants;