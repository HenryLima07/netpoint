import Form from "../../../Form/Form";
import InputForm from "../../../Form/InputForm/InputForm";
import ErrorMessage from "../../../Form/ErrorMessage/ErrorMessage";

import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from 'react';
import { useForm } from "react-hook-form";

import CloseIcon from '@mui/icons-material/Close';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';

import "./DayCalendar.component.css";

import BorderButton from "../../../Buttons/BorderButton/BorderButton";

import ErrorMessages from "../../../../data/data";

const DayCalendar = ({...props}) => {
    const localizer = momentLocalizer(moment);

    const [eventsData, setEventsData] = useState([]);

    const handleSelect = ({ start, end }) => {
      console.log(start);
      console.log(end);
      const title = window.prompt("New Event name");
      if (title)
        setEventsData([
          ...eventsData,
          {
            start,
            end,
            title
          }
        ]);
    };
  

    const views = ["day"]
    return(
        <article className="w-full h-screen z-30 bg-black bg-opacity-70 fixed left-0 flex flex-col items-center justify-center md:p-8 gap-3 ">
              <div className='text-dark-gray bg-pure-white p-2 md:p-4 rounded-full hover:cursor-pointer self-end ' onClick={()=>props.ToggleModalHandler(false)}><CloseIcon /></div>
                <div className='w-[90%] h-[80%] flex justify-center font-inter bg-pure-white rounded-xl text-dark-gray'>
                <Calendar
                  localizer={localizer}
                  events={eventsData}
                  startAccessor="start"
                  endAccessor="end"
                  style={{ height: "100%", width: "100%" }}
                  selectable
                  defaultView={views}
                  views={views}
                  onSelectEvent={(event) => alert(event.title)}
                  onSelectSlot={handleSelect}
                  className="custom-calendar"
                  
                />     
                </div> 
            </article>
    );
}

export default DayCalendar;