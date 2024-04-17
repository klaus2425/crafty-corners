import axiosClient from '../axios-client';
import { useState, useEffect } from 'react'
import AddScheduleModal from '../components/AddScheduleModal';
import EditSchedule from '../components/EditSchedule';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction"
import getCorrectColor from '../components/utils/ColorCorrection';

const Schedule = () => {
    const [open, setOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [schedId, setSchedId] = useState();
    const [events, setEvents] = useState({});
    const [startDate, setStartDate] = useState();

    const getSchedule = () => {
        axiosClient.get(`/schedule`)
            .then(({ data }) => {
                setEvents(data.data);
            })
    }
    const formatTime = (date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    };

    const handleEventClick = (info) => {
        setSchedId(info.event.id);
        setEditOpen(true);
    }
    const handleDateClick = (info) => {
        setStartDate(new Intl.DateTimeFormat('en-CA', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        }).format(info.date).replace(/\//g, '-'));

        setOpen(!open);
    };


    const eventRender = ({ event }) => {
        if (event.end) {
            return (
                <div className='event-content'
                    style={{
                        backgroundColor: event.backgroundColor,
                        color: getCorrectColor(event.backgroundColor),
                        cursor: 'pointer',
                        transition: '0.3s',
                    }}>
                    <strong>{event.title}</strong>
                    <br />

                    {formatTime(event.start)} to {formatTime(event.end)}
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

    useEffect(() => {
        getSchedule();
    }, [])
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
                    <AddScheduleModal isOpen={open} getAllSched={getSchedule} startDate={startDate} setOpen={setOpen} />
                    {
                        editOpen ?
                            <EditSchedule isOpen={editOpen} setOpen={setEditOpen} id={schedId} getAllSched={getSchedule} />
                            : null
                    }
                    <FullCalendar
                        plugins={[dayGridPlugin, interactionPlugin]}
                        initialView="dayGridMonth"
                        selectable
                        themeSystem='custom'
                        height= '70vh'
                        events={events}
                        dateClick={handleDateClick}
                        eventClick={handleEventClick}
                        eventContent={eventRender}
                    />
                </div>
            </div>
            <div className="recommended">
            </div>
        </div>
    )
}

export default Schedule;