import { useEffect, useState } from "react";
import axiosClient from '../axios-client';
import Swal from 'sweetalert2';
import Loading from "./utils/Loading";

const EditSchedule = (props) => {
    const [schedule, setSchedule] = useState({});
    const [loading, setLoading] = useState(false);
    const getSchedule = () => {
        setLoading(true);
        axiosClient.get(`/schedule/${props.id}`)
        .then(({data}) => {
            setLoading(false);
            setSchedule(data.data);
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
        .then(() =>{
            props.getAllSched();
            props.setOpen(false)
        })
        .catch(err => {
            Swal.fire({
                title: "Error",
                text: `${Object.values(response.data.errors)[0]}`,
                icon: "warning"
              });
        })
    }


    useEffect(() =>{
        getSchedule();
    }, [props])

    const onSubmit = (ev) => {
        ev.preventDefault();
        const formData = new FormData();
        formData.append("_method", "PUT");
        for (const key in schedule) {
            formData.append(key, schedule[key]);
        }

        axiosClient.post(`/schedule/${props.id}`, formData)
        .then(({data}) => {
            console.log(data);
            props.setOpen(false);
            props.getAllSched();

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


    if(!props.isOpen) return null;
    return (
        
       <div className="overlay">
        <div className="modal">
            <div className='close'>
                    <svg onClick={() => props.setOpen(false)} xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none">
                        <path d="M12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 10.8181 3.23279 9.64778 3.68508 8.55585C4.13738 7.46392 4.80031 6.47177 5.63604 5.63604C6.47177 4.80031 7.46392 4.13738 8.55585 3.68508C9.64778 3.23279 10.8181 3 12 3C13.1819 3 14.3522 3.23279 15.4442 3.68508C16.5361 4.13738 17.5282 4.80031 18.364 5.63604C19.1997 6.47177 19.8626 7.46392 20.3149 8.55585C20.7672 9.64778 21 10.8181 21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4441 20.3149C14.3522 20.7672 13.1819 21 12 21L12 21Z" stroke="#222222" strokeLinecap="round"/>
                        <path d="M9 9L15 15" stroke="#222222" strokeLinecap="round"/>
                        <path d="M15 9L9 15" stroke="#222222" strokeLinecap="round"/>
                    </svg>
            </div>
                <div className="edit-sched-header">
                    <h2>Edit Schedule</h2>
                    </div>
            {loading && <Loading /> }
            {!loading &&
                <form onSubmit={onSubmit}>
                <div className="schedule-input">
                    <label>Schedule Name:</label>
                    <input value={schedule.schedule_name} onChange={ev => setSchedule({...schedule, schedule_name: ev.target.value})} type="text" required />
                </div>
                <div className="schedule-input">
                    <label>Schedule Description:</label>
                    <input value={schedule.schedule_description} onChange={ev => setSchedule({...schedule, schedule_description: ev.target.value})}  type="text" />
                </div>
                <div className="schedule-input">
                    <label>Starting time:</label>
                    <input value={schedule.start_time} onChange={ev => setSchedule({...schedule, start_time: ev.target.value})} type="time" required />
                </div>
                <div className="schedule-input">
                    <label>End Time:</label>
                    <input value={schedule.end_time} onChange={ev => setSchedule({...schedule, end_time: ev.target.value})} type="time" required />
                </div>
                <div className="schedule-input">
                    <label>Background Color:</label>
                    <div className="color-flex">
                        <div className="left">
                            <div  className='radio-input'><input style={{accentColor: "#0aaa3f"}} checked={schedule.schedule_color === '#0aaa3f'} onChange={ev => setSchedule({...schedule, schedule_color: ev.target.value})} name='color' className='sched-radio' type="radio" value='#0aaa3f' required /> Green</div>
                            <div className='radio-input'><input style={{accentColor: "#e97100"}} checked={schedule.schedule_color === '#e97100'} onChange={ev => setSchedule({...schedule, schedule_color: ev.target.value})} name='color' className='sched-radio' type="radio" value='#e97100' required /> Orange</div>
                        </div>
                        <div className="right">
                            <div  className='radio-input'><input style={{accentColor: "#6528F7"}} checked={schedule.schedule_color === '#6528F7'} onChange={ev => setSchedule({...schedule, schedule_color: ev.target.value})} name='color' className='sched-radio' value='#6528F7' type="radio" required /> Purple</div>
                            <div className='radio-input'><input style={{accentColor: "#677186"}}  checked={schedule.schedule_color === '#677186'} onChange={ev => setSchedule({...schedule, schedule_color: ev.target.value})} name='color' className='sched-radio' value='#677186' type="radio" required /> Gray</div>
                        </div>
                    </div>
                </div>
                <div className="add-sched-btn">
                    <button type="submit">Apply Changes</button>
                    <button onClick={onDelete}className="red-button">Delete</button>

                </div>
            </form>
            }

        </div>
       </div>
    )
}

export default EditSchedule;