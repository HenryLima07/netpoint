import Header from "../component/Header/Header";
import Footer from "../component/Footer/Footer";
import DayCalendar from "../component/CanchaInd/FieldBooking/DayCalendarComponent/DayCalendar.component";
import CanchaIndComponent from "../component/CanchaInd/CanchaInd.component";

import { useState } from "react";

const CanchaIndView = ()=>{
    const [ showModalTime, setShowModalTime ] = useState(false);
    const [ events, setEvents ] = useState([]);
    const [ startTime, setStartTime ] = useState("");
    const [ endTime, setEndTime ] = useState("");
    const [ title, setTitle ] = useState("");
    const [ selectedDate, setSelectedDate ] = useState("");

    const ToggleModal = (state)=>{
        setShowModalTime(state);
    }

    const startTimeHandler = (start)=>{
        setStartTime(start);
    }

    const endTimeHandler = (end)=>{
        setEndTime(end);
    }

    const titleHandler = (title)=>{
        setTitle(title);
    }

    const setEventsHandler = (events) =>{
        setEvents(events);
    }

    const clearSelectedTime = ()=>{
        setStartTime("");
        setEndTime("");
    }

    return(
        <main className= {`min-h-screen h-screen ${showModalTime ? " overflow-hidden": ""}`}>
            {
                showModalTime ? 
                    <DayCalendar ToggleModalHandler={ToggleModal} startTimeHandler={startTimeHandler} endTimeHandler={endTimeHandler} title={title} selectedDate={selectedDate} events={events}/>
                : <></>
            }
            <Header />
            <div className="h-5 md:h-28"></div>
            <CanchaIndComponent 
                startTime={startTime} 
                endTime={endTime} 
                title={title} 
                selectedDate={selectedDate} 
                ToggleModalHandler={ToggleModal} 
                titleHandler={titleHandler} 
                dateHandler={setSelectedDate} 
                setEventsHandler={setEventsHandler} 
                clearSelectedTimeHandler={clearSelectedTime}/>
            <Footer />
        </main>
    )
}

export default CanchaIndView;