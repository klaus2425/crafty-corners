import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import axiosClient from '../axios-client';
import { useState, useEffect } from 'react'
import AddScheduleModal from '../components/AddScheduleModal';
import EditSchedule from '../components/EditSchedule';
import Loading from '../components/utils/Loading';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction"

const Schedule2 = () => {
    const [open, setOpen] = useState(false);

    const getSchedule = () => {
        setLoading(true);
        axiosClient.get('/schedule')
            .then(({ data }) => {
                setLoading(false);
                setSchedule(data.data);
            }).catch(err => {
                setLoading(false);
                const response = err.response;
                Swal.fire({
                    title: "Error",
                    text: `${Object.values(response.data.errors)[0]}`,
                    icon: "warning"
                });
            })
    }
    const formatTime = (date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
      };

    const handleDateClick = (info) => {
        console.log('date clicked: ' + info.date.toLocaleDateString('en-US'));
        setOpen(!open);
      };


    const eventRender = ({ event }) => {


        if (event.end) {
            return (
                <div className='event-content'>
                    <strong>{event.title}</strong>
                    <br />
                    {formatTime(event.start)} - {formatTime(event.end)}
                </div>
            )
        }
        return (
            <div className='event-content'>
                <strong>{event.title}</strong>
                <br />
                {event.start.toLocaleTimeString()} -
            </div>
        );
    }

    return (
        <div className="authenticated-container">
            <div className="feed">
                <div className='section-header'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21ZM13 6.5C13 5.94772 12.5523 5.5 12 5.5C11.4477 5.5 11 5.94772 11 6.5V11.75C11 12.4404 11.5596 13 12.25 13H15.5C16.0523 13 16.5 12.5523 16.5 12C16.5 11.4477 16.0523 11 15.5 11H13V6.5Z" fill="#222222" />
                    </svg>
                    <h3>Schedule</h3>
                </div>
                <div className="card" id="schedule-card">
                <AddScheduleModal isOpen={open}  setOpen={setOpen} />

                    <FullCalendar
                        plugins={[dayGridPlugin, interactionPlugin]}
                        initialView="dayGridMonth"
                        selectable
                        events={[
                            { title: 'Thesis Defense', color: '#677186', start: '2024-02-29T10:30:00', end: '2024-02-29T18:35:00' },
                        ]}
                        dateClick={handleDateClick}
                       // eventClick={handleEventClick}
                        eventContent={eventRender}
                    />
                </div>
            </div>
            <div className="recommended">
            </div>
        </div>
    )
}

export default Schedule2;