import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useEffect, useState } from "react";
import React from "react";

import "./custom_month_calendar.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import PromoContainer from "../../Home/PromoSection/PromoContainer/PromoContainer";

//services
import { UseAuthContext } from "../../../context/authContext";
import { UserGeneralProm } from "./UserServices/UserGeneralProms.service";
import { UserActivities } from "./UserServices/UserActivities.service";

import { BookingDateToEventsDateMapping } from "../../../utils/utils";

const localizer = momentLocalizer(moment);

const views = ["agenda"];
const navigate = {
  PREVIOUS: "PREV",
  NEXT: "NEXT",
  TODAY: "TODAY",
  DAY: "day",
  MONTH: "month",
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
      </div>
    );
  }
  navigate = (action) => {
    this.props.onNavigate(action);
  };
}

const Agenda = ({}) => {
  const { fetchUserReservas } = UserActivities();
  const actualDate = new Date();
  const [dateCalendar, setDateCalendar] = useState(
    `${actualDate.toLocaleString("es-ES", {
      month: "long",
    })}, ${actualDate.getFullYear()}`,
  );

  const { token } = UseAuthContext();
  const [events, setEvents] = useState([]);

  const fetchEventAgenda = async () => {
    const { data } = await fetchUserReservas(token);
    setEvents(BookingDateToEventsDateMapping(data));
  };

  useEffect(() => {
    if (token) fetchEventAgenda();
  }, []);

  const handleNavigation = (date) => {
    const monthName = date.toLocaleString("es-ES", { month: "long" });
    setDateCalendar(`${monthName}, ${actualDate.getFullYear()}`);
  };
  return (
    <>
      <div className=" w-[93%]">
        <h2 className="uppercase xl:text-6xl text-4xl font-bebas text-azure">
          tu agenda de actividades
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
        style={{ width: "93%", height: "25vh" }}
        className="custom-moth-calendar"
        defaultView={views}
        views={views}
        onNavigate={handleNavigation}
        components={{
          toolbar: CustomToolBar,
        }}
        messages={{
          date: "Dia",
          time: "Hora",
          event: "Actividades",
          allDay: "Todo el día",
          noEventsInRange: "No tienes actividades en estás fechas",

          showMore: (total) => `+${total} más`,
        }}
      />
    </>
  );
};

const UserPromos = ({}) => {
  const { token } = UseAuthContext();
  const { fetchPromos } = UserGeneralProm();
  const [userProms, setUserProms] = useState([]);

  const fetchUserProms = async () => {
    const { data } = await fetchPromos(token);
    setUserProms(data);
  };

  useEffect(() => {
    if (token) fetchUserProms();
  }, []);

  const mappedProms = userProms.map((item) => {
    return (
      <PromoContainer
        id={item.id}
        key={item.id}
        className={"w-1/4 min-w-[239px] md:min-w-[392px]"}
        price={item.paqPrecio}
        name={item.paqNombre}
        displayButton={false}
      >
        <p className="text-sm sm:text-lg md:text-xl">
          Pellentesque morbi non condi mentum iaculis dictum neque, velit.
          Disponible desde: {ISOtoOnlyDate(item.paqFechaDesde)} hasta{" "}
          {ISOtoOnlyDate(item.paqFechaHasta)}
        </p>
      </PromoContainer>
    );
  });

  return (
    <>
      <div className=" w-[93%]">
        <h2 className="uppercase xl:text-6xl text-4xl font-bebas text-dark-gray">
          tus promos
        </h2>
        <h4 className=" first-letter:uppercase text-light-gray font-normal xl:text-xl md:text-lg">
          recuerda usarlas
        </h4>
      </div>
      <div className="flex flex-row overflow-x-scroll justify-start md:h-[35vh] w-[93%]">
        <div className="flex flex-row flex-nowrap justify-start w-full">
          {userProms && userProms.length > 0 ? (
            mappedProms
          ) : (
            <p className=" font-medium ">No has comprado paquetes todavia</p>
          )}
        </div>
      </div>
    </>
  );
};

const UserGeneral = ({ className, ...props }) => {
  return (
    <article
      className={`${className} flex flex-col gap-6 items-center justify-center font-inter font-medium pt-4 h-auto`}
    >
      <Agenda />
      <UserPromos />
    </article>
  );
};

export default UserGeneral;
