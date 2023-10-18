import Header from "../component/Header/Header";
import Footer from "../component/Footer/Footer";
import DayCalendar from "../component/CanchaInd/FieldBooking/DayCalendarComponent/DayCalendar.component";
import CanchaIndComponent from "../component/CanchaInd/CanchaInd.component";

import { BookingFormService } from "../component/CanchaInd/CanchaInd.service";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const CanchaIndView = ()=>{

    //states to handle selected events in calendar
    const [ showModalTime, setShowModalTime ] = useState(false);
    const [ events, setEvents ] = useState([]);
    const [ startTime, setStartTime ] = useState("");
    const [ endTime, setEndTime ] = useState("");
    const [ title, setTitle ] = useState("");
    const [ selectedDate, setSelectedDate ] = useState("");

    //states and elements to handle fetch information courts
    const { FetchCourt } = BookingFormService();
    const { id } = useParams();
    const [ data, setData ] = useState([])
    const navigate = useNavigate();

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

    const fetchCourtHandler = async()=>{
        const { data } = await FetchCourt(id);
        if(!data) {
            toast.warn("UPS! algo ocurrió mal", { toastId: "warn"});
            navigate("/cancha");
            return;
        }
        setData(data);
    }

    useEffect(() => {
        fetchCourtHandler();
    }, []);

    return(
        <main className= {`max-w-[1920px] min-h-screen h-screen ${showModalTime ? " overflow-hidden": ""}`}>
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
                clearSelectedTimeHandler={clearSelectedTime}
                data={data}
                />
            <Footer />
        </main>
    )
}

export default CanchaIndView;