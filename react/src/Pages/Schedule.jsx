import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import axiosClient from '../axios-client';
import { useState, useEffect } from 'react'
import AddScheduleModal from '../components/AddScheduleModal';


const Schedule = () => {

    

    const [open, setOpen] = useState(false);
    const [day, setDay] = useState('');
    const [schedule, setSchedule] = useState([]);
    let monday = {};
    const getSchedule = () => {
        axiosClient.get('/schedule')
        .then(({data}) => {
            setSchedule(data.data);
            console.log(data.data);
        })
    }

    const addSchedule = (weekday) => {
        setDay(weekday);
        setOpen(!open);
    }


    useEffect(() => {
        getSchedule();

    },[])

    const convertTime = (time24h) => {
        let time = time24h
          .toString()
          .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time24h];
      
        if (time.length > 1) {
          time = time.slice(1, -1);
          time[5] = +time[0] < 12 ? ' AM' : ' PM';
          time[0] = +time[0] % 12 || 12;
        }
        return time.join(''); 
      };
    
    return(
        <div className="authenticated-container">
  
           
            <div className="feed">
                <div className='section-header'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21ZM13 6.5C13 5.94772 12.5523 5.5 12 5.5C11.4477 5.5 11 5.94772 11 6.5V11.75C11 12.4404 11.5596 13 12.25 13H15.5C16.0523 13 16.5 12.5523 16.5 12C16.5 11.4477 16.0523 11 15.5 11H13V6.5Z" fill="#222222"/>
                    </svg>
                    <h3>Schedule</h3>
                </div>
                <div className="card" id='schedule-card'>
                    <div className="schedule-container">
                        <div className='schedule-header'>
                            <h1>Your schedule for this week</h1>
                        </div>
                        <AddScheduleModal isOpen={open} day={day} setOpen={setOpen} />
                        <div className="schedules">
                            <div className='weekday'>
                                <div className="weekday-title">
                                    <span>Monday</span>
                                    <FontAwesomeIcon id='add-schedule' onClick={() => addSchedule('Monday')} icon={faPlus} />
                                </div>
                                {
                                    schedule && 
                                    schedule.filter((sched) => {
                                        return sched.schedule_day.includes('Monday')})
                                        .map((sched, index) => (
                                            <div style={{backgroundColor: sched.schedule_color}} key={sched.id} className='schedule'>
                                                    <div className='schedule-top'>
                                                        <strong>{sched.schedule_name}</strong> <span className='time'> 
                                                        {convertTime(sched.start_time)} to {convertTime(sched.end_time)}</span>
                                                    </div>
                                                    <div className='schedule-bottom'>{sched.schedule_description}</div>
                                            </div>
                                        )
                                    )
                                }
                            </div>
                            <div className='weekday'>
                                <div className="weekday-title">
                                    <span>Tuesday</span>
                                    <FontAwesomeIcon id='add-schedule' icon={faPlus} onClick={() => addSchedule('Tuesday')} />
                                </div>
                                {
                                    schedule && 
                                    schedule.filter((sched) => {
                                        return sched.schedule_day.includes('Tuesday')})
                                        .map((sched, index) => (
                                            <div style={{backgroundColor: sched.schedule_color}} key={sched.id} className='schedule'>
                                                    <div className='schedule-top'>
                                                        <strong>{sched.schedule_name}</strong> <span className='time'> 
                                                        {convertTime(sched.start_time)} to {convertTime(sched.end_time)}</span>
                                                    </div>
                                                    <div className='schedule-bottom'>{sched.schedule_description}</div>
                                            </div>
                                        )
                                    )
                                }
                            </div>                            
                            <div className='weekday'>
                                <div className="weekday-title">
                                    <span>Wednesday</span>
                                    <FontAwesomeIcon id='add-schedule' icon={faPlus} onClick={() => addSchedule('Wednesday')} />
                                </div>
                                {
                                    schedule && 
                                    schedule.filter((sched) => {
                                        return sched.schedule_day.includes('Wednesday')})
                                        .map((sched, index) => (
                                            <div style={{backgroundColor: sched.schedule_color}} key={sched.id} className='schedule'>
                                                    <div className='schedule-top'>
                                                        <strong>{sched.schedule_name}</strong> <span className='time'> 
                                                        {convertTime(sched.start_time)} to {convertTime(sched.end_time)}</span>
                                                    </div>
                                                    <div className='schedule-bottom'>{sched.schedule_description}</div>
                                            </div>
                                        )
                                    )
                                }
                            </div>                            
                            <div className='weekday'>
                                <div className="weekday-title">
                                    <span>Thursday</span>
                                    <FontAwesomeIcon id='add-schedule' icon={faPlus} onClick={() => addSchedule('Thursday')} />
                                </div>
                                {
                                    schedule && 
                                    schedule.filter((sched) => {
                                        return sched.schedule_day.includes('Thursday')})
                                        .map((sched, index) => (
                                            <div style={{backgroundColor: sched.schedule_color}} key={sched.id} className='schedule'>
                                                    <div className='schedule-top'>
                                                        <strong>{sched.schedule_name}</strong> <span className='time'> 
                                                        {convertTime(sched.start_time)} to {convertTime(sched.end_time)}</span>
                                                    </div>
                                                    <div className='schedule-bottom'>{sched.schedule_description}</div>
                                            </div>
                                        )
                                    )
                                }
                            </div>                            <div className='weekday'>
                                <div className="weekday-title">
                                    <span>Friday</span>
                                    <FontAwesomeIcon id='add-schedule' icon={faPlus} onClick={() => addSchedule('Friday')} />
                                </div>
                                {
                                    schedule && 
                                    schedule.filter((sched) => {
                                        return sched.schedule_day.includes('Friday')})
                                        .map((sched, index) => (
                                            <div style={{backgroundColor: sched.schedule_color}} key={sched.id} className='schedule'>
                                                    <div className='schedule-top'>
                                                        <strong>{sched.schedule_name}</strong> <span className='time'> 
                                                        {convertTime(sched.start_time)} to {convertTime(sched.end_time)}</span>
                                                    </div>
                                                    <div className='schedule-bottom'>{sched.schedule_description}</div>
                                            </div>
                                        )
                                    )
                                }
                            </div>                            <div className='weekday'>
                                <div className="weekday-title">
                                    <span>Saturday</span>
                                    <FontAwesomeIcon id='add-schedule' icon={faPlus} onClick={() => addSchedule('Saturday')} />
                                </div>
                                {
                                    schedule && 
                                    schedule.filter((sched) => {
                                        return sched.schedule_day.includes('Saturday')})
                                        .map((sched, index) => (
                                            <div style={{backgroundColor: sched.schedule_color}} key={sched.id} className='schedule'>
                                                    <div className='schedule-top'>
                                                        <strong>{sched.schedule_name}</strong> <span className='time'> 
                                                        {convertTime(sched.start_time)} to {convertTime(sched.end_time)}</span>
                                                    </div>
                                                    <div className='schedule-bottom'>{sched.schedule_description}</div>
                                            </div>
                                        )
                                    )
                                }
                            </div>                            
                            <div className='weekday'>
                                <div className="weekday-title">
                                    <span>Sunday</span>
                                    <FontAwesomeIcon id='add-schedule' icon={faPlus} onClick={() => addSchedule('Sunday')} />
                                </div>
                                {
                                    schedule && 
                                    schedule.filter((sched) => {
                                        return sched.schedule_day.includes('Sunday')})
                                        .map((sched, index) => (
                                            <div style={{backgroundColor: sched.schedule_color}} key={sched.id} className='schedule'>
                                                    <div className='schedule-top'>
                                                        <strong>{sched.schedule_name}</strong> <span className='time'> 
                                                        {convertTime(sched.start_time)} to {convertTime(sched.end_time)}</span>
                                                    </div>
                                                    <div className='schedule-bottom'>{sched.schedule_description}</div>
                                            </div>
                                        )
                                    )
                                }
                                    </div>
                            </div>
                        </div>
                        </div>
            </div>
            <div className="recommended">
            </div>
        </div>
    )
}

export default Schedule;