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

    const ToggleModal = (state)=>{
        setShowModalTime(state);
    }

    return(
        <main className= {`min-h-screen h-screen ${showModalTime ? " overflow-hidden": ""}`}>
            {
                showModalTime ? 
                    <DayCalendar ToggleModalHandler={ToggleModal}/>
                : <></>
            }
            <Header />
            <div className="h-28"></div>
            <CanchaIndComponent ToggleModalHandler={ToggleModal}/>
            <Footer />
        </main>
    )
}

export default CanchaIndView;