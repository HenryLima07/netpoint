import { Calendar, momentLocalizer } from "react-big-calendar";
import { useState } from "react";
import React from "react";
import { BookingDateToEventsDateMapping } from "../../../utils/utils";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "./custom_month_calendar.css";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { UseAuthContext } from "../../../context/authContext";
import { UserActivities } from "./UserServices/UserActivities.service";
import { useEffect } from "react";
import moment from "moment";
import "moment/dist/locale/es";

//react big calendar configuration
moment.locale("es");
const localizer = momentLocalizer(moment);
const navigate = {
  PREVIOUS: "PREV",
  NEXT: "NEXT",
  TODAY: "TODAY",
  DAY: "day",
  MONTH: "month",
};

const views = ["month", "day"];

const UserActivity = ({ className, ...props }) => {
  const actualDate = new Date();
  const [dateCalendar, setDateCalendar] = useState(
    `${actualDate.toLocaleString("es-ES", {
      month: "long",
    })}, ${actualDate.getFullYear()}`,
  );

  //events
  const { token } = UseAuthContext();
  const { fetchUserReservas } = UserActivities();
  const [events, setEvents] = useState([]);

  const handleFetchActivities = async () => {
    const { data: userReservas } = await fetchUserReservas(token);
    setEvents(BookingDateToEventsDateMapping(userReservas));
  };

  useEffect(() => {
    handleFetchActivities();
  }, []);

  //handle month view navigation
  const handleNavigation = (date) => {
    const monthName = date.toLocaleString("es-ES", { month: "long" });
    setDateCalendar(`${monthName}, ${actualDate.getFullYear()}`);
  };

  //color style for each of the content boxes in the calendar
  const eventStyleGetter = (event, start, end, isSelected) => {
    var style = getEventClass(event.title);
    return {
      style: style,
    };
  };
  const getEventClass = (title) => {
    const classesEnum = {
      Alquiler: {
        color: "#009834",
        backgroundColor: "#00ba341a",
        border: "0px solid #009834",
      },
      "Clase individual": {
        color: "#ff982d",
        backgroundColor: "#ff9f2d33",
        border: "0px solid #ff982d",
      },
      Bloqueado: {
        color: "#E92C2C",
        backgroundColor: "#ff3b3b1a",
        border: "0px solid #E92C2C",
      },
    };
    return classesEnum[title] || "";
  };

  //CustonToolBar
  class CustomToolBar extends React.Component {
    render() {
      let {
        localizer: { message },
        label,
        onView,
      } = this.props;
      return (
        <div className="rbc-toolbar">
          <span className="rbc-btn-group">
            <button
              onClick={this.navigate.bind(null, navigate.TODAY)}
              className=" !px-6 border !rounded-lg !border-light-gray !hover:bg-light-gray !mr-2"
            >
              Hoy
            </button>

            <button
              onClick={this.navigate.bind(null, navigate.PREVIOUS)}
              className="!border-0 !rounded-full !py-3 !ml-2 !hover:bg-light-gray"
            >
              <ArrowBackIosNewIcon fontSize="10px" />
            </button>
            <button
              onClick={this.navigate.bind(null, navigate.NEXT)}
              className="!border-0 !rounded-full !py-3 !ml-1 !hover:bg-light-gray"
            >
              <ArrowForwardIosIcon fontSize="10px" />
            </button>
          </span>
          <span className="rbc-btn-group !ml-0">
            <button
              onClick={() => onView(navigate.MONTH)}
              className=" !px-6 !py-3 border !rounded-lg !border-light-gray !hover:bg-light-gray !mr-2"
            >
              Mes
            </button>
            <button
              onClick={() => onView(navigate.DAY)}
              className=" !px-6 !py-3 border !rounded-lg !border-light-gray !hover:bg-light-gray !mr-2"
            >
              Día
            </button>
          </span>
        </div>
      );
    }
    navigate = (action) => {
      this.props.onNavigate(action);
    };
  }
  return (
    <article
      className={`${className} flex flex-col gap-6 items-center justify-center font-inter font-medium pt-4`}
    >
      <div className=" w-[93%]">
        <h2 className="uppercase xl:text-6xl text-4xl font-bebas text-azure">
          tu agenda mensual
        </h2>
        <h4 className=" first-letter:uppercase text-light-gray font-normal xl:text-xl md:text-lg">
          {dateCalendar}
        </h4>
      </div>

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ width: "93%", height: "60vh" }}
        className="custom-moth-calendar"
        views={views}
        defaultView={"month"}
        onNavigate={handleNavigation}
        eventPropGetter={eventStyleGetter}
        components={{ toolbar: CustomToolBar }}
        messages={{
          date: "Dia",
          time: "Hora",
          event: "Actividades",
          allDay: "Todo el día",
          day: "Dia",
          month: "Mes",
          today: "Ahora",
          noEventsInRange: "No tienes actividades en estás fechas",

          showMore: (total) => `+${total} más`,
        }}
      />
    </article>
  );
};

export default UserActivity;
