import Form from "../../Form/Form";
import ErrorMessage from "../../Form/ErrorMessage/ErrorMessage";
import InputForm from "../../Form/InputForm/InputForm";
import BorderButton from "../../Buttons/BorderButton/BorderButton";
import TextAreaForm from "../../Form/TextAreaForm/TextAreaForm.component";
import SelectForm from "../../Form/SelectForm/SelectForm.component";
import DayCalendar from "./DayCalendarComponent/DayCalendar.component";

import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

import ErrorMessages from "../../../data/data";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { UseAuthContext } from "../../../context/authContext";
import { toast } from "react-toastify";
import moment from 'moment';

import { format } from "prettier";


const BookingForm = ()=>{
    const [ showPassword, setShowPassword ] = useState(false);
    const [ showModalTime, setShowModalTime ] = useState(false);
    const [ selectedDate, setSelectedDate ] = useState("");
    const [ events, setEvents ] = useState([]);
    const [ startTime, setStartTime ] = useState("");
    const [ endTime, setEndTime ] = useState("");
    const { user } = UseAuthContext();

    const {
        register, 
        formState: { errors },
        handleSubmit,
    } = useForm();


    const onSuccess = async(data)=>{
        if(!data || !startTime || !endTime){
            onFail()
            return;
        }
       console.log(data);

    }
    const onFail = ()=>{
        toast.warn("Revisa bien tus datos e intenta de nuevo", {
            toastId: "warning"
        });
    }

    const actualDate = ()=>{
        return moment().format("YYYY-MM-DD");
    }

    return(
        <div className="w-full font-inter">
            <DayCalendar />
            <h3 className="font-bebas text-6xl">Reserva ahora</h3>
            <Form className={"flex flex-col items-start"} onSubmit = {handleSubmit(onSuccess, onFail)}>
                <div className="w-[95%] flex flex-col items-start gap-4">
                    <label htmlFor="bookingType" className="font-semibold lg:text-2xl">Tipo de reserva</label>
                    <SelectForm
                        id={"bookingType"}
                        name={"bookingType"}
                        aria-invalid={errors.bookingType ? "true" : "false"}
                        innerRef={{...register("bookingType", { required: true})}}
                        validation={errors.bookingType}
                        placeholder={""}
                        className={"flex-row-reverse"}
                        icon={<CheckCircleOutlineIcon />}
                    >
                        <option value=""></option>
                        <option value="ALQ">Alquiler</option>
                        <option value="IND">Clase individual</option>
                    </SelectForm>
                      {errors.bookingType?.type === "required" && (<ErrorMessage> <span className="font-medium">Nota: </span> {ErrorMessages.require} </ErrorMessage>)}
                    <label htmlFor="date" className="font-semibold lg:text-2xl">Día</label>
                    <InputForm
                      id={"date"}
                      name={"date"}
                      min = {actualDate()}
                      aria-invalid={errors.date ? "true" : "false"}
                      innerRef={{ ...register("date", {required: true, onChange: (e)=> e.target.value >= actualDate() ? setSelectedDate(e.target.value) : setSelectedDate("") }) }}
                      validation={errors.date}
                      placeholder={""}
                      type={"date"}
                      className={"flex-row-reverse"}
                    />
                      {errors.date?.type === "required" && (<ErrorMessage> <span className="font-medium">Nota: </span> {ErrorMessages.require} </ErrorMessage>)}
                      {errors.date?.type === "notDate" && (<ErrorMessage> <span className="font-medium">Nota: </span> {ErrorMessages.notDate} </ErrorMessage>)}
                      {
                        selectedDate ?
                            <BorderButton onClick={(e)=>e.preventDefault()} className=" flex flex-row self-end items-center justify-around gap-6 font-bold text-black bg-pure-white shadow-rounded-button-azure border border-black
                                mt-2 py-1 px-2 text-sm
                                sm:p-2 sm:px-4
                                md:px-5 md:py-3 md:text-base"> 
                                <p className="uppercase">selecciona tus horas</p>
                                <EmojiPeopleIcon />
                            </BorderButton>
                            :
                            <></>
                      }
                      
                    <label htmlFor="comment" className="font-semibold lg:text-2xl">Comentario</label>
                    <TextAreaForm 
                        id={"comment"}
                        name={"comment"}
                        innerRef={{ ...register("comment") }}
                        placeholder={"Dejanos tu comentario..."}
                        icon={<ChatBubbleOutlineIcon style={{fontSize: "24px"}}/>}
                        className={"flex-row-reverse"}
                    />
                </div>

                <BorderButton className=" flex flex-row self-center items-center justify-around gap-6 font-bold text-black bg-pure-white shadow-rounded-button-azure border border-black
                    mt-2 py-1 px-2 text-sm
                    sm:p-2 sm:px-4
                    md:text-base
                    lg:mt-8 lg:py-3 lg:px-8 lg:text-lg"> 
                    <p className="uppercase">Reservar ahora</p>
                    <EmojiPeopleIcon />
                </BorderButton>
            </Form>
        </div>
    )
}

const FieldBooking = ()=>{
    return(
        <section className="w-full mb-10 p-12 flex flex-col items-center justify-between gap-8 border border-black rounded-xl shadow-xl md:flex-row">
            <div className="flex flex-col items-center p-10 font-inter text-dark-gray">
                <h2 className="font-bebas text-7xl">$15.00 <span className="text-4xl">USD</span> </h2>
                <h4 className="text-4xl font-semibold -mt-2 -mb-1">Cancha de Tennis</h4>
                <h2 className="text-2xl text-light-gray">Sede C.D Gambeta Proceres</h2>
                <p className=" items-start text-light-gray text-xl my-4">El tenis es un desafío constante que te hará superar tus límites. ¡Únete a Netpoint y acepta el desafío hoy!</p>
            </div>
            <BookingForm />
        </section>
    );
}

export default FieldBooking;