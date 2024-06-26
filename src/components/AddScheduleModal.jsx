import { useRef, useState } from 'react';
import { HexColorPicker } from "react-colorful";
import toast from 'react-hot-toast';
import axiosClient from '../axios-client';

const AddScheduleModal = (props) => {

    const scheduleNameRef = useRef();
    const startingTimeRef = useRef();
    const endRecurrenceDate = useRef();
    const endTimeRef = useRef();
    const [color, setColor] = useState('#FFFFFF');
    const [repeat, setRepeat] = useState(false);
    const [selectedDays, setSelectedDays] = useState([]);

    const handleCheckboxChange = (day, isChecked) => {
        if (isChecked) {
            setSelectedDays([...selectedDays, day]);
        } else {
            setSelectedDays(selectedDays.filter(selectedDay => selectedDay !== day));
        }
        (selectedDays);
    };


    const onSubmit = async (ev) => {
        ev.preventDefault();
        if (repeat) {
            const formData = new FormData();
            formData.append('title', scheduleNameRef.current.value);
            formData.append('backgroundColor', color);
            formData.append('startTime', startingTimeRef.current.value);
            formData.append('endTime', endTimeRef.current.value);
            formData.append('startRecur', props.startDate + ' ' + startingTimeRef.current.value);
            formData.append('endRecur', endRecurrenceDate.current.value + ' ' + endTimeRef.current.value);
            selectedDays.map((day, index) => {
                formData.append(`daysOfWeek[${index}]`, day)
            })

            try {
                const response = await axiosClient.post('/schedule-recurring', formData);
                ('Data Uploaded: ', response.data);
                ('Days of Week Values: ', selectedDays);
                props.getAllSched();
                props.setOpen(false);
                toast.success('Schedule Added')
            } catch (err) {
                const response = err.response;
                (err);
                if (response && response.status === 422) {
                    toast.error(`${Object.values(response.data.errors)[0]}`)
                }
            }
        }
        else {
            const formData = new FormData();
            formData.append('title', scheduleNameRef.current.value);
            formData.append('start', props.startDate + ' ' + startingTimeRef.current.value);
            formData.append('end', props.startDate + ' ' + endTimeRef.current.value);
            formData.append('backgroundColor', color);
            axiosClient.post('/schedule', formData)
                .then(({ data }) => {
                    (data);
                    props.getAllSched();
                    props.setOpen(false);
                    toast.success('Schedule Added')
                })
                .catch(err => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        toast.error(`${Object.values(response.data.errors)[0]}`)
                    }
                })
        }

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
                <div><h2>Add a schedule{props.day}</h2></div>

                <form onSubmit={onSubmit}>
                    <div className="schedule-input">
                        <label>Schedule name:</label>
                        <input ref={scheduleNameRef} type="text" required />
                    </div>
                    <div className="schedule-input">
                        <label>Starting time:</label>
                        <input ref={startingTimeRef} type="time" required />
                    </div>
                    <div className="schedule-input">
                        <label>End time:</label>
                        <input ref={endTimeRef} type="time" required />
                    </div>
                    <div className="schedule-input" style={{ flexDirection: 'row-reverse', justifyContent: 'flex-start' }}>
                        <label>Repeat</label>
                        <input type="checkbox" onChange={() => setRepeat(!repeat)} />
                    </div>
                    {
                        repeat &&
                        <>
                            <div className="schedule-input" >
                                <label>Repeat every:</label>
                                <div className="weekday-checkbox-container">
                                    <label className='weekday-checkbox__day'>
                                        <input type="checkbox" onChange={(e) => handleCheckboxChange(1, e.target.checked)} />
                                        <span className="checkmark"></span>
                                        Monday
                                    </label>
                                    <label className='weekday-checkbox__day'>
                                        <input type="checkbox" onChange={(e) => handleCheckboxChange(2, e.target.checked)} />
                                        <span className="checkmark"></span>
                                        Tuesday
                                    </label>
                                    <label className='weekday-checkbox__day'>
                                        <input type="checkbox" onChange={(e) => handleCheckboxChange(3, e.target.checked)} />
                                        <span className="checkmark"></span>
                                        Wednesday
                                    </label>
                                    <label className='weekday-checkbox__day'>
                                        <input type="checkbox" onChange={(e) => handleCheckboxChange(4, e.target.checked)} />
                                        <span className="checkmark"></span>
                                        Thursday
                                    </label>
                                    <label className='weekday-checkbox__day'>
                                        <input type="checkbox" onChange={(e) => handleCheckboxChange(5, e.target.checked)} />
                                        <span className="checkmark"></span>
                                        Friday
                                    </label>
                                    <label className='weekday-checkbox__day'>
                                        <input type="checkbox" onChange={(e) => handleCheckboxChange(6, e.target.checked)} />
                                        <span className="checkmark"></span>
                                        Saturday
                                    </label>
                                    <label className='weekday-checkbox__day'>
                                        <input type="checkbox" onChange={(e) => handleCheckboxChange(0, e.target.checked)} />
                                        <span className="checkmark"></span>
                                        Sunday
                                    </label>
                                </div>
                            </div>
                            <div className="schedule-input" >
                                <label>Repeat until:</label>
                                <input ref={endRecurrenceDate} type="date" required />
                            </div>
                        </>

                    }
                    <div className="schedule-input">
                        <label>Background color:</label>
                        <div className="color-flex">
                            <HexColorPicker color={color} onChange={setColor} />
                        </div>
                    </div>
                    <div className="add-sched-btn">
                        <button type="submit">Add Schedule</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddScheduleModal;