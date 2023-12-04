import moment from "moment";

//return actual pc time
export const actualDate = () => {
  return moment().format("YYYY-MM-DD");
};

//gets string and return date with given characteristics
export const StringToTime = (date) => {
  const formattedTime = date.toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });
  // Replace "24:00" with "00:00"
  return formattedTime.replace("24", "00");
};

//return 12 hours time
export const StringToTime12Hours = (date) => {
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const ISOtoOnlyDate = (date) => {
  if (!date) return;
  return moment.utc(date).format("YYYY-MM-DD");
};

//return constructed time
export const FechaHoraMappingForCalendar = (date, time) => {
  if (!date || !time) return null;
  const [hours, minutes] = time.split(":");
  const _date = new Date(date);
  _date.setHours(hours);
  _date.setMinutes(minutes);

  return _date;
};

//gets tipe database and return actual information for client
export const TipoRerservaToTitleMapping = (type) => {
  switch (type) {
    case "IND":
      return "Clase individual";
    case "ALQ":
      return "Alquiler";
    case "BLQ":
      return "Bloqueado";
    default:
      return type;
  }
};

//avoid overlapping hours
export const OverlapsHandler = (startTime, endTime, eventsData) => {
  return eventsData.some((event) => {
    return (
      moment(startTime).isBetween(event.start, event.end) ||
      moment(endTime).isBetween(event.start, event.end) ||
      moment(event.start).isBetween(startTime, endTime)
    );
  });
};
//avoid overlapping hours on given date
export const OverlapsAndDayHandler = (date, startTime, endTime, eventsData) => {
  return eventsData.some((event) => {
    //building dates
    const start = FechaHoraMappingForCalendar(date, startTime);
    const end = FechaHoraMappingForCalendar(date, endTime);
    let eventStart = FechaHoraMappingForCalendar(event.date, event.startTime);
    let eventEnd = FechaHoraMappingForCalendar(event.date, event.endTime);

    return (
      moment(date).isSame(ISOtoOnlyDate(event.date)) &&
      (moment(start).isBetween(eventStart, eventEnd) ||
        moment(end).isBetween(eventStart, eventEnd) ||
        moment(eventStart).isBetween(start, end) ||
        moment(eventEnd).isBetween(start, end) ||
        (moment(start).isSame(eventStart) && moment(end).isSame(eventEnd)))
    );
  });
};

//fetching api data to calendar events

export const BookingDateToEventsDateMapping = (data) => {
  const date = new Date();
  const y = date.getFullYear();
  const m = date.getMonth();
  const d = date.getDate();

  if (!data) return null;

  return data.map((event) => {
    return {
      title: TipoRerservaToTitleMapping(event.rscTipoReserva),
      start: FechaHoraMappingForCalendar(
        event.rscFechaReserva,
        event.rscHoraDesde,
      ),
      end: FechaHoraMappingForCalendar(
        event.rscFechaReserva,
        event.rscHoraHasta,
      ),
    };
  });
};
