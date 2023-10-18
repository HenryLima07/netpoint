import moment from 'moment';

//return actual pc time
export const actualDate = ()=>{
    return moment().format("YYYY-MM-DD");
};

//gets string and return date with given characteristics
export const StringToTime = (date)=>{
    return date.toLocaleTimeString('en-US', {hour12: false, hour: '2-digit', minute:'2-digit'});
};

//return 12 hours time
export const StringToTime12Hours = (date) =>{
    return date.toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit'});

};

export const ISOtoOnlyDate = (date)=>{
    return moment(date).format("yyyy-MM-DD");
}

//return constructed time
export const FechaHoraMappingForCalendar = (date, time)=>{
    if(!date || !time ) return null;
    const [hours, minutes] = time.split(":");
    const _date = new Date(date);
    _date.setHours(hours)
    _date.setMinutes(minutes);

    return _date;
}

//gets tipe database and return actual information for client
export const TipoRerservaToTitleMapping = (type)=>{
    switch(type){
        case "IND": 
            return "Clase individual";
        case "ALQ":
            return "Alquiler";
        case "BLQ":
            return "Bloqueado";
        default:
            return type;
    }
}
