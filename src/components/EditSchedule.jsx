import { useEffect, useState } from "react";
import axiosClient from '../axios-client';
import Swal from 'sweetalert2';
import Loading from "./utils/Loading";
import { HexColorPicker } from "react-colorful";
import toast from "react-hot-toast";

const EditSchedule = (props) => {
    const [schedule, setSchedule] = useState({});
    const [loading, setLoading] = useState(false);
    const [startTime, setStartTime] = useState();
    const [endTime, setEndTime] = useState();

    const getSchedule = () => {
        setLoading(true);
        axiosClient.get(`/schedule/${props.id}`)
            .then(({ data }) => {
                const startTime = new Date(data.data.start);
                const endTime = new Date(data.data.end);
                setLoading(false);
                setSchedule(data.data);
                setStartTime(startTime.toLocaleTimeString('en-US', {
                    hour12: false,
                    hour: '2-digit',
                    minute: '2-digit',
                }));
                setEndTime(endTime.toLocaleTimeString('en-US', {
                    hour12: false,
                    hour: '2-digit',
                    minute: '2-digit',
                }))
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

    const onDelete = () => {
        axiosClient.delete(`schedule/${props.id}`)
            .then(() => {
                props.getAllSched();
                props.setOpen(false);
            })
            .catch(err => {
                const response = err.response;
                Swal.fire({
                    title: "Error",
                    text: `${Object.values(response.data.errors)[0]}`,
                    icon: "warning"
                });
            })
    }


    useEffect(() => {
        getSchedule();
    }, [props])

    const onSubmit = (ev) => {
        ev.preventDefault();
        const dateStart = schedule.start.split(' ')[0];
        const formData = new FormData();
        console.log('Start', dateStart + ' ' + startTime);
        console.log('End', dateStart + ' ' + endTime);
        formData.append("_method", "PUT");
        formData.append('title', schedule.title);
        formData.append('start', dateStart + ' ' + startTime);
        formData.append('end', dateStart + ' ' + endTime);
        formData.append('backgroundColor', schedule.backgroundColor);

        axiosClient.post(`/schedule/${props.id}`, formData)
            .then(() => {
                props.setOpen(false);
                props.getAllSched();
                toast.success('Schedule Updated')
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                    toast.error(`${Object.values(response.data.errors)[0]}`)
                }
            })
    }


    if (!props.isOpen) return null;
    return (

        <div className="overlay">
            <div className="modal">
                <div className='close'>
                    <svg onClick={() => props.setOpen(false)} xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none">
                        <path d="M12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 10.8181 3.23279 9.64778 3.68508 8.55585C4.13738 7.46392 4.80031 6.47177 5.63604 5.63604C6.47177 4.80031 7.46392 4.13738 8.55585 3.68508C9.64778 3.23279 10.8181 3 12 3C13.1819 3 14.3522 3.23279 15.4442 3.68508C16.5361 4.13738 17.5282 4.80031 18.364 5.63604C19.1997 6.47177 19.8626 7.46392 20.3149 8.55585C20.7672 9.64778 21 10.8181 21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4441 20.3149C14.3522 20.7672 13.1819 21 12 21L12 21Z" stroke="#222222" strokeLinecap="round" />
                        <path d="M9 9L15 15" stroke="#222222" strokeLinecap="round" />
                        <path d="M15 9L9 15" stroke="#222222" strokeLinecap="round" />
                    </svg>
                </div>
                <div className="edit-sched-header">
                    <h2>Edit Schedule</h2>
                </div>
                {loading && <Loading />}
                {!loading &&
                    <form onSubmit={onSubmit}>
                        <div className="schedule-input">
                            <label>Schedule Name:</label>
                            <input value={schedule.title} onChange={ev => setSchedule({ ...schedule, title: ev.target.value })} type="text" required />
                        </div>

                        <div className="schedule-input">
                            <label>Starting time:</label>
                            <input value={startTime} step={60} onChange={ev => setStartTime(ev.target.value)} type="time" required />
                        </div>
                        <div className="schedule-input">
                            <label>End Time:</label>
                            <input value={endTime} step={60} onChange={ev => setEndTime(ev.target.value)} type="time" required />
                        </div>
                        <div className="schedule-input">
                            <label>Background Color:</label>
                            <div className="color-flex">
                                <HexColorPicker color={schedule.backgroundColor} onChange={color => setSchedule({ ...schedule, backgroundColor: color })} />
                            </div>
                        </div>
                        <div className="add-sched-btn">
                            <button type="submit">Apply Changes</button>
                            <button onClick={onDelete} className="red-button">Delete</button>

                        </div>
                    </form>
                }

            </div>
        </div>
    )
}

export default EditSchedule;