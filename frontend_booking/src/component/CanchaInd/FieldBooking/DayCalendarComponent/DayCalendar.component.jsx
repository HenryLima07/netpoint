import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState, useEffect } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';

import "./DayCalendar.component.css";

import NoBorderButton from "../../../Buttons/NoBorderButton/NoBorderButton";

import { StringToTime } from "../../../../utils/utils";
import { toast } from "react-toastify";

const DayCalendar = ({...props}) => {
    //events handlers and props element
    const { startTimeHandler, endTimeHandler, title, selectedDate, events } = props;  

    const [ startTime, setStartTime ] = useState("");
    const [ endTime, setEndTime ] = useState("");

    const localizer = momentLocalizer(moment);

    const [eventsData, setEventsData] = useState(events ? events : []);

    useEffect(() => {
      if(!events) setEventsData([]);
      setEventsData(events);
    }, [events]);

    const handleSelect = ({ start, end }) => {

      if(!eventsData) return;

      //avoiding overlapping time
      const overlaps = eventsData.some((e)=>{
        //check if overlaps
        return moment(start).isBetween(e.start, e.end) ||  moment(end).isBetween(e.start, e.end) || moment(e.start).isBetween(start, end);
      }) 
            
      if(overlaps){
        toast.warn("No seleccionar horas ya reservadas", {
          toastId: "warn"
        });
        return;
      }

      setStartTime(start); 
      setEndTime(end);
      
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

    const saveTime = ()=>{
      //send information to booking form
      if(!startTime || !endTime){
        toast.warn("Seleccione un rango de horas", {toastId: "warn"});
        return;
      }
      startTimeHandler(StringToTime(startTime));
      endTimeHandler(StringToTime(endTime));
      
      toast.success("Horas seleccionadas correctamente", {toastId: "success"});
      props.ToggleModalHandler(false);      
    }

    const isEqual = (objA, objB)=> objA.start === objB.start && objA.end === objB.end && objA.title === objB.title;

    const removeTime = ()=>{
      //calculate new array of elements
      const events = eventsData.filter(obj => !isEqual(obj, {start: startTime, end: endTime, title}));
      //set local states to null
      setEventsData(events);      
      setStartTime("");
      setEndTime("");
    }

    const views = ["day"]
    return(
        <article className="w-full h-screen z-30 bg-black bg-opacity-70 fixed left-0 flex flex-col items-center justify-center md:p-8 ">
              <div className='text-dark-gray bg-pure-white p-2 md:p-4 rounded-full hover:cursor-pointer self-end ' onClick={()=>props.ToggleModalHandler(false)}><CloseIcon /></div>
                <div className='w-[90%] h-[75%] flex justify-center font-inter bg-pure-white rounded-xl text-dark-gray'>
                <Calendar
                  localizer={localizer}
                  events={eventsData}
                  startAccessor="start"
                  endAccessor="end"
                  style={{ height: "100%", width: "100%" }}
                  selectable
                  defaultView={views}
                  defaultDate={ selectedDate ? selectedDate : "" }
                  views={views}
                  onSelectEvent={(event) => alert(event.title)}
                  onSelectSlot={handleSelect}
                  className="custom-calendar"
                  
                />     
                </div> 
                <div className='bg-pure-white px-6 py-4 flex flex-row items-center justify-center gap-10 md:px-10 md:py-5 w-[90%] rounded-b-xl'>
                <NoBorderButton handleClick={(e)=>{e.preventDefault(); removeTime()}} className={`font-bebas flex flex-row self-end items-center gap-6 justify-around bg-dark-gray text-pure-white py-2 px-3 text-base sm:p-2 sm:pr-4 md:px-5 md:py-3 md:text-lg `}>   
                  
                  <p className="uppercase">Limpiar</p>

                </NoBorderButton>
                    <NoBorderButton handleClick={(e)=>{e.preventDefault(); saveTime()}} className={`font-bebas flex flex-row self-end items-center gap-6 justify-around bg-usafa-blue text-pure-white py-2 px-3 text-base sm:p-2 sm:px-4 md:px-5 md:py-3 md:text-lg`}>   
                    
                    <p className="uppercase">Guardar hora</p>

                </NoBorderButton>
                </div>
            </article>
    );
}

export default DayCalendar;